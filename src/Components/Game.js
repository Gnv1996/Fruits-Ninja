import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import FlyingImage from './FlyingImage';

const Game = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assest/images/background.jpg')}
        style={styles.backgroundImage}>
        <FlyingImage />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'brown',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default Game;
