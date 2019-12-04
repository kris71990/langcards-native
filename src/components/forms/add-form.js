import React from 'react';
import { 
  View, Text, ScrollView, TextInput, Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';

import TouchableButton from '../common/buttons/touchableButton';
import formatter from '../../utils/formatter';
import styles from './form.style';
import autoBind from '../../utils/autobind';

const defaultState = {
  wordEnglish: '',
  wordLocal: '',
  transliteration: '',
  typeOfWord: '',
  categoryOfWord: '',
  wordError: undefined,
  wordDirty: false,
};

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, AddForm);
  }

  handleValidation() {
    const { 
      wordEnglish, wordLocal, typeOfWord, categoryOfWord, transliteration, 
    } = this.state;

    if (!wordEnglish || !wordLocal || !typeOfWord || !categoryOfWord || (this.props.baseLang.languageSelectionTransliteration && !transliteration)) {
      this.setState({
        wordDirty: true,
        wordError: 'Error',
      });
      return false;
    }

    this.setState({
      wordDirty: false,
      wordError: undefined,
    });
    return true;
  }

  handleChangeWordEnglish(wordEnglish) {
    return this.setState({ 
      wordEnglish,
      wordError: undefined,
    });
  }

  handleChangeWordLocal(wordLocal) {
    return this.setState({ 
      wordLocal,
      wordError: undefined,
    });
  }

  handleChangeTransliteration(transliteration) {
    return this.setState({ 
      transliteration,
      wordError: undefined,
    });
  }

  handleSubmit() {
    if (this.handleValidation()) {
      return this.props.onComplete(this.state);
    } 
    return null;
  }

  render() {
    const { languageSelectionTransliteration, languageSelection } = this.props.baseLang;
    const formattedLanguage = formatter({ 
      type: 'language-simple', language: languageSelection, 
    });

    return (
      <ScrollView style={ styles.homeBackground }>
        <View>
          <Text style={ styles.title }>Add Vocabulary ({ formattedLanguage })</Text>
          <View style={ styles.formContainer }>
            <Text style={ styles.label }>English</Text>
            <TextInput
              style={ styles.textInput }
              placeholder="ex. boy"
              placeholderTextColor="white"
              borderColor="transparent"
              onBlur={ Keyboard.dismiss }
              value={ this.state.wordEnglish }
              onChangeText={ this.handleChangeWordEnglish }
            />
            <Text style={ styles.label }>{ formattedLanguage }</Text>
            <TextInput
              style={ styles.textInput }
              placeholder="ex. garcon"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              onBlur={ Keyboard.dismiss }
              value={ this.state.wordLocal }
              onChangeText={ this.handleChangeWordLocal }
            />
            {
              languageSelectionTransliteration 
                ? 
                <View>
                  <Text style={ styles.label }>Transliteration</Text>
                  <TextInput
                    style={ styles.textInput }
                    placeholder="ni hao"
                    placeholderTextColor="white"
                    underlineColorAndroid="transparent"
                    onBlur={ Keyboard.dismiss }
                    value={ this.state.transliteration }
                    onChangeText={ this.handleChangeTransliteration }
                  />
                </View>
                : null
            }
          </View>
          {
            this.state.wordError ? 
              <Text style={ styles.errorMsg }>{ this.state.wordError }</Text> 
              : null
          }
          <View>
            <TouchableButton
              text="Submit"
              stackNav={ this.handleSubmit }
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

AddForm.propTypes = {
  lang: PropTypes.object,
  baseLang: PropTypes.object,
  onComplete: PropTypes.func,
  // profile: PropTypes.object,
  // addWord: PropTypes.func,
  // wordsFetch: PropTypes.func,
  // updateProfile: PropTypes.func,
  // fetchProfile: PropTypes.func,
};

export default AddForm;
