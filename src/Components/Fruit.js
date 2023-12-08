import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, Animated, Easing} from 'react-native';

const Fruit = ({type, position, size, isCut, onAnimationComplete}) => {
  const [cutAnimation] = useState(new Animated.Value(0));
  const [showCutFruit, setShowCutFruit] = useState(false);

  useEffect(() => {
    if (isCut) {
      setShowCutFruit(true);
      Animated.timing(cutAnimation, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        cutAnimation.setValue(0);
        setShowCutFruit(false);
        onAnimationComplete();
      });
    }
  }, [isCut, cutAnimation, onAnimationComplete]);

  const fruitImages = {
    apple: {
      uncut: require('../assest/images/fruit/apple.png'),
      cut1: require('../assest/images/fruit/apple-1.png'),
      cut2: require('../assest/images/fruit/apple-2.png'), // Change to your cut image
    },
    banana: {
      uncut: require('../assest/images/fruit/banana.png'),
      cut1: require('../assest/images/fruit/banana-1.png'),
      cut2: require('../assest/images/fruit/banana-2.png'), // Change to your cut image
    },
    basaha: {
      uncut: require('../assest/images/fruit/basaha.png'),
      cut1: require('../assest/images/fruit/basaha-1.png'),
      cut2: require('../assest/images/fruit/basaha-2.png'), // Change to your cut image
    },
    boom: {
      uncut: require('../assest/images/fruit/boom.png'),
      cut1: require('../assest/images/fruit/boom.png'),
      cut2: require('../assest/images/fruit/boom.png'), // Change to your cut image
    },
    peach: {
      uncut: require('../assest/images/fruit/peach.png'),
      cut1: require('../assest/images/fruit/peach-1.png'),
      cut2: require('../assest/images/fruit/peach-2.png'), // Change to your cut image
    },
    sandia: {
      uncut: require('../assest/images/fruit/sandia.png'),
      cut1: require('../assest/images/fruit/sandia-1.png'),
      cut2: require('../assest/images/fruit/sandia-2.png'), // Change to your cut image
    },
    orange: {
      uncut: require('../assest/images/fruit/orange.png'),
      cut1: require('../assest/images/fruit/orange-1.png'),
      cut2: require('../assest/images/fruit/orange-1.png'), // Change to your cut image
    },
    pear: {
      uncut: require('../assest/images/fruit/pear.png'),
      cut1: require('../assest/images/fruit/apple-1.png'),
      cut2: require('../assest/images/fruit/apple-2.png'), // Change to your cut image
    },

    // Add more fruit images as needed
  };

  const cut1Image = fruitImages[type]?.cut1;
  const cut2Image = fruitImages[type]?.cut2;
  const uncutImage = fruitImages[type]?.uncut;

  return (
    <View
      style={[
        styles.fruit,
        {left: position.x, top: position.y, width: size, height: size},
      ]}>
      {!showCutFruit && <Image source={uncutImage} style={styles.image} />}
      {showCutFruit && (
        <Animated.View style={[styles.cut1Image, {opacity: cutAnimation}]}>
          <Image source={cut1Image} style={styles.image} />
        </Animated.View>
      )}
      {showCutFruit && (
        <Animated.View style={[styles.cut2Image, {opacity: cutAnimation}]}>
          <Image source={cut2Image} style={styles.image} />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fruit: {
    position: 'absolute',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  cut1Image: {
    ...StyleSheet.absoluteFillObject,
  },
  cut2Image: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Fruit;
