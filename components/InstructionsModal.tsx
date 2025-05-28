import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import InstructionsChecklist from './InstructionsChecklist';

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

export default function InstructionsModal({ isVisible, onClose }: Props) {
  return (
    <Modal transparent visible={isVisible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.modalText}>Start Cooking! 🍪</Text>
            <InstructionsChecklist />
          </ScrollView>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black background
  },
  modalContent: {
    width: '80%', // Adjust width of the modal content
    maxHeight: '90%', // Ensures the modal content doesn't exceed 90% of the screen height
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  scrollContainer: {
    flexGrow: 1, // Ensures that the ScrollView grows to fit its content
    paddingBottom: 20, // Add extra space at the bottom of the modal for the close button
    width: "100%",
  },
  modalText: {
    fontSize: 18,
    color: '#6B4F4F',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#FFD6E8',
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
  },
  buttonText: {
    color: '#6B4F4F',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
