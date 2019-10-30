import React from 'react';
import { 
  TouchableOpacity, SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';

import AnimatedFlatList from '../animated-flatlist/animated-flatlist';
import { LanguageChoicePanel } from '../language/language';
import autoBind from '../../utils/autobind';

import styles from './language-panel.style';

class LanguagePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      languageSelection: '',
      languageCode: null,
    };
    autoBind.call(this, LanguagePanel);
  }

  handleChange(item) {
    this.props.setLanguage({ 
      lang: item.languageName, 
      id: item.languageId, 
      transliteration: item.transliteration,
      spokenIn: item.spokenIn,
      family: item.family,
      totalSpeakers: item.totalSpeakers,
    });
    return this.setState({
      languageSelection: item.languageName,
      languageCode: item.languageId,
    });
  }

  render() {
    let { languages } = this.props;
    languages = languages.sort((a, b) => b.wordCount - a.wordCount); 

    return (
      <SafeAreaView style={ styles.panelContainer }>
        <AnimatedFlatList
          style={ styles.flatList } 
          data={ languages }
          renderItem={({ item }) => { 
            return (
              <TouchableOpacity onPress={ () => this.handleChange(item) }>
                <LanguageChoicePanel data={ item }/>
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
