import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';

const ColorSelector = () => {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [modalVisible, setModalVisible] = useState(false);

  const predefinedColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

  const openColorPicker = () => {
    setModalVisible(true);
  };

  const closeColorPicker = () => {
    setModalVisible(false);
  };

  const onColorChange = (color) => {
    setSelectedColor(color);
    closeColorPicker();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione uma Cor</Text>
      <View style={styles.predefinedColors}>
        {predefinedColors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.colorCircle, { backgroundColor: color }]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>
      <TouchableOpacity style={[styles.colorCircle, { backgroundColor: selectedColor }]} onPress={openColorPicker}>
        <Text style={styles.colorText}>+</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <ColorPicker
            onColorSelected={onColorChange}
            style={{ flex: 1 }}
          />
          <TouchableOpacity style={styles.closeButton} onPress={closeColorPicker}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  predefinedColors: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ColorSelector;
