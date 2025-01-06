import React, { useState } from 'react';
import { View, Button, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native';
// import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../services/firebaseConfig';
import imageIcon from './../../assets/image_icon.png'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ImageUploader({ image, setImage }) {
  const [imageURI, setImageURI] = useState(null);

  const chooseImage = async () => {
    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (response.didCancel) {
      console.log('Cancelado pelo usuário');
    } else if (response.error) {
      console.log('Erro: ', response.error);
    } else {
      const { uri } = response.assets[0];
      const imageResponse = await fetch(uri);
      const blob = await imageResponse.blob();
      console.log(response)
      setImageURI(uri)
      setImage(blob)
    }
  };

  const removeImage = () => {
    setImageURI('')
    setImage('')
  }

  // const uploadImage = async (uri) => {
  //   const filename = uri.substring(uri.lastIndexOf('/') + 1);

  //   const storageRef = ref(storage, `imagens/${filename}`)

  //   const snapshot = await uploadBytes(storageRef, uri);
  // };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ position: 'relative' }} >
        <Image source={imageURI ? { uri: imageURI } : imageIcon} style={{ width: 200, height: 200, marginBottom: 20 }} />
        <TouchableOpacity style={styles.btnAdd} onPress={chooseImage}>
          <Icon name="create" size={25} color="#ffffff" />
        </TouchableOpacity>
        {image && <TouchableOpacity style={styles.btnRemove} onPress={removeImage}>
          <Icon name="clear" size={25} color="#ffffff" />
        </TouchableOpacity>}
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
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
