import React from 'react';
import { View, Picker } from 'react-native';
import PropTypes from 'prop-types';

import TouchableButton from '../common/buttons/touchableButton';
import autoBind from '../../utils/autobind';

import { supportedLanguages } from '../../utils/supported-langs';
import styles from './language-menu.style';

const defaultState = {
  selectedLanguage: null,
  localName: null,
  transliteration: null,
  spokenIn: null,
  family: null,
  totalSpeakers: null,
  languagesSupportedIndex: undefined,
};

class LanguageMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, LanguageMenu);
  }

  handleAdd() {
    const { languagesSupportedIndex } = this.state;
    if (!languagesSupportedIndex || languagesSupportedIndex === -1) return null;
    
    const languageToAdd = supportedLanguages[languagesSupportedIndex];

    this.props.onComplete({
      selectedLanguage: languageToAdd.name,
      localName: languageToAdd.localName,
      transliteration: languageToAdd.transliteration,
      spokenIn: languageToAdd.spokenIn,
      family: languageToAdd.family,
      totalSpeakers: languageToAdd.totalSpeakers,
    });
    return this.setState(defaultState);
  }

  render() {
    const { currentLangs } = this.props;
    const languageList = supportedLanguages.map((lang) => lang.name.toLowerCase());
    const availableLangs = languageList.filter((lang) => {
      if (!currentLangs.includes(lang)) {
        return lang;
      }
      return null;
    });

    return (
      <View style={ styles.menuContainer }>
        <View style={ styles.pickerContainer }>
          {
            availableLangs ? 
              <Picker
                style={ styles.picker }
                selectedValue={ this.state.selectedLanguage }
                onValueChange={(itemValue) => {
                  this.setState({ 
                    selectedLanguage: itemValue,
                    languagesSupportedIndex: languageList.indexOf(itemValue),
                  });
                }}>
                  <Picker.Item label={ 'Select' } value={ null }/>
                {
                  availableLangs.map((lang) => {
                    return (
                      <Picker.Item key={ lang } label={`${lang.charAt(0).toUpperCase()}${lang.slice(1)}`} value={ lang }/>
                    );
                  })
                }
              </Picker>
              : null
          }
        </View>
        <View>
          <TouchableButton
            text={ 'Add' }
            stackNav={ this.handleAdd }
          />
        </View>
      </View>
    );
  }
}

LanguageMenu.propTypes = {
  currentLangs: PropTypes.array,
  onComplete: PropTypes.func,
};

export default LanguageMenu;
