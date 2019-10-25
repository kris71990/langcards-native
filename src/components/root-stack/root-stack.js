import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../home/home';
import Profile from '../profile/profile';
import LanguageInfo from '../lang-info/lang-info';
import AuthLanding from '../auth-landing/auth-landing';

import * as colors from '../../style/colors';

const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: AuthLanding },
    Cards: { screen: Home },
    Info: { screen: LanguageInfo },
    Profile: { screen: Profile },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      /* eslint react/display-name: 0 */
      /* eslint react/prop-types: 0 */
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Info':
            iconName = 'ios-information-circle';
            break;
          case 'Profile':
            iconName = 'md-contact';
            break;
          default:
            iconName = 'ios-home';
        }
        return <Icon name={ iconName } size={ 25 } color={ tintColor }/>;
      },
    }),
    tabBarOptions: {
      activeBackgroundColor: colors.HEADER_BACKGROUND,
      activeTintColor: colors.HEADER_MENU,
      inactiveBackgroundColor: colors.MID_GREY,
      inactiveTintColor: 'black',
    },
  },
);

const RootStack = createAppContainer(TabNavigator);

export default RootStack;
