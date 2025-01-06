import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MoviesCard from "./moviesCards";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../service/connectionFirebase";
import { FAB } from 'react-native-paper';


export default function Products({ navigation }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'products'), (querySnapshot) => {
            const productsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productsArray);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => (
        <MoviesCard navigation={navigation} product={item} />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate('TelaAddFilmes')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black', // Fundo preto para o container principal
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: 'white'
      },

});
