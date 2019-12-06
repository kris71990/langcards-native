import React from 'react';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';

import LanguageMenu from '../language-menu/language-menu';
import LanguagePanel from '../language-panel/language-panel';
import LoginButton from '../common/buttons/loginButton';
import ActionError from '../common/errors/errors';
import TouchableButton from '../common/buttons/touchableButton';

import * as languageActions from '../../actions/language';
import * as wordActions from '../../actions/words';
import * as profileActions from '../../actions/profile';
import { resetHomeStack, goToCards } from '../../utils/home-stack-actions';

import autoBind from '../../utils/autobind';

import styles from './main-landing.style';

class MainLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authError: false,
      toggleMenu: false,
      serverError: false, 
    };
    autoBind.call(this, MainLanding);
  }

  static navigationOptions = {
    title: 'Cards',
  };

  componentDidMount() {
    if (this.props.token && !this.props.profile) this.props.fetchProfile();
    return this.props.languagesFetch();
  }

  handleToggle() {
    const { token } = this.props;

    if (token) {
      return this.setState({
        toggleMenu: !this.state.toggleMenu,
        authError: false,
      });
    }

    return this.setState({
      toggleMenu: false,
      authError: true,
    });
  }

  handleChoice() {
    const { navigation } = this.props;
    const { 
      languageSelection, 
      languageSelectionCode, 
      translationDirection,
      languageSelectionTransliteration,
      languageSelectionLocal,
      spokenIn,
      family,
      totalSpeakers,
    } = this.props.language;

    if (languageSelection && translationDirection) {
      return this.props.wordsFetch({ 
        languageSelection, translationDirection, languageSelectionCode, languageSelectionLocal, languageSelectionTransliteration, spokenIn, family, totalSpeakers,
      })
        .then(() => navigation.dispatch(goToCards));
    }
    return this.props.setLanguage();
  }
  
  handleLanguageSelection(lang) {
    this.setState({
      toggleMenu: false,
      authError: false,
    });
    return this.props.setLanguage(lang);
  }

  handleCreateLanguage(lang) {
    if (!this.props.token) {
      this.setState({
        authError: true,
        toggleMenu: false,
      });
      return null;
    }

    const { profile } = this.props;
    return this.props.createLanguage(lang)
      .then(() => {
        this.setState({
          authError: false,
          toggleMenu: false,
        });
        console.log('language created'); // eslint-disable-line
      })
      .then(() => {
        return this.props.updateProfile(profile, lang.selectedLanguage, null);
      });
  }
  
  render() {
    const { navigation, token } = this.props;
    const { 
      languages, languageSelection,
    } = this.props.language;
    const { toggleMenu, authError } = this.state;

    let formattedLangSelection;
    let currentLangs;
    if (languages) currentLangs = languages.map((lang) => lang.languageName.toLowerCase());
    if (languageSelection) {
      formattedLangSelection = `${languageSelection.charAt(0).toUpperCase()}${languageSelection.slice(1)}`;
    }

    return (
      <SafeAreaView style={ styles.homeBackground }>
        {
          !token ?
            <View>
              <LoginButton
                stackNav={ () => navigation.dispatch(resetHomeStack) }
              />
            </View>
            : null
        }
        <View>
          <View style={ styles.sectionContainer }>
            <Text style={ styles.headerTitle }>Choose a Language</Text>
            <Text style={ styles.headerConjunction }>OR</Text>
            <TouchableButton 
              text={ toggleMenu ? 'Hide Language Menu' : 'Add a new Language' }
              stackNav={ this.handleToggle }
            />
            {
              authError 
                ? <ActionError text={ 'Login or signup to add a language' }/>
                : null
            }
          </View>
          <View style={ styles.sectionContainer }>
            { // render add language menu component here
              toggleMenu
                ? <LanguageMenu
                    currentLangs={ currentLangs }
                    onComplete={ this.handleCreateLanguage }
                  />
                : null
            }
          </View>
        </View>
        <View style={ styles.sectionContainerTwo }>
        { // render language choice menu component
          languages
            ? <LanguagePanel 
                languages={ languages }
                setLanguage={ (lang) => this.handleLanguageSelection(lang) }
                setTransDir={ this.props.setTransDir }
                showCards={ this.handleChoice }
                formattedLangSelection={ formattedLangSelection }
              /> 
            : <ActivityIndicator size="large"/>
        }
        </View>
      </SafeAreaView>
    );
  }
}

MainLanding.propTypes = {
  navigation: PropTypes.object,
  token: PropTypes.string,
  language: PropTypes.object,
  profile: PropTypes.object,
  languagesFetch: PropTypes.func,
  setLanguage: PropTypes.func,
  setTransDir: PropTypes.func,
  wordsFetch: PropTypes.func,
  createLanguage: PropTypes.func,
  fetchProfile: PropTypes.func,
  updateProfile: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    language: state.language,
    token: state.auth,
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  languagesFetch: () => dispatch(languageActions.languagesFetchRequest()),
  setLanguage: (lang) => dispatch(languageActions.languageSelect(lang)),
  setTransDir: (dir) => dispatch(languageActions.languageTransDirSet(dir)),
  createLanguage: (lang) => dispatch(languageActions.languageCreateRequest(lang)),
  wordsFetch: (lang) => dispatch(wordActions.wordsFetchRequest(lang)),
  fetchProfile: () => dispatch(profileActions.fetchProfileReq()),
  updateProfile: (profile, lang, words) => dispatch(profileActions.updateProfileReq(profile, lang, words)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLanding);
