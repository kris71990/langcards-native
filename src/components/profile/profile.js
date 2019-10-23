import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import styles from './profile.style';

class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={ styles.profileContainer }>
        <Text style={ styles.profileText }>Welcome, { JSON.stringify(navigation.getParam('name', undefined)) }</Text>
      </View>
    );
  }
}

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
