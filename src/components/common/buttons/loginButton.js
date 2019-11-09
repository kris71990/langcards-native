import React from 'react';
import { Button } from 'react-native';
import PropTypes from 'prop-types';

const LoginButton = ({ stackNav }) => {
  return (
    <Button
      title="Login"
      onPress={ stackNav }
    />
  );
};

LoginButton.propTypes = {
  stackNav: PropTypes.func,
};

export default LoginButton;
