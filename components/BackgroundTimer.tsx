import { Image, Text, View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import React, {useState} from 'react';
import TimerModal from './TimerModal';

//Image holder
const TimerBackground = require("../assets/images/stars.png");
const NormalCookie = require('../assets/images/cookie.png');

export default function BackgroundTimer() {
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

    return(
        <View style={styles.wrapper}>
            <ImageBackground source={TimerBackground} style={styles.background}>
                <View style={styles.rowContainer}>
                    <TouchableOpacity style={styles.rowItem} onPress={() => handleRowItemClick((600), NormalCookie)}>
                        <Image source={NormalCookie} style={styles.cookieImage} />
                        <Text style={styles.cookieText}>Gooey</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowItem} onPress={() => handleRowItemClick((800), NormalCookie)}>
                        <Image source={NormalCookie} style={styles.cookieImage} />
                        <Text style={styles.cookieText}>Normal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowItem} onPress={() => handleRowItemClick((1000), NormalCookie)}>
                        <Image source={NormalCookie} style={styles.cookieImage} />
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
        height: undefined,
        paddingStart: "10%",
        paddingEnd: "10%",
    },
    background: {
        width: "100%",
        height: "100%",
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
        fontSize: 20,
        fontFamily: "PixelifySans",
    },
    cookieImage: {
        height: 150,
        width: 135,
    }
});