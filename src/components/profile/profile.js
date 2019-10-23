import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import styles from './profile.style';

class Profile extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const username = navigation.getParam('name', null);
    return {
      title: username ? username : 'Profile',
    };
  };

  render() {
    return (
      <View style={ styles.profileContainer }>
        <Text style={ styles.profileText }>Profile View</Text>
      </View>
    );
  }
}

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
