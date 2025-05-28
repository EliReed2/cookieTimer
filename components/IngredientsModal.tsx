import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import IngredientChecklist from './IngredientChecklist';

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

export default function IngredientsModal({ isVisible, onClose }: Props) {
  return (
    <Modal transparent visible={isVisible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}> Collect your Ingredients! 🍪 </Text>
          <IngredientChecklist/>
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
    width: 'auto', // Adjust width of the modal content
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
