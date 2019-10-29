import React from 'react';
import { 
  View, Text, TouchableOpacity, SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';

import AnimatedFlatList from '../animated-flatlist/animated-flatlist';
import autoBind from '../../utils/autobind';

import styles from './language-panel.style';

const LanguageSimple = ({ data }) => {
  const languageKey = data.languageId;
  return (
    <View style={ styles.langContainer }>
      <Text style={ styles.langName }>
      { `${data.languageName.charAt(0).toUpperCase()}${data.languageName.slice(1)}` }
      </Text>
      <Text style={ styles.wordCount }>{ data.wordCount }</Text>
    </View>
  );
};

class LanguagePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languageSelection: '',
      languageCode: null,
    };
    autoBind.call(this, LanguagePanel);
  }

  render() {
    let { languages } = this.props;
    languages = languages.sort((a, b) => b.wordCount - a.wordCount); 
    // const { languageSelection } = this.state;

    return (
      <SafeAreaView style={ styles.panelContainer }>
        <AnimatedFlatList
          style={ styles.flatList } 
          data={ languages }
          renderItem={({ item }) => { 
            return (
              <TouchableOpacity onPress={ () => console.log('meh') }>
                <LanguageSimple data={ item }/>
              </TouchableOpacity>
            );
          }}
          keyExtractor={ (item) => item.languageId }
        />
      </SafeAreaView>
    );
  }
}

LanguagePanel.propTypes = {
  languages: PropTypes.array,
  setLanguage: PropTypes.func,
};

export default LanguagePanel;
