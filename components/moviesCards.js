import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import { Card, Dialog, Portal, Button } from 'react-native-paper';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../service/connectionFirebase";

const onDelete = async (productId) => {
    try {
        const productRef = doc(db, "products", productId);
        await deleteDoc(productRef);
        Alert.alert("Produto Deletado com Sucesso!");
    } catch (error) {
        Alert.alert("Erro ao deletar o produto", error.message);
    }
};

export default function MoviesCard({ navigation, product }) {
    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const confirmDelete = () => {
        hideDialog();
        onDelete(product.id);
    };

    return (
        <View>
            <Card style={styles.movieImageThumbnail}>
                <View style={styles.movieDetails}>
                    <Image source={{ uri: product.image }} style={styles.movieImage} />
                    <View style={styles.textContainer}>
                        <Text style={styles.movieTitle}>{product.name}</Text>
                        <Text style={styles.movieDescription}>Produtora: {product.company}</Text>
                        <Text style={styles.movieDescription}>Gênero: {product.type}</Text>
                        <Text style={styles.movieDescription}>Nota: {product.score}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('EditProduct', { product })} style={styles.button}>
                                <Text style={styles.buttonText}>Editar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={showDialog} style={styles.button}>
                                <Text style={styles.buttonText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Card>

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
                    <Dialog.Title style={styles.dialogTitle}>Confirmar Exclusão</Dialog.Title>
                    <Dialog.Content>
                        <Text style={styles.dialogContent}>Você tem certeza que deseja excluir este filme?</Text>
                    </Dialog.Content>
                    <Dialog.Actions style={styles.dialogActions}>
                        <Button onPress={confirmDelete} style={styles.dialogButton}>
                            <Text style={styles.textoBotao}>Sim</Text>
                        </Button>
                        <Button onPress={hideDialog} style={styles.dialogButton}>
                            <Text style={styles.textoBotao}>Não</Text>
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    movieImageThumbnail: {
        width: "86%",
        height: 200,
        paddingBottom: 80,
        aspectRatio: 3.5 / 2,
        marginVertical: 10,
        marginHorizontal: "5%",
        marginBottom: 50,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#1E1E1E',
        elevation: 5,
        borderColor: 'white',
        borderWidth: 1,
    },
    movieImage: {
        height: '112%',
        aspectRatio: 2 / 3,
        backgroundColor: '#333',
        borderRadius: 15,
        marginRight: 10,
    },
    movieDetails: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 16,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    movieTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    movieDescription: {
        color: 'lightgray',
        fontSize: 14,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    button: {
        backgroundColor: 'red',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    dialog: {
        alignSelf: 'center',
        width: '80%',
        backgroundColor: 'red',
    },
    dialogTitle: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    dialogContent: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    dialogActions: {
        justifyContent: 'center',
    },
    dialogButton: {
        marginHorizontal: 10,
    },
    textoBotao: {
        color: 'white',
    },
});
