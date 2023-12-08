import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  PanResponder,
  Text,
} from 'react-native';
import Fruit from './Fruit';

const {width, height} = Dimensions.get('window');

const fruits = [
  'apple',
  'banana',
  'basaha',
  'peach',
  'boom',
  'sandia',
  'pineApple',
  'orange',
  'pear',
  'anaar',
];

const getRandomPosition = () => ({
  x: Math.random() * (width - 60),
  y: -60,
});

const FlyingImage = () => {
  const [fruitAnimations, setFruitAnimations] = useState(() => {
    return fruits.map(() => ({
      animation: new Animated.Value(0),
      isCut: false,
    }));
  });
  const [score, setScore] = useState(0);

  useEffect(() => {
    const animations = fruitAnimations.map((fruit, index) => {
      const {animation, isCut} = fruit;
      const {x, y} = getRandomPosition();

      return Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
          delay: Math.random() * 2000,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]);
    });

    Animated.parallel(animations).start();

    Animated.loop(Animated.sequence(animations)).start();
  }, [fruitAnimations]);

  const handleFruitCut = index => {
    const updatedFruitAnimations = [...fruitAnimations];
    const fruit = updatedFruitAnimations[index];

    if (!fruit.isCut) {
      fruit.isCut = true;

      Animated.timing(fruit.animation, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        fruit.animation.setValue(1);
        setScore(prevScore => prevScore + 1);
        setFruitAnimations(updatedFruitAnimations);
      });
    }
  };

  const onAnimationComplete = index => {
    const updatedFruitAnimations = [...fruitAnimations];
    updatedFruitAnimations[index].isCut = false;
    setFruitAnimations(updatedFruitAnimations);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderRelease: (e, gesture) => {
      fruitAnimations.forEach((fruit, index) => {
        const fruitX = fruit.animation;

        if (
          gesture.moveX > fruitX &&
          gesture.moveX < fruitX + 60 &&
          gesture.moveY > height - 60
        ) {
          handleFruitCut(index);
        }
      });
    },
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {fruitAnimations.map((fruit, index) => (
        <Animated.View
          key={index}
          style={{
            position: 'absolute',
            opacity: fruit.animation,
            transform: [
              {
                translateY: fruit.animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [height, 0],
                }),
              },
              {
                translateX: fruit.animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [getRandomPosition().x, getRandomPosition().x],
                }),
              },
            ],
          }}>
          <Fruit
            type={fruits[index]}
            position={{x: 0, y: 0}}
            size={60}
            isCut={fruit.isCut}
            onAnimationComplete={() => onAnimationComplete(index)}
          />
        </Animated.View>
      ))}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  scoreContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default FlyingImage;
