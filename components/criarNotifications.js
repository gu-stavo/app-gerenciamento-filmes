import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, Dimensions } from 'react-native';
import * as Notifications from 'expo-notifications';
import { collection, addDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../service/connectionFirebase'; // Supondo que 'db' seja sua instância do Firestore

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Função de envio de notificação
const sendNotification = async (title, body, navigation) => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    Alert.alert('Permissão negada', 'Para enviar notificações, é necessário permitir o acesso.');
    return;
  }

  try {
    if (!title || !body) {
      throw new Error('Título e Corpo da notificação são obrigatórios.');
    }

    // Armazenando no Firestore usando Firebase Modular SDK
    const newNotificationRef = await addDoc(collection(db, 'notifications'), {
      title,
      body,
      read: false,
      timestamp: serverTimestamp(),
    });

    // Enviando notificação
    const { width, height } = Dimensions.get('window');
    const screenWidth = width < height ? width : height;

    if (Platform.OS === 'android') {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: 'default',
          data: { route: 'notifications' }
        },
        trigger: {
          seconds: 2,
        }
      });
    } else {
      if (screenWidth > 600) {
        Alert.alert('Nova Notificação', body); // Ação para iOS (exemplo: exibir alerta)
      }
    }

    navigation.goBack(); // Voltar após envio

  } catch (error) {
    Alert.alert('Erro ao enviar ou armazenar notificação', error.message);
  }
};

// Componente de tela para criar notificação
export default function CreateNotificationScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSendNotification = async () => {
    if (!title) {
        Alert.alert("Erro", "O campo Título está em branco.");
        return;
      }
      if (!body) {
        Alert.alert("Erro", "O campo Corpo está em branco.");
        return;
      }
    try {
      await sendNotification(title, body, navigation);
      setTitle('');
      setBody('');
    } catch (error) {
      Alert.alert('Erro ao enviar notificação', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Nova Notificação</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#888"
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Corpo"
        value={body}
        onChangeText={setBody}
        multiline
        placeholderTextColor="#888"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSendNotification}
      >
        <Text style={styles.buttonText}>Enviar Notificação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white', // Light background for better readability
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'red', // Vibrant blue for title
        textAlign: 'center', // Ensures text is centered within the container
      },
      input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 18,
        color: 'black',
      },
      multilineInput: {
        height: 100,
      },
      button: {
        backgroundColor: 'red', // Match title color for consistency
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
      },
      buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
      },
});
