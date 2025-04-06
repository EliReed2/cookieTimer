//Since this app remains on a single page, I am avoiding using tabs and placing all code (excluding components) on the index file
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, View, StyleSheet, Dimensions } from "react-native";
import CookInstructionsButton from "@/components/CookInstructionsButton";
import { useState } from "react";
import IngredientsModal from "@/components/IngredientsModal";
import InstructionsModal from "@/components/InstructionsModal"

const { width, height } = Dimensions.get('window');
//Image holder
const TimerBackground = require("../assets/images/stars.png");
const NormalCookie = require('../assets/images/cookie.png');
export default function Index() {
  //Ingredients Modal Booleam
  const [isIngredientModalVisible, setIsIngredientModalVisible] = useState<boolean>(false);

  //Instructions Modal Booleam
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
        <CookInstructionsButton label="ingredients" onPress={onIngredientButton}/>
        <IngredientsModal isVisible={isIngredientModalVisible} onClose={onIngredientModalClose}></IngredientsModal>
        <CookInstructionsButton label="instructions" onPress={onInstructionButton}></CookInstructionsButton>
        <InstructionsModal isVisible={isInstructionModalVisible} onClose={onInstructionModalClose}></InstructionsModal>
        <View style={styles.timerContainer}>
          <Image source={TimerBackground} style={styles.timerImage}/>;
        </View>
        <Image source={NormalCookie} style={{ width: 100, height: 100 }} resizeMode="contain"/>;
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
  },
  headerText: {
    fontSize: width * 0.035,
    padding: width * 0.035,
    color: "#6B4F4F",
  },
  timerContainer: {
    justifyContent: "flex-end", // Align content to the bottom
    alignItems: "center", // Center the image horizontally
    flex: 1, // Make the container take up all available space
  },
  timerImage: {
    width: "80%",
    height: undefined, // Maintain aspect ratio
    aspectRatio: 1, // Optional: Maintain aspect ratio of the image
  },
})