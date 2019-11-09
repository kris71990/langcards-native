import React from 'react';
import {
  ScrollView, View, Text, TextInput, Keyboard, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import autoBind from '../../utils/autobind';

import * as authActions from '../../actions/auth';
import * as profileActions from '../../actions/profile';
import { goToMenu } from '../../utils/home-stack-actions';
import headers from '../../style/headers';
import styles from './auth-landing.style';

const defaultState = {
  version: 'Log In',
  username: '',
  usernameDirty: false,
  usernameError: 'Username required',
  password: '',
  passwordDirty: false,
  passwordError: 'Password required',
  email: '',
  emailDirty: false,
  emailError: 'Email required',
  errorMsgDisplay: [],
};

const MIN_NAME_LENGTH = 4;
const MIN_PASSWORD_LENGTH = 6;

class AuthLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, AuthLanding);
  }

  static navigationOptions = {
    title: 'Home',
  }

  handleValidation(name, value) {
    if (this.state.version === 'Log In') {
      return { error: null, dirty: false };
    }

    switch (name) {
      case 'username':
        if (value.length < MIN_NAME_LENGTH) {
          return {
            error: `Username must be at least ${MIN_NAME_LENGTH} characters.`,
            dirty: true,
          };
        }
        return { error: null, dirty: false };
      case 'email':
        if (!value.includes('@')) {
          return { 
            error: 'Provide a valid email.',
            dirty: true,
          };
        }
        return { error: null, dirty: false };
      case 'password': 
        if (value.length < MIN_PASSWORD_LENGTH) {
          return { 
            error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
            dirty: true,
          };
        }
        return { error: null, dirty: false };
      default:
        return null;
    }
  }

  handleConstructErrorMsg() {
    const { 
      usernameError, passwordError, emailError, version, 
    } = this.state;
    const errors = [
      usernameError ? usernameError : null,
      passwordError ? passwordError : null,
      emailError && version === 'Sign Up' ? emailError : null,
    ];
    return this.setState({
      errorMsgDisplay: errors.filter((err) => err),
    });
  }

  handleChangeUsername(username) {
    const status = this.handleValidation('username', username);
    return this.setState({ 
      username,
      usernameDirty: status.dirty,
      usernameError: status.error,
    });
  }

  handleChangePassword(password) {
    const status = this.handleValidation('password', password);
    return this.setState({
      password,
      passwordDirty: status.dirty,
      passwordError: status.error,
    });
  }

  handleChangeEmail(email) {
    const status = this.handleValidation('email', email);
    return this.setState({ 
      email,
      emailDirty: status.dirty,
      emailError: status.error,
    });
  }

  handleToggleState() {
    if (this.state.version === 'Log In') {
      return this.setState({ version: 'Sign Up' });
    }
    return this.setState({ version: 'Log In' });
  }

  handleSubmit() {
    const { usernameError, passwordError, emailError } = this.state;

    
    if (this.state.version === 'Log In' && (!usernameError && !passwordError)) {
      this.handleLogin(this.state);
      return this.setState(defaultState);
    } 
    
    if (this.state.version === 'Sign Up' && (!usernameError && !passwordError && !emailError)) {
      this.handleSignup(this.state);
      return this.setState(defaultState);
    }
  
    return this.handleConstructErrorMsg();
  }

  handleLogin(user) {
    return this.props.login(user)
      .then(() => {
        this.props.fetchProfile();
        return this.props.navigation.dispatch(goToMenu);
      })
      .catch(console.error); // eslint-disable-line
  }

  handleSignup(user) {
    return this.props.signup(user)
      .then(() => {
        this.props.createProfile({ name: user.username });
        return this.props.navigation.dispatch(goToMenu);
      })
      .catch(console.error); // eslint-disable-line
  }

  render() {
    const { navigation } = this.props;
    const { errorMsgDisplay } = this.state;

    return (
      <ScrollView style={ styles.homeBackground }>
        <View>
          <Text style={ [headers.title, styles.title] }>{ this.state.version }</Text>
          <View style={ styles.authContainer }>
            <TextInput
              style={ styles.textInput }
              placeholder="Username"
              placeholderTextColor="white"
              borderColor="transparent"
              onBlur={ Keyboard.dismiss }
              value={ this.state.name }
              onChangeText={ this.handleChangeUsername }
            />
            <TextInput
              style={ styles.textInput }
              placeholder="Password"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              secureTextEntry={ true }
              onBlur={ Keyboard.dismiss }
              value={ this.state.password }
              onChangeText={ this.handleChangePassword }
            />
            {
              this.state.version === 'Sign Up' 
                ? <TextInput
                    style={ styles.textInput }
                    placeholder="Email"
                    placeholderTextColor="white"
                    underlineColorAndroid="transparent"
                    onBlur={ Keyboard.dismiss }
                    value={ this.state.email }
                    onChangeText={ this.handleChangeEmail }
                  />
                : null
            }
            <View>
              <TouchableOpacity 
                style={ styles.authButtons }
                onPress={ this.handleSubmit }
              >
                <Text style={ styles.buttonText }>{ this.state.version }</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={ styles.authButtons }
                onPress={ this.handleToggleState }
              >
                <Text style={ styles.buttonText }>{ this.state.version === 'Log In' ? 'Go to Sign Up' : 'Go to Log In' }</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={ styles.errorMessageContainer }>
            { errorMsgDisplay.length > 0 
              ?
              errorMsgDisplay.map((err, i) => {
                return (
                  <Text key={ i } style={ styles.errorMessage }>{ err }</Text>
                );
              })
              : null
            }
          </View>
          <TouchableOpacity
            style={ styles.guestButton }
            onPress={ () => navigation.dispatch(goToMenu) }
          >
            <Text style={ styles.buttonText }>Continue as guest...</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

AuthLanding.propTypes = {
  navigation: PropTypes.object,
  signup: PropTypes.func,
  login: PropTypes.func,
  fetchProfile: PropTypes.func,
  createProfile: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    token: state.auth,
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(authActions.signupRequest(user)),
  login: (user) => dispatch(authActions.loginRequest(user)),
  createProfile: (username) => dispatch(profileActions.createProfileReq(username)),
  fetchProfile: () => dispatch(profileActions.fetchProfileReq()),
  // updateProfile: (profile, lang, words) => dispatch(profileActions.updateProfileReq(profile, lang, words)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLanding);
