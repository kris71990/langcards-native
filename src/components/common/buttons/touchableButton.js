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
});

export default TouchableButton;
