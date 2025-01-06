import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Avatar, Button, Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from 'react-native-paper';
import { useEffect, useState } from "react";
import { TextInputMask } from 'react-native-masked-text';
import { addDoc, collection, doc } from "firebase/firestore";
import { db, storage } from "../services/firebaseConfig";
import ColorPickerComponent from "./ColorPickerComponent";
import ImageUploader from "./ImageUploader";
import InputColor from 'react-input-color';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { UniqueID } from "../utils/utils";

export default function SaveProduct({ route }) {
    const product = route.params;

    const [id, setId] = useState(null)
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [color, setColor] = useState('')
    const [price, setPrice] = useState('R$ 0,00')
    const [type, setType] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [image, setImage] = useState('')
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        console.log('teste', product)
    }, product)

    const handlePriceChange = (text) => {
        const numericValue = parseFloat(text.replace(/\D/g, '')) / 100;

        const formattedPrice = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(numericValue);

        setPrice(formattedPrice);
    };

    const saveproduct = async () => {
        if (validateData()) {
            if (id) {

            } else {
                const imageId = UniqueID()
                let urlImage = ''
                if(image) {
                    const storageRef = ref(storage, `imagens/${imageId}`)
                    await uploadBytes(storageRef, image).catch(() => {
                        alert('Não foi possível inserir o produto')
                        return
                    });
                    urlImage = await getDownloadURL(storageRef)
                }

                await addDoc(collection(db, "products"), {
                    name: name,
                    brand: brand,
                    color: color,
                    price: price,
                    type: type,
                    imageURL: urlImage
                }).catch(() => {
                    alert('Não foi possível inserir o produto')
                    return
                });

                alert('Produto inserido com sucesso!')
                navigation.navigate('productlist')
            }
        }

    }

    const validateData = () => {
        if (!name.trim()) {
            alert("O campo nome está vazio")
            return false
        } else if (!brand.trim()) {
            alert("O campo marca está vazio")
            return false
        } else if (!color.trim()) {
            alert("O campo cor está vazio")
            return false
        } else if (!price.trim()) {
            alert("O campo preço está vazio")
            return false
        } else if (!type.trim()) {
            alert("O campo tipo está vazio")
            return false
        } else {
            return true
        }
    }

    return (
        <ScrollView vertical={true} style={styles.container}>
            {/* <Button style={styles.btnGoBack}>
                <Icon name="arrow-back" size={30} /> 
                <Text style={styles.title}>
                    Cadastrar produto
                </Text>
            </Button> */}
            <ImageUploader image={image} setImage={setImage} />
            <TextInput
                label="Nome"
                value={name}
                type="color"
                mode="outlined"
                onChangeText={text => setName(text)}
            />
            {/* <View style={{zIndex: 2}}>
                <Text style={{borderRadius: '50%'}}>Cor:</Text>
                <InputColor
                    initialValue="#5e72e4"
                    onChange={setColor}
                    placement="bottom"
                
                />
            </View>
            <ColorPickerComponent /> */}
            <TextInput
                label="Marca"
                value={brand}
                mode="outlined"
                onChangeText={text => setBrand(text)}
            />
            <TextInput
                label="Cor"
                value={color}
                mode="outlined"
                onChangeText={text => setColor(text)}
            />
            <TextInput
                label="Preço"
                value={price}
                mode="outlined"
                onChangeText={handlePriceChange}
            />
            <TextInput
                label="Tipo"
                value={type}
                mode="outlined"
                onChangeText={text => setType(text)}
            />
            
            {/* <ColorPickerComponent visible={true} /> */}
            <TouchableOpacity style={styles.button} onPress={saveproduct}>
                <Text style={styles.btnText}>Salvar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    btnGoBack: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 0
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    btnText: {
        fontSize: 20
    }
})