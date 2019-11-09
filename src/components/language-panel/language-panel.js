import React from 'react';
import { 
  TouchableOpacity, SafeAreaView, Modal, Text,
} from 'react-native';
import PropTypes from 'prop-types';

import AnimatedFlatList from '../common/animated-flatlist/animated-flatlist';
import TranslationChoice from '../translation-choice/translation-choice';
import { LanguageChoicePanel } from '../common/language/language';
import autoBind from '../../utils/autobind';

import styles from './language-panel.style';

const defaultState = {
  languageSelection: '',
  languageCode: null,
  isModalOpen: false,
};

class LanguagePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
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
      isModalOpen: true,
    });
  }

  handleShowCards() {
    this.props.showCards();
    return this.setState(defaultState);
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
        { this.state.isModalOpen ?
            <Modal
              animationType="fade"
              transparent={ false }
              visible={ this.state.isModalOpen }
              onRequestClose={() => {
                return this.setState({ 
                  isModalOpen: false,
                  languageSelection: '',
                  languageCode: null,
                });
              }}>
              <TouchableOpacity
                style={ styles.backButton }
                onPress={() => {
                  return this.setState({ 
                    isModalOpen: false,
                    languageSelection: '',
                    languageCode: null,
                  });
                }}
              >
                <Text style={ styles.backButtonText }>{ '<-- Back' }</Text>
              </TouchableOpacity>
              <TranslationChoice
                formattedLangSelection={ this.props.formattedLangSelection }
                setTransDir={ this.props.setTransDir }
                showCards={ this.handleShowCards }
              />
            </Modal>
          : null
          }
      </SafeAreaView>
    );
  }
}

LanguagePanel.propTypes = {
  languages: PropTypes.array,
  setLanguage: PropTypes.func,
  setTransDir: PropTypes.func,
  showCards: PropTypes.func,
  formattedLangSelection: PropTypes.string,
};

export default LanguagePanel;
