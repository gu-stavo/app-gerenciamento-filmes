import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Slider from '../components/component_carousel/slider';

const HomeScreen = () => {
  return (
   <SafeAreaView style={styles.home} >
        <Slider/>
    </SafeAreaView>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
    home: {
      backgroundColor: 'black',
    }
})