/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  View,
  Button,
  Text,
} from 'react-native';
import { connect } from 'react-redux';

import LanguageMenu from '../language-menu/language-menu';
import LanguagePanel from '../language-panel/language-panel';

import * as languageActions from '../../actions/language';
import autoBind from '../../utils/autobind';
import { resetHomeStack } from '../../utils/home-stack-actions';

import styles from './main-landing.style';

class MainLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authError: false,
      toggleMenu: false, 
    };
    autoBind.call(this, MainLanding);
  }

  static navigationOptions = {
    title: 'Cards',
  };

  componentDidMount() {
    // if (this.props.token) this.props.fetchProfile();
    return this.props.languagesFetch();
  }

  handleToggle() {
    return this.setState({
      toggleMenu: !this.state.toggleMenu,
      authError: false,
    });
  }

  render() {
    const { navigation } = this.props;
    const { 
      languages, languageSelection, translationDirection, 
    } = this.props.language;
    const { toggleMenu, authError } = this.state;

    let formattedLangSelect;
    let currentLangs;
    if (languages) currentLangs = languages.map((lang) => lang.languageName);

    return (
      <SafeAreaView style={ styles.homeBackground }>
        <View>
          <Button
            title="Login"
            onPress={ () => navigation.dispatch(resetHomeStack) }
          />
        </View>
        <View>
          <View style={ styles.sectionContainer }>
            <Text style={ styles.headerTitle }>Choose a Language</Text>
            <Text style={ styles.headerConjunction }>OR</Text>
            <Button 
              title={ toggleMenu ? 'Hide Language Menu' : 'Add a new Language' }
              onPress={ this.handleToggle }
            />
            {
              authError 
                ? <Text>Log in or sign up to add a language</Text>
                : null
            }
          </View>
          <View style={ styles.sectionContainer }>
            { // render add language menu component here
              toggleMenu
                ? <LanguageMenu
                    currentLangs={ currentLangs }
                  />
                : null
            }
          </View>
        </View>
        <View style={ styles.sectionContainerTwo }>
          { // render language choice menu component
            languages
              ? <LanguagePanel languages={ languages }/>
              : <Text>Server not responding</Text>
          }
          { // render translation choice component
            formattedLangSelect 
              ? <View><Text>Render translation choice menu</Text></View>
              : null
          }
          <View style={ styles.sectionContainer }>
            { languageSelection && translationDirection 
              ? <Button 
                  title="Show Cards"
                  onPress={ this.handleChoice }
                />
              : null
            }
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

MainLanding.propTypes = {
  navigation: PropTypes.object,
  language: PropTypes.object,
  languagesFetch: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    language: state.language,
    // token: state.auth,
    // profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  languagesFetch: () => dispatch(languageActions.languagesFetchRequest()),
  // setLanguage: lang => dispatch(languageActions.languageSelect(lang)),
  // setTransDir: dir => dispatch(languageActions.languageTransDirSet(dir)),
  // createLanguage: lang => dispatch(languageActions.languageCreateRequest(lang)),
  // wordsFetch: lang => dispatch(wordActions.wordsFetchRequest(lang)),
  // signup: user => dispatch(authActions.signupRequest(user)),
  // login: user => dispatch(authActions.loginRequest(user)),
  // createProfile: username => dispatch(profileActions.createProfileReq(username)),
  // fetchProfile: () => dispatch(profileActions.fetchProfileReq()),
  // updateProfile: (profile, lang, words) => dispatch(profileActions.updateProfileReq(profile, lang, words)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLanding);
