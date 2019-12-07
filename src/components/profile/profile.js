import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import TouchableButton from '../common/buttons/touchableButton';
import { resetHomeStack } from '../../utils/home-stack-actions';
import { computeAge } from '../../utils/date-parser';
import autoBind from '../../utils/autobind';

import * as authActions from '../../actions/auth';
import * as profileActions from '../../actions/profile';

import styles from './profile.style';
import headers from '../../style/headers';

const Table = ({ languages }) => {
  function renderRow(language) {
    const langAge = computeAge(language.added, 'lang');
    return (
      <View key={ language.language } style={ styles.rowContainer }>
        <View style={ styles.row }><Text>{ language.language }</Text></View>
        <View style={ styles.row }><Text>{ langAge }</Text></View>
        <View style={ styles.row }>
          <Text>{ language.wordsAdded ? language.wordsAdded : 0 }</Text>
        </View>
        <View style={ styles.row }>
          <Text>
            { 
              language.score[1] > 0 ? 
                `${language.score[0]}/${language.score[1]}` : 0 
            }
          </Text>
        </View>
        <View style={ styles.row }>
          <Text>{ language.skillLevel ? language.skillLevel : 'None' }</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={ styles.table }>
      <View style={ styles.rowContainer }>
        <View style={ styles.headerRow }><Text>Language</Text></View>
        <View style={ styles.headerRow }><Text>Studied for</Text></View>
        <View style={ styles.headerRow }><Text>Words Added</Text></View>
        <View style={ styles.headerRow }><Text>Score</Text></View>
        <View style={ styles.headerRow }><Text>Level</Text></View>
      </View>
      <View style={ styles.tableContainer }>
        {
          languages.map((language) => renderRow(language))
        }
      </View>
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

  componentDidMount() {
    return this.props.fetchProfile();
  }

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
            <View>
              <View style={ styles.headerContainer }>
                <Text style={ headers.title }>Welcome, { profile.name }</Text>
              </View>
              <Text style={ styles.accountAge }>Account Age: { activeFor }</Text>
              <View style={ styles.profileViewContainer }>
                <Table languages={ profile.languages }/> 
              </View>
              <View style={ styles.logoutButton }>
                <TouchableButton
                  stackNav={ this.handleLogout }
                  text="Logout"
                />
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
  logout: PropTypes.func,
  token: PropTypes.string,
  fetchProfile: PropTypes.func,
  // updateProfile: PropTypes.func,
  profile: PropTypes.object,
};

Table.propTypes = {
  languages: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(authActions.logout()),
  fetchProfile: () => dispatch(profileActions.fetchProfileReq()),
  // updateProfile: (profile, lang) => dispatch(profileActions.updateProfileReq(profile, lang)),
});

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    token: state.auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
