import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './errors.style';

const ActionError = ({ text }) => {
  return <Text style={ styles.errorMessage }>{ text }</Text>;
};

ActionError.propTypes = {
  text: PropTypes.string,
};

export default ActionError;
