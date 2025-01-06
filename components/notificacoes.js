import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../service/connectionFirebase";
import { FAB, IconButton } from 'react-native-paper';

export default function NotificacaoScreen({ navigation }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'notifications'), (querySnapshot) => {
      const notificationsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotifications(notificationsArray);
    });
    return () => unsubscribe();
  }, []);

  const handleMarkAsRead = async (id) => {
    Alert.alert(
      'Marcar como Lida',
      'Você tem certeza que deseja marcar esta notificação como lida?',
      [
        {
          text: 'Sim', onPress: async () => {
            try {
              await deleteDoc(doc(db, 'notifications', id));
            } catch (error) {
              Alert.alert('Erro ao marcar como lida', error.message);
            }
          }
        },
        { text: 'Cancelar', style: 'cancel' }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.notification}>
      <Text style={styles.title}>Título: {item.title}</Text>
      <Text style={styles.body}>Corpo: {item.body}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.markAsReadButton]}
          onPress={() => handleMarkAsRead(item.id)}
        >
          <IconButton
            icon="check"
            iconColor="white"
            size={20}
            style={styles.iconButton}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <FAB
        label="Criar Notificação"
        style={styles.fab}
        onPress={() => navigation.navigate('CriarNotificacao')}
        icon="plus"
        labelStyle={{ color: 'white', fontWeight: 'bold' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  notification: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#202020',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  body: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'white'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markAsReadButton: {
    backgroundColor: '#FF0000', // Vermelho para botão de marcar como lida
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    margin: 0,
    color: 'white'
  },
});
