import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert, Image, Platform } from 'react-native';
import { updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from "../service/connectionFirebase";
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditProduct = ({ route, navigation }) => {
  const { product } = route.params;
  const [name, setName] = useState(product.name);
  const [company, setCompany] = useState(product.company);
  const [type, setType] = useState(product.type);
  const [score, setScore] = useState(product.score);
  const [image, setImage] = useState(product.image);
  const [imageBlob, setImageBlob] = useState(null); // Store image blob

  const handleSave = async () => {
    if (!name) {
      Alert.alert("Erro", "O campo Nome está em branco.");
      return;
    }
    if (!company) {
      Alert.alert("Erro", "O campo Produtora/Empresa está em branco.");
      return;
    }
    if (!type) {
      Alert.alert("Erro", "O campo Gênero está em branco.");
      return;
    }
    if (!score) {
      Alert.alert("Erro", "O campo Nota está em branco.");
      return;
    }
    if (!image) {
      Alert.alert("Erro", "O campo da Imagem está em branco.");
      return;
    }

    try {
      let imageUrl = image;

      if (imageBlob) {
        imageUrl = await uploadImage(imageBlob);
      }

      const productRef = doc(db, "products", product.id);
      await updateDoc(productRef, {
        name,
        company,
        type,
        score,
        image: imageUrl, // Store image URL in Firestore
      });

      Alert.alert("Sucesso", "Produto atualizado com sucesso!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao atualizar o produto.");
    }
  };

  const uploadImage = async (blob) => {
    const filename = `${new Date().toISOString()}.jpg`; // Ensure the filename is unique
    const storageRef = ref(storage, `productImages/${filename}`);
    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const pickImage = async () => {
    // Request camera roll permissions (optional for iOS)
    if (Platform.OS === 'ios') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão Negada', 'O aplicativo precisa de acesso à galeria para selecionar imagens.');
        return;
      }
    }

    // Launch image picker with options
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images
      allowsEditing: true, // Allow users to edit the image
      aspect: [4, 3], // Optional aspect ratio preference
      quality: 1, // Optional image quality (0-1)
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      const response = await fetch(uri);
      const blob = await response.blob();
      setImage(uri); // Store image URI on device
      setImageBlob(blob); // Store image blob for upload
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Produtora/Empresa"
        placeholderTextColor="#888"
        value={company}
        onChangeText={setCompany}
      />
      <TextInput
        style={styles.input}
        placeholder="Gênero"
        placeholderTextColor="#888"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Nota"
        placeholderTextColor="#888"
        value={score}
        onChangeText={setScore}
      />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ position: 'relative' }} >
          <Image source={image ? { uri: image } : require('../assets/image_icon.png')} style={{ width: 200, height: 200, marginBottom: 20 }} />
          <TouchableOpacity style={styles.btnAdd} onPress={pickImage}>
            <Icon name="create" size={25} color="#ffffff" />
          </TouchableOpacity>
          {image && <TouchableOpacity style={styles.btnRemove} onPress={() => { setImage(null); setImageBlob(null); }}>
            <Icon name="clear" size={25} color="#ffffff" />
          </TouchableOpacity>}
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>SALVAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212', // Fundo preto
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#212121', // Fundo cinza escuro
    color: 'white', // Texto branco
    borderColor: '#444', // Border color
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red', // Botão vermelho
    paddingVertical: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  btnAdd: {
    position: 'absolute',
    right: -20,
    top: 0,
    borderRadius: 10,
    backgroundColor: '#B5B5B5',
    padding: 5
  },
  btnRemove: {
    position: 'absolute',
    right: -20,
    bottom: 30,
    borderRadius: 10,
    backgroundColor: '#B5B5B5',
    padding: 5
  },
});

export default EditProduct;
