import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import styles from './card.style';

const CardItemTextBlock = ({ text }) => {
  return <Text style={ styles.cardText }>{ text }</Text>;
};

const CardViewButton = ({ text, action }) => {
  let buttonType;
  if (text === 'Show Hint' || text === 'Hide Hint' || text === 'Next Card') {
    buttonType = 'cardActionButtons';
  } else {
    buttonType = 'userActionButtons';
  }

  return (
    <TouchableOpacity
      style={ styles[buttonType] } 
      onPress={ action }
    >
      <Text>{ text }</Text>
    </TouchableOpacity>
  );
};

CardItemTextBlock.propTypes = {
  text: PropTypes.string,
};

CardViewButton.propTypes = {
  text: PropTypes.string,
  action: PropTypes.func,
};

export { CardItemTextBlock, CardViewButton };
