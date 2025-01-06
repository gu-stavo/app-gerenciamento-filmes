import { View, StyleSheet, ScrollView } from "react-native";
import { Avatar, Button, Card, Text } from 'react-native-paper';

export default function Home({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Promoções</Text>
            <Card>
                <Card.Content>
                    <Text variant="titleLarge">Card title</Text>
                    <Text variant="bodyMedium">Card content</Text>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Actions>
                    <Button>Excluir</Button>
                    <Button>Editar</Button>
                </Card.Actions>
            </Card>
            <Text style={styles.title}>Mais comprados</Text>
            <ScrollView horizontal={true}>
                <Card style={styles.cardSmall}>
                    <Card.Content style={styles.cardSmallHeader}>
                        <Text variant="titleLarge" style={styles.titleSmail}>Card title</Text>
                        <Text variant="bodyMedium">Card content</Text>
                    </Card.Content>
                    <Card.Cover style={styles.cardSmallImg} source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Actions>
                        <Button>Excluir</Button>
                        <Button>Editar</Button>
                    </Card.Actions>
                </Card>
                <Card style={styles.cardSmall}>
                    <Card.Content style={styles.cardSmallHeader}>
                        <Text variant="titleLarge" style={styles.titleSmail}>Card title</Text>
                        <Text variant="bodyMedium">Card content</Text>
                    </Card.Content>
                    <Card.Cover style={styles.cardSmallImg} source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Actions>
                        <Button>Excluir</Button>
                        <Button>Editar</Button>
                    </Card.Actions>
                </Card>
                <Card style={styles.cardSmall}>
                    <Card.Content style={styles.cardSmallHeader}>
                        <Text variant="titleLarge" style={styles.titleSmail}>Card title</Text>
                        <Text variant="bodyMedium">Card content</Text>
                    </Card.Content>
                    <Card.Cover style={styles.cardSmallImg} source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Actions>
                        <Button>Excluir</Button>
                        <Button>Editar</Button>
                    </Card.Actions>
                </Card>
                <Card style={styles.cardSmall}>
                    <Card.Content style={styles.cardSmallHeader}>
                        <Text variant="titleLarge" style={styles.titleSmail}>Card title</Text>
                        <Text variant="bodyMedium">Card content</Text>
                    </Card.Content>
                    <Card.Cover style={styles.cardSmallImg} source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Actions>
                        <Button>Excluir</Button>
                        <Button>Editar</Button>
                    </Card.Actions>
                </Card>
                <Card style={styles.cardSmall}>
                    <Card.Content style={styles.cardSmallHeader}>
                        <Text variant="titleLarge" style={styles.titleSmail}>Card title</Text>
                        <Text variant="bodyMedium">Card content</Text>
                    </Card.Content>
                    <Card.Cover style={styles.cardSmallImg} source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Actions>
                        <Button>Excluir</Button>
                        <Button>Editar</Button>
                    </Card.Actions>
                </Card>
                <Card style={styles.cardSmall}>
                    <Card.Content style={styles.cardSmallHeader}>
                        <Text variant="titleLarge" style={styles.titleSmail}>Card title</Text>
                        <Text variant="bodyMedium">Card content</Text>
                    </Card.Content>
                    <Card.Cover style={styles.cardSmallImg} source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Actions>
                        <Button>Excluir</Button>
                        <Button>Editar</Button>
                    </Card.Actions>
                </Card>
                <Card style={styles.cardSmall}>
                    <Card.Content style={styles.cardSmallHeader}>
                        <Text variant="titleLarge" style={styles.titleSmail}>Card title</Text>
                        <Text variant="bodyMedium">Card content</Text>
                    </Card.Content>
                    <Card.Cover style={styles.cardSmallImg} source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Actions>
                        <Button>Excluir</Button>
                        <Button>Editar</Button>
                    </Card.Actions>
                </Card>
            </ScrollView>
        </ScrollView>
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
    titleSmail: {
        fontSize: 20
    },
    cardSmallHeader: {
        paddingTop: 5
    },
    cardSmall: {
        width: 200,
        marginEnd: 10,
        marginBottom: 10
    },
    cardSmallImg: {
        height: 100
    }
})