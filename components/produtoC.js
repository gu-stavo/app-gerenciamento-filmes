import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../service/connectionFirebase";

export default function Products({ navigation }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getDocs(collection(db, 'products')).then((data) => {
            let productsArray = [];

            data.forEach((doc) => {
                productsArray.push({ id: doc.id, ...doc.data() });
            });

            setProducts(productsArray);
            console.log(products);
        });
    }, []);

    const handleEdit = (id) => {
        // Função de edição
        console.log('Editar produto', id);
    };

    const handleDelete = (id) => {
        // Função de exclusão
        console.log('Excluir produto', id);
    };

    const renderItem = ({ item }) => (
        <ProductItem
            product={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
            navigation={navigation} // Pass navigation prop here
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const ProductItem = ({ product, onEdit, onDelete, navigation }) => (
    <View style={styles.productContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.productDetails}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDescription}>{product.brand}</Text>
            <Text style={styles.productDescription}>{product.type}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('EditProduct', { product: product })} style={styles.button}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(product.id)} style={styles.button}>
                    <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    productContainer: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    productImage: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    productDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
    },
    productPrice: {
        fontSize: 16,
        color: '#000',
        marginVertical: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
