import React from 'react';
import PropTypes from 'prop-types';
import { 
  View, Text, SafeAreaView, FlatList, 
} from 'react-native';

import { supportedLanguages } from '../../utils/supported-langs';
import styles from './lang-info.style';

function Language({ name }) {
  return (
    <View style={ styles.langContainer }>
      <Text>{ name }</Text>
    </View>
  );
}

class LanguageInfo extends React.Component {
  static navigationOptions = {
    title: 'Info',
  };

  render() {
    return (
      <SafeAreaView style={ styles.listContainer }>
        <Text style={ styles.title }>Languages</Text>
        <FlatList
          data={ supportedLanguages }
          renderItem={({ item }) => <Language name={ item.name }/>}
          keyExtractor={ (item) => item.key }
        />
      </SafeAreaView>
    );
  }
}

Language.propTypes = {
  name: PropTypes.string,
};

export default LanguageInfo;
