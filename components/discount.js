import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { firestore } from '../services/connectionFirestore';
import DiscountedProductCard from './listdiscounts';
import { sendNotification } from './notification'; // Importação da função de notificação

export default function AddDiscountForm() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [discountType, setDiscountType] = useState('%');
    const [discountValue, setDiscountValue] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = firestore.collection('products').onSnapshot((snapshot) => {
            const productsList = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                productsList.push({
                    id: doc.id,
                    name: data.name,
                    price: parseFloat(data.price),
                    discount: data.discount || { type: '', value: '' }, // Modificando para objeto
                });
            });
            setProducts(productsList);
        });

        return () => unsubscribe();
    }, []);

    const handleDiscountTypeChange = (value) => {
        setDiscountType(value);
    };

    const handleAddDiscount = async () => {
        if (!selectedProduct || !discountValue) {
            alert('Por favor, selecione um produto e insira um valor de desconto.');
            return;
        }

        setLoading(true);

        const discountAmount = parseFloat(discountValue);

        // Encontra o produto selecionado na lista de produtos
        const selectedProductIndex = products.findIndex(product => product.id === selectedProduct);
        if (selectedProductIndex !== -1) {
            const updatedProducts = [...products];
            const product = updatedProducts[selectedProductIndex];
            product.discount = { type: discountType, value: discountAmount }; // Atualiza o desconto para objeto

            let discountedPrice = 0;
            if (discountType === '%') {
                discountedPrice = product.price - (product.price * discountAmount / 100);
            } else {
                discountedPrice = product.price - discountAmount;
            }
            product.discountedPrice = discountedPrice.toFixed(2);

            setProducts(updatedProducts);

            try {
                await firestore.collection('products').doc(selectedProduct).update({
                    discount: { type: discountType, value: discountAmount },
                    discountedPrice: product.discountedPrice,
                });

                // Enviar notificação após adicionar o desconto
                await sendNotification(product.name, discountType, discountAmount);

                alert('Desconto adicionado com sucesso!');
                setSelectedProduct('');
                setDiscountType('%');
                setDiscountValue('');
            } catch (error) {
                console.error('Erro ao adicionar desconto: ', error);
                alert('Ocorreu um erro ao adicionar o desconto. Por favor, tente novamente.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleRemoveDiscount = (productId) => {
        const updatedProducts = products.map(product => {
            if (product.id === productId) {
                product.discount = { type: '', value: '' };
                delete product.discountedPrice;
            }
            return product;
        });

        setProducts(updatedProducts);

        // Atualiza o documento do produto no Firestore para remover o desconto
        firestore.collection('products').doc(productId).update({
            discount: { type: '', value: '' },
        })
            .then(() => {
                alert('Desconto removido com sucesso!');
            })
            .catch((error) => {
                console.error('Erro ao remover desconto: ', error);
                alert('Ocorreu um erro ao remover o desconto. Por favor, tente novamente.');
            });
    };

    // Função para validar a entrada de números
    const handleDiscountValueChange = (text) => {
        const numericValue = text.replace(/[^0-9.]/g, '');
        setDiscountValue(numericValue);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>DESCONTOS</Text>
            <View style={styles.pickerContainer}>
                <RNPickerSelect
                    style={pickerSelectStyles}
                    onValueChange={(value) => setSelectedProduct(value)}
                    items={products.map(product => ({
                        label: `${product.name} - ${product.discount.value}${product.discount.type}`,
                        value: product.id
                    }))}
                    placeholder={{ label: "Selecione um produto", value: "" }}
                    value={selectedProduct} // Ensure the picker value reflects state
                />
            </View>

            <View style={styles.radioContainer}>
                <Text style={styles.text}>Escolha o Tipo do desconto:</Text>
                <TouchableOpacity
                    style={[styles.radioButton, discountType === '%' ? styles.radioButtonSelected : null]}
                    onPress={() => handleDiscountTypeChange('%')}
                >
                    <Text style={styles.radioButtonText}>%</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.radioButton, discountType === 'R$' ? styles.radioButtonSelected : null]}
                    onPress={() => handleDiscountTypeChange('R$')}
                >
                    <Text style={styles.radioButtonText}>R$</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Valor do desconto"
                keyboardType="numeric"
                onChangeText={handleDiscountValueChange}
                value={discountValue}
            />

            <TouchableOpacity
                style={[styles.button, loading ? styles.buttonDisabled : null]}
                onPress={handleAddDiscount}
                disabled={loading}
            >
                <Text style={styles.buttonText}>Adicionar Desconto</Text>
            </TouchableOpacity>

            {/* Renderizando a lista de produtos com desconto */}
            <ScrollView style={styles.cardContainer}>
                {products.filter(product => product.discount.value !== '').map(product => (
                    <DiscountedProductCard key={product.id} product={product} removeDiscount={() => handleRemoveDiscount(product.id)} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    pickerContainer: {
        marginBottom: 20, // Espaço entre o Picker e o restante do formulário
        borderWidth: 1,
        borderColor: '#121212',
        borderRadius: 8,
        overflow: 'hidden', // Para garantir que o conteúdo do Picker não ultrapasse os limites do contêiner
    },
    input: {
        borderWidth: 1,
        borderColor: '#121212',
        height: 40,
        borderRadius: 8,
        backgroundColor: "#efefe0",
        marginBottom: 10,
        paddingHorizontal: 10,
        fontSize: 20,
    },
    button: {
        backgroundColor: '#f39c12',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonDisabled: {
        backgroundColor: '#dcdcdc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    radioButton: {
        borderWidth: 1,
        borderColor: '#121212',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    radioButtonSelected: {
        backgroundColor: '#f39c12',
    },
    radioButtonText: {
        color: '#121212',
        fontSize: 20,
    },
    text: {
        justifyContent: 'center',
        fontSize: 20,
        marginBottom: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 20,
        marginTop: 10,
        marginHorizontal: 'auto'
    },
    cardContainer: {
        marginTop: 20,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 20,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        height: 40,
        backgroundColor: "#efefe0",
        paddingHorizontal: 10,// to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 20,
        borderWidth: 1,
        borderColor: '#121212',
        height: 40,
        borderRadius: 8,
        backgroundColor: "#efefe0",
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});
