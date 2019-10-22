import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../home/home';
import Profile from '../profile/profile';

const MainNavigator = createStackNavigator({
  Home: { screen: Home },
  Profile: { screen: Profile },
});

const RootStack = createAppContainer(MainNavigator);

export default RootStack;
