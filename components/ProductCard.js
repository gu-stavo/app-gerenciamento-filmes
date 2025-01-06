import { View, StyleSheet } from "react-native";
import { Avatar, Button, Card, Text } from 'react-native-paper';

export default function ProductCard({ navigation, product }) {
    return (
        <View style={styles.container}>
            <Card>
                <Card.Content>
                    <Text variant="titleLarge">{product.name}</Text>
                    <Text variant="bodyMedium">{product.brand}</Text>
                    <Text variant="bodyMedium">{product.type}</Text>
                    <Text variant="bodyMedium">{product.price}</Text>
                </Card.Content>
                <Card.Cover source={{ uri: product.imageURL }} style={{width: 200, height: 200}}/>
                <Card.Actions>
                    <Button>Excluir</Button>
                    <Button onPress={() => navigation.navigate('saveproduct', {product: product})}>Editar</Button>
                </Card.Actions>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    title: {
        fontSize: 30,
        marginVertical: 10
    },
})