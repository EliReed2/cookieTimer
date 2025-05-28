//Since this app remains on a single page, I am avoiding using tabs and placing all code (excluding components) on the index file
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, View, StyleSheet, Dimensions } from "react-native";
import CookInstructionsButton from "@/components/CookInstructionsButton";
import { useState } from "react";
import IngredientsModal from "@/components/IngredientsModal";
import InstructionsModal from "@/components/InstructionsModal";
import BackgroundTimer from "@/components/BackgroundTimer";
import { RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get('window');
//Image holder
const TimerBackground = require("../assets/images/stars.png");
const NormalCookie = require('../assets/images/cookie.png');

export default function Index() {
  //Determine if app is being run on phone
  const isPhone = width < 600;

  //Ingredients Modal Boolean
  const [isIngredientModalVisible, setIsIngredientModalVisible] = useState<boolean>(false);

  //Instructions Modal Boolean
  const [isInstructionModalVisible, setIsInstructionModalVisible] = useState<boolean>(false);

  //On Ingredients Modal Close Function
  const onIngredientModalClose = () => {
    setIsIngredientModalVisible(false);
  };
  //Opens Ingredient Modal when button is pressed
  const onIngredientButton = () => {
    setIsIngredientModalVisible(true);
  }

  //On Instruction Modal Close Function
  const onInstructionModalClose = () => {
    setIsInstructionModalVisible(false);
  };
  //Opens Instruction Modal when button is pressed
  const onInstructionButton = () => {
    setIsInstructionModalVisible(true);
  }

  // Dynamic styles based on isPhone
  const dynamicStyles = {
    buttonWrapper: {
      paddingTop: isPhone ? 15 : 0,
      width: isPhone ? "100%" : "65%",
      height: isPhone ? "auto" : "20%",
      flexDirection: isPhone ? "column" : "row",
      justifyContent: isPhone ? "center" : "space-around",
      alignItems: isPhone ? "center" : "flex-end",
    } as const,
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF6E9",
      }}
    >
      <Text style={styles.headerText}>Cookie Helper</Text>
      <View style={styles.mainContainer}>
        <View style={[styles.buttonWrapper, dynamicStyles.buttonWrapper]}>
          <CookInstructionsButton label="ingredients" onPress={onIngredientButton}/>
          <IngredientsModal isVisible={isIngredientModalVisible} onClose={onIngredientModalClose} />
          <CookInstructionsButton label="instructions" onPress={onInstructionButton} />
          <InstructionsModal isVisible={isInstructionModalVisible} onClose={onInstructionModalClose} />
        </View>
        <BackgroundTimer />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFEBD2",
    width: "75%",
    height: "75%",
    borderColor: "#EFCDA9",
    borderWidth: 10,
    alignItems: "center",
  },
  headerText: {
    fontSize: RFValue(20),
    padding: width * 0.035,
    color: "#6B4F4F",
    fontFamily: "PixelifySans",
  },
  buttonWrapper: {
    // base styles
    justifyContent: "space-around",
    alignItems: "flex-end",
  }
});
