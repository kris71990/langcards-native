import React from 'react';
import {
  ScrollView, View, Text, TextInput, Keyboard, Alert, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import headers from '../../style/headers';
import styles from './auth-landing.style';

class AuthLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      version: 'Log In',
      username: '',
      password: '',
      email: '',
    };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleToggleState = this.handleToggleState.bind(this);
  }

  static navigationOptions = {
    title: 'Home',
  }

  handleChangeUsername(username) {
    this.setState({ username });
  }

  handleChangePassword(password) {
    this.setState({ password });
  }

  handleChangeEmail(email) {
    this.setState({ email });
  }

  handleToggleState() {
    if (this.state.version === 'Log In') {
      return this.setState({ version: 'Sign Up' });
    }
    return this.setState({ version: 'Log In' });
  }

  render() {
    const { navigation } = this.props;

    return (
      <ScrollView>
        <View>
          <Text style={ [headers.title, styles.title] }>{ this.state.version }</Text>
          <View style={ styles.authContainer }>
            <TextInput
              style={ styles.textInput }
              placeholder="Username"
              onBlur={ Keyboard.dismiss }
              value={ this.state.name }
              onChangeText={ this.handleChangeUsername }
            />
            <TextInput
              style={ styles.textInput }
              placeholder="Password"
              onBlur={ Keyboard.dismiss }
              value={ this.state.password }
              onChangeText={ this.handleChangePassword }
            />
            {
              this.state.version === 'Sign Up' 
                ? <TextInput
                  style={ styles.textInput }
                    placeholder="Email"
                    onBlur={ Keyboard.dismiss }
                    value={ this.state.password }
                    onChangeText={ this.handleChangePassword }
                  />
                : null
            }
            <View>
              <TouchableOpacity 
                style={ styles.authButtons }
                onPress={ () => Alert.alert('SUBMITTED') }
              >
                <Text style={ styles.buttonText }>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={ styles.authButtons }
                onPress={ this.handleToggleState }
              >
                <Text style={ styles.buttonText }>{ this.state.version === 'Log In' ? 'Go to Sign Up' : 'Go to Log In' }</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={ styles.guestButton }
            onPress={ () => navigation.navigate('Cards') }
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
};

export default AuthLanding;
