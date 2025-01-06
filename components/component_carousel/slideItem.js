import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Animated, Easing } from 'react-native';




const {width, height} = Dimensions.get('screen');

const SlideItem = ({ item }) => {
  // Verificação para garantir que 'item' não seja undefined
  if (!item) {
    return null;
  }

  const translateYImage = new Animated.Value(40);

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  return (
    <View style={styles.container}>
      <Animated.Image source={item.img} resizeMode="contain" style={[styles.image, {
        transform: [
          {
            translateY: translateYImage,
          }
        ]
      }]} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
    
  },
  image: {
    flex: 0.6,
    width: '100%',
    top: 20,
  },
  content: {
    flex: 0.4,
    alignItems: 'center',
    top: 25
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center', 
  },
  description: {
    fontSize: 20,
    marginVertical: 12,
    color: 'white',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  }
});
