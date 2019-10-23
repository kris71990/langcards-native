import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../home/home';
import Profile from '../profile/profile';

import * as colors from '../../style/colors';

const MainNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Profile: { screen: Profile },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.HEADER_BACKGROUND,
      },
      headerTintColor: colors.HEADER_MENU,
    },
  },
);

const RootStack = createAppContainer(MainNavigator);

export default RootStack;
