import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import TouchableButton from '../common/buttons/touchableButton';
import { resetHomeStack } from '../../utils/home-stack-actions';
import { computeAge } from '../../utils/date-parser';
import autoBind from '../../utils/autobind';

import * as authActions from '../../actions/auth';

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
  constructor(props) {
    super(props);
    autoBind.call(this, Profile);
  }

  static navigationOptions = ({ navigation }) => {
    const username = navigation.getParam('name', null);
    return {
      title: username ? username : 'Profile',
    };
  };

  handleLogout() {
    this.props.logout();
    return this.props.navigation.dispatch(resetHomeStack);
  }

  render() {
    const { navigation, profile } = this.props;
    let activeFor;
    if (profile) {
      activeFor = computeAge(profile.createdAt, 'account');
    }

    return (
      <View style={ styles.profileScreen }>
        {
          profile ? 
            <View style={ styles.profileViewContainer }>
              <View><Text style={ headers.title }>Welcome, { profile.name }</Text></View>
              <View style={ styles.profileViewContainer }>
                <Text>Account Age: { activeFor }</Text>
                <Table/> 
              </View>
              <TouchableButton
                stackNav={ this.handleLogout }
                text="Logout"
              />
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
  logout: PropTypes.func,
  token: PropTypes.string,
  // fetchProfile: PropTypes.func,
  // updateProfile: PropTypes.func,
  profile: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(authActions.logout()),
  // fetchProfile: () => dispatch(profileActions.fetchProfileReq()),
  // updateProfile: (profile, lang) => dispatch(profileActions.updateProfileReq(profile, lang)),
});

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    token: state.auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
