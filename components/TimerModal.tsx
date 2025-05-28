import { View, Button, StyleSheet, Text, ImageBackground, Modal, Animated, Dimensions } from "react-native";
import React, { useState, useEffect, useRef } from 'react';

const TimerBackground = require("../assets/images/stars.png");
const { width } = Dimensions.get('window');

type Props = {
    isVisible: boolean;
    onClose: () => void;
    cookieImage: any;
    cookieTime: number;
};

export default function TimerModal({ isVisible, onClose, cookieImage, cookieTime }: Props) {
    const [seconds, setSeconds] = useState(cookieTime);
    const [isRunning, setIsRunning] = useState(true);
    const isPhone = width < 600;
    const bounceValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setSeconds(cookieTime);
    }, [cookieTime]);

    const dynamicStyles = {
        mainWrapper: {
            width: isPhone ? '80%' : '40%',
        } as const,
    };

    useEffect(() => {
        let intervalId: NodeJS.Timeout | undefined;

        if (isRunning && seconds > 0) {
            intervalId = setInterval(() => {
                setSeconds(prevSeconds => {
                    if (prevSeconds <= 1) {
                        setIsRunning(false);
                        return 0;
                    }
                    return prevSeconds - 1;
                });
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isRunning, seconds]);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    useEffect(() => {
        const bounce = () => {
            Animated.sequence([
                Animated.timing(bounceValue, {
                    toValue: -20,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(bounceValue, {
                    toValue: 55,
                    duration: 900,
                    useNativeDriver: true,
                }),
                Animated.timing(bounceValue, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]).start(() => bounce());
        };

        bounce();
    }, [bounceValue]);

    return (
        <Modal transparent visible={isVisible} animationType="fade" onRequestClose={onClose}>
            <View style={styles.modalWrapper}>
                <View style={[styles.mainWrapper, dynamicStyles.mainWrapper]}>
                    <Text style={styles.cookieText}>Your cookies will be done in...</Text>
                    <View style={styles.backgroundWrapper}>
                        <ImageBackground style={styles.background} source={TimerBackground}>
                            <View style={styles.backgroundItem}>
                                <Animated.Image
                                    source={cookieImage}
                                    style={[styles.cookieImage, { transform: [{ translateY: bounceValue }] }]}
                                />
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.bottomText}>
                        <Text style={[styles.timerText, seconds === 0 && styles.timerTextRed]}>
                            {formatTime(seconds)}
                        </Text>
                        <View style={styles.closeButtonWrapper}>
                            <Button title="Close" onPress={onClose} color="black" />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalWrapper: {
        flex: 1,
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    mainWrapper: {
        height: '70%',
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
        paddingTop: "10%",
    },
    cookieText: {
        color: "#B48C5C",
        fontSize: 22,
        fontFamily: "PixelifySans",
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
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
    },
    timerTextRed: {
        color: "red",
    },
    closeButtonWrapper: {
        backgroundColor: "#FFD6E8",
        marginTop: 10,
    }
});
