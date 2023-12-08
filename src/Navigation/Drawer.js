import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import Game from '../Components/Game';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Game" component={Game} />
    </Drawer.Navigator>
  );
}
export default MyDrawer;
