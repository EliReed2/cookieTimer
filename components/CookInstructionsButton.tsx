// Example CookInstructionsButton component
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CookInstructionsButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#EFCDA9',
    padding: 16,
    borderRadius: 6,
    marginBottom: 0,
    width: "40%",
  },
  buttonText: {
    fontSize: 16,
    color: '#6B4F4F',
    fontWeight: 'bold',
    textAlign: "center",
  },
});
