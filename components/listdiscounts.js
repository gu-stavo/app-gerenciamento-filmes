import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function DiscountedProductCard({ product, removeDiscount }) {
    const [visible, setVisible] = React.useState(false);

    return (
        <View style={styles.card}>
            <View style={styles.cardInfo}>
            <Text style={styles.productName}>{product.name} -  
            {product.discount.value !== '' && (
                <Text style={styles.discount}>{product.discount.type === 'R$' ? ` ${product.discount.type}${product.discount.value}` : ` ${product.discount.value}${product.discount.type}`}</Text>
            )}
            </Text>
            </View>
            <View style={styles.cardButton}>
            <TouchableOpacity onPress={() => setVisible(true)} style={styles.btnCancel}>
                <Icon name="trash" color="white" size={20}></Icon>
            </TouchableOpacity>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.image}>
                            <Icon name="warning" size={30} color="#DC2626" />
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.title}>Remover Desconto</Text>
                            <Text style={styles.message}>
                                Tem certeza de que deseja remover o desconto deste produto? Esta ação não pode ser desfeita.
                            </Text>
                        </View>
                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.desactivate} onPress={removeDiscount}>
                                <Text style={styles.buttonText}>Remover Desconto</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancel} onPress={() => setVisible(false)}>
                                <Text style={styles.buttonTextCancel}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    cardInfo: {
        flex: 1,
    },
    cardButton: {
        flex: 0.2,
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5,
    },
    discount: {
        fontSize: 20,
        marginTop: 5,
    },
    btnCancel: {
        backgroundColor: '#DC2626',
        paddingVertical: 5, // Diminuir o padding vertical para reduzir a altura do botão
        paddingHorizontal: 5, // Adicionar padding horizontal para ajustar o tamanho do botão
        borderRadius: 5,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        backgroundColor: '#FEE2E2',
        borderRadius: 50,
        padding: 10,
    },
    content: {
        marginTop: 15,
        alignItems: 'center',
    },
    title: {
        color: '#111827',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    message: {
        color: '#6B7280',
        textAlign: 'center',
    },
    actions: {
        marginTop: 20,
        width: '100%',
    },
    desactivate: {
        backgroundColor: '#DC2626',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    cancel: {
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 5,
        borderColor: '#D1D5DB',
        borderWidth: 1,
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 15,
    },
    buttonTextCancel: {
        color: 'black',
        textAlign: 'center',
    }
});
