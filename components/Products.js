import { ScrollView, StyleSheet } from "react-native";
import { FAB } from 'react-native-paper';
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../service/connectionFirebase";

export default function Products({ navigation }) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getDocs(collection(db, 'products')).then((data) => {
            let productsArray = []

            data.forEach((doc) => {
                productsArray.push({id: doc.id, ...doc.data()})
            })
            
            setProducts(productsArray)
        console.log(products)
            })
    }, [])
    return (
        <ScrollView style={styles.container}>
            {products.length > 0 && products.map((product, index) => (
                <ProductCard navigation={navigation} product={product} key={index}/>
            ))}
            
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    fab: {
      position: 'fixed',
      margin: 16,
      right: 10,
      bottom: 20
    },
  })