import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, ViewStyle } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

export default function CookInstructionsButton({ label, onPress }: { label: string; onPress: () => void }) {
  const { width } = Dimensions.get('window');
  const isPhone = width < 600;

  // Dynamic style for the button width based on device
  const dynamicButtonStyle = {
    width: isPhone ? "60%" : "40%", 
  } as ViewStyle;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, dynamicButtonStyle]}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#EFCDA9',
    padding: 16,
    marginTop: 10,
    borderRadius: 6,
    marginBottom: 0,
  },
  buttonText: {
    fontSize: RFValue(10),
    color: '#6B4F4F',
    fontWeight: 'bold',
    textAlign: "center",
  },
});
