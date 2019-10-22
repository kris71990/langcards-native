import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import styles from './profile.style';

class Profile extends React.Component {
  render() {
    const { state } = this.props.navigation;

    return (
      <View style={ styles.profileContainer }>
        <Text style={ styles.profileText }>Welcome, { state.params.name }</Text>
      </View>
    );
  }
}

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
