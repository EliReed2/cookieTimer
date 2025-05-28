import { Image, Text, View, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react';
import TimerModal from './TimerModal';
import { RFValue } from "react-native-responsive-fontsize";

//Image holder
const TimerBackground = require("../assets/images/stars.png");
const NormalCookie = require('../assets/images/cookie.png');

export default function BackgroundTimer() {
    const { width } = Dimensions.get('window');
    const isPhone = width < 600;

    //Define state to manage modal visibility
    const [modalVisible, setModalVisibile] = useState(false);
    const [selectedCookieTime, setSelectedCookieTime] = useState(0);
    const [selectedCookieImage, setSelectedCookieImage] = useState(NormalCookie);
    
    //Handle when a row item is clicked
    const handleRowItemClick = (time: number, image: any) => {
        setSelectedCookieImage(image);
        setSelectedCookieTime(time);
        setModalVisibile(true);
    }

    //Handle closing the modal
    const closeModal = () => {
        setModalVisibile(false);
    };

    // Dynamic style for rowContainer depending on isPhone
    const dynamicStyles = {
        wrapper: {
            height: isPhone ? "70%": "100%",
        } as const,

      rowContainer: {
        flexDirection: isPhone ? "column" : "row",
        justifyContent: isPhone ? "center" : "space-around",
        height: "100%",
        alignItems: isPhone ? "center" : undefined,
        gap: isPhone ? 20 : 0,
      } as const,

      cookieImage: {
        width: isPhone ? 80 : 135,
        height: isPhone ? 90 : 150,
        resizeMode: 'contain' as const,
      },
    };

    return(
        <View style={[styles.wrapper, dynamicStyles.wrapper]}>
            <ImageBackground source={TimerBackground} style={styles.background}>
                <View style={[styles.rowContainer, dynamicStyles.rowContainer]}>
                    <TouchableOpacity style={styles.rowItem} onPress={() => handleRowItemClick(600, NormalCookie)}>
                        <Image source={NormalCookie} style={[styles.cookieImage, dynamicStyles.cookieImage]} />
                        <Text style={styles.cookieText}>Gooey</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowItem} onPress={() => handleRowItemClick(800, NormalCookie)}>
                        <Image source={NormalCookie} style={[styles.cookieImage, dynamicStyles.cookieImage]} />
                        <Text style={styles.cookieText}>Normal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowItem} onPress={() => handleRowItemClick(1000, NormalCookie)}>
                        <Image source={NormalCookie} style={[styles.cookieImage, dynamicStyles.cookieImage]} />
                        <Text style={styles.cookieText}>Well-done</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <TimerModal
                isVisible={modalVisible}
                onClose={closeModal}
                cookieImage={selectedCookieImage}
                cookieTime={selectedCookieTime}
            />
        </View>
    );
}

const styles=StyleSheet.create({
    wrapper: {
        marginTop: "5%",
        width: "100%",
        paddingStart: "10%",
        paddingEnd: "10%",
    },
    background: {
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
        paddingBottom: "12%",
        paddingTop: "10%",
        borderColor: "#EFCDA9",
        borderWidth: 7,
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: 'space-around',
        height: "100%",
    },
    rowItem: {
        justifyContent: "center",
        alignItems: "center",
    },
    cookieText: {
        color: "white",
        fontSize: RFValue(10),
        fontFamily: "PixelifySans",
    },
    cookieImage: {
        height: 150,
        width: 135,
    }
});
