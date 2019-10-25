import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';

import { goToCards } from '../../utils/home-stack-actions';

import styles from './profile.style';
import headers from '../../style/headers';

const Table = () => {
  function renderRow(x, i) {
    return (
      <View key={ i } style={ styles.rowContainer }>
        <View style={ styles.row }><Text>{ x * 2 }</Text></View>
        <View style={ styles.row }><Text>{ x * 4 }</Text></View>
        <View style={ styles.row }><Text>{ x * 6 }</Text></View>
      </View>
    );
  }

  const data = [1, 2, 3, 4, 5];
  return (
    <View style={ styles.tableContainer }>
      {
        data.map((x, i) => renderRow(x, i))
      }
    </View>
  );
};

class Profile extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const username = navigation.getParam('name', null);
    return {
      title: username ? username : 'Profile',
    };
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={ styles.profileContainer }>
        <View>
          <Button
            title="Login"
            onPress={ () => navigation.dispatch(goToCards) }
          />
        </View>
        <View><Text style={ headers.title }>Welcome, NAME</Text></View>
        <View style={ styles.profileViewContainer }>
          <Text>Account Age: ACCOUNT_AGE</Text>
          <Table/>
        </View>
      </View>
    );
  }
}

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
