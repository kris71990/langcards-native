import React from 'react';
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import styles from './lang-info.style';

class LanguageInfo extends React.Component {
  static navigationOptions = {
    title: 'Languages',
  };

  render() {
    return (
      <View style={ styles.langContainer }>
        <Text style={ styles.langText }>Language View</Text>
      </View>
    );
  }
}

export default LanguageInfo;
