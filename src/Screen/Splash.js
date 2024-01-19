// SplashScreen.js
import React, {useEffect} from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const Splash = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assest/fruitsNinja.jpeg')}
        style={styles.image}
      />
    </View>
  );
};

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: width,
    height: height,
    resizeMode: 'cover',
  },
});

export default Splash;
