import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { LIST_BORDER, GUEST_BUTTON } from '../../../style/colors';

const TouchableButton = ({ stackNav, text }) => {
  let touchableStyle;
  let textStyle;
  
  switch (text) {
    case 'Show Cards': {
      touchableStyle = 'toCardsButton';
      textStyle = 'toCardsButtonText';
      break;
    }
    case 'Back to Languages': {
      touchableStyle = 'backButton';
      textStyle = 'navButtonText';
      break;
    }
    case 'Add': {
      touchableStyle = 'addLanguageButton';
      textStyle = 'addLanguageButtonText';
      break;
    }
    case 'Add a new Language': {
      touchableStyle = 'hideLanguageButton';
      textStyle = 'hideLanguageButtonText';
      break;
    }
    case 'Hide Language Menu': {
      touchableStyle = 'hideLanguageButton';
      textStyle = 'hideLanguageButtonText';
      break;
    }
    case 'Login': {
      touchableStyle = 'loginButton';
      textStyle = 'navButtonText';
      break;
    }
    case '<-- Back': {
      touchableStyle = 'backModalButton';
      textStyle = 'backModalButtonText';
      break;
    }
    default: {
      touchableStyle = 'dirButton';
      textStyle = 'dirButtonText';
    }
  }

  return (
    <TouchableOpacity
      style={ styles[touchableStyle] }
      onPress={ stackNav }
    >
      <Text style={ styles[textStyle] }>{ text }</Text>
    </TouchableOpacity>
  );
};

TouchableButton.propTypes = {
  stackNav: PropTypes.func,
  text: PropTypes.string,
};

const styles = StyleSheet.create({
  toCardsButton: {
    textAlign: 'center',
    padding: 20,
    backgroundColor: LIST_BORDER,
  },
  toCardsButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  dirButton: {
    margin: 20,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: GUEST_BUTTON,
  },
  dirButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  backButton: {
    marginRight: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#ff5c5c',
  },
  loginButton: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#ff5c5c',
  },
  navButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backModalButton: {
    padding: 10,
    backgroundColor: '#ff5c5c',
  },
  backModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addLanguageButton: {
    width: 100,
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: GUEST_BUTTON,
  },
  addLanguageButtonText: {
    textAlign: 'center',
    color: 'white',
  },
  hideLanguageButton: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: GUEST_BUTTON,
  },
  hideLanguageButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});

export default TouchableButton;
