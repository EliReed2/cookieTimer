import { View, Image, StyleSheet, Text, ImageBackground, Modal, Animated } from "react-native";
import React, { useState, useEffect, useRef } from 'react';

const TimerBackground = require("../assets/images/stars.png");

type Props = {
    isVisible: boolean;
    onClose: () => void;
    cookieImage: any;
    cookieTime: number;
}

export default function TimerModal({ isVisible, onClose, cookieImage, cookieTime }: Props) {
    //State to hold the time
    const [seconds, setSeconds] = useState(cookieTime);
    const [isRunning, setIsRunning] = useState(true);

    // Create an animated value for the cookie image's vertical position
    const bounceValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setSeconds(cookieTime);
    }, [cookieTime]);

    // Function to start the cookie timer
    const startTimer = () => {
        setIsRunning(true);
    };

    // Stop the cookie timer
    const stopTimer = () => {
        setIsRunning(false);
    };

    useEffect(() => {
        let intervalId: NodeJS.Timeout | undefined;

        // If the timer is running, decrement the seconds by 1
        if (isRunning) {
            intervalId = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
        } else {
            clearInterval(intervalId);
        }

        // Cleanup Function
        return () => clearInterval(intervalId);
    }, [isRunning]);

    // Convert seconds to hh:mm:ss format
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        // Pad with leading zeros if necessary
        const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    // Bounce effect for the cookie image
    useEffect(() => {
        const bounce = () => {
            Animated.sequence([
                Animated.timing(bounceValue, {
                    toValue: -20, // Move the image upwards by 10px
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(bounceValue, {
                    toValue: 55, // Move the image downwards by 10px
                    duration: 900,
                    useNativeDriver: true,
                }),
                Animated.timing(bounceValue, {
                    toValue: 0, // Reset back to the original position
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]).start(() => bounce()); // Loop the bounce animation
        };

        bounce(); // Start the bounce animation when the component mounts
    }, [bounceValue]);

    // Define the UI
    return (
        <Modal transparent visible={isVisible} animationType="fade" onRequestClose={onClose}>
            <View style={styles.modalWrapper}>
                <View style={styles.mainWrapper}>
                <Text style={styles.cookieText}>Your cookies will be done in...</Text>
                    <View style={styles.backgroundWrapper}>
                        <ImageBackground style={styles.background} source={TimerBackground}>
                            <View style={styles.backgroundItem}>
                                {/* Add the bounce effect here */}
                                <Animated.Image
                                    source={cookieImage}
                                    style={[styles.cookieImage, { transform: [{ translateY: bounceValue }] }]}
                                />
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.bottomText}>
                        <Text style={styles.timerText}>{formatTime(seconds)}</Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    mainWrapper: {
        width: '40%', // Adjust width of the modal content
        height: '90%', // Adjust height of the modal content
        backgroundColor: "#FFEBD2",
        padding: 20,
        borderRadius: 10,
        borderColor: "#EFCDA9",
        borderWidth: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundWrapper: {
        width: "100%",
        height: "60%",
    },
    background: {
        borderColor: "#EFCDA9",
        borderWidth: 7,
        width: "100%",
        height: "100%",
    },
    backgroundItem: {
        paddingTop: "5%",
        justifyContent: "center",
        alignItems: "center",
    },
    bottomText: {
        paddingTop: "15%",
    },
    cookieText: {
        color: "#B48C5C",
        fontSize: 22,
        fontFamily: "PixelifySans",
        textShadowColor: 'black', // shadow color
        textShadowOffset: { width: 2, height: 2 }, // shadow position
        textShadowRadius: 50,
        textAlign: "left",
        alignSelf: 'flex-start',
    },
    cookieImage: {
        height: 230,
        width: 230,
    },
    timerText: {
        color: "#B48C5C",
        fontFamily: "PixelifySans",
        fontSize: 55,
    }
});
