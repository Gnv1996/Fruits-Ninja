import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../Screen/Splash';
import React, {useEffect} from 'react';
import MyDrawer from './Drawer';
import Game from '../Components/Game';
import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();

function MyStack() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('FruitsNinja');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Home" component={MyDrawer} />
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="FruitsNinja" component={Game} />
    </Stack.Navigator>
  );
}

export default MyStack;
