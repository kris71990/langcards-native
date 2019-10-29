import React from 'react';
import { 
  ScrollView, View, Text, Picker,
} from 'react-native';
import PropTypes from 'prop-types';

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
};

class LanguageMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, LanguageMenu);
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
      <ScrollView>
        <View>
        {
          availableLangs ? 
            <Picker
              style={ styles.picker }
              selectedValue={ this.state.selectedLanguage }
              onValueChange={(itemValue) => {
                this.setState({ selectedLanguage: itemValue });
              }}>
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
      </ScrollView>
    );
  }
}

LanguageMenu.propTypes = {
  currentLangs: PropTypes.array,
};

export default LanguageMenu;
