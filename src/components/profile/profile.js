import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import TouchableButton from '../common/buttons/touchableButton';
import { resetHomeStack } from '../../utils/home-stack-actions';

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
    const { navigation, profile } = this.props;

    return (
      <View style={ styles.profileScreen }>
        {
          profile ? 
            <View style={ styles.profileViewContainer }>
              <View><Text style={ headers.title }>Welcome, NAME</Text></View>
              <View style={ styles.profileViewContainer }>
                <Text>Account Age: ACCOUNT_AGE</Text>
                <Table/> 
              </View>
            </View>
            : 
            <View>
              <View style={ styles.guestProfileContainer }>
                <Text style={ styles.guestProfileText }>Login or Signup to view your profile</Text> 
              </View>
              <TouchableButton
                stackNav={ () => navigation.dispatch(resetHomeStack) }
                text="Login"
              />
            </View>
        }
      </View>
    );
  }
}

Profile.propTypes = {
  navigation: PropTypes.object,
  // fetchProfile: PropTypes.func,
  // updateProfile: PropTypes.func,
  profile: PropTypes.object,
};

// const mapDispatchToProps = (dispatch) => ({
//   // fetchProfile: () => dispatch(profileActions.fetchProfileReq()),
//   // updateProfile: (profile, lang) => dispatch(profileActions.updateProfileReq(profile, lang)),
// });

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps, null)(Profile);
