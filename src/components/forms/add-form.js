import React from 'react';
import { 
  View, Text, ScrollView, TextInput, Keyboard, Picker,
} from 'react-native';
import PropTypes from 'prop-types';

import TouchableButton from '../common/buttons/touchableButton';
import formatter from '../../utils/formatter';
import { wordTypes, wordCategories } from '../../utils/word-properties';
import styles from './form.style';
import autoBind from '../../utils/autobind';

const defaultState = {
  wordEnglish: '',
  wordLocal: '',
  transliteration: '',
  typeOfWord: '',
  category: '',
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
      wordEnglish, wordLocal, typeOfWord, category, transliteration, 
    } = this.state;

    // Scenario 1 - throw error if word already exists
    const existingWords = this.props.lang.words.map((word) => word.wordLocal);
    if (existingWords.includes(wordLocal)) {
      this.setState({
        wordDirty: true,
        wordError: 'Word Already Exists',
      });
      return false;
    }

    // Scenario 2 - throw error required field is null
    if (!wordEnglish || !wordLocal || !typeOfWord || !category || (this.props.baseLang.languageSelectionTransliteration && !transliteration)) {
      this.setState({
        wordDirty: true,
        wordError: 'Error',
      });
      return false;
    }

    // Scenario 3 - valid condition, post word
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
      return this.props.onComplete({ ...this.state, languageId: this.props.lang.languageId });
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
                    placeholder="ex. ni hao"
                    placeholderTextColor="white"
                    underlineColorAndroid="transparent"
                    onBlur={ Keyboard.dismiss }
                    value={ this.state.transliteration }
                    onChangeText={ this.handleChangeTransliteration }
                  />
                </View>
                : null
            }
            <Text style={ styles.label }>Type</Text>
            <View style={ styles.textInput }>
              <Picker
                style={ styles.picker }
                selectedValue={ this.state.typeOfWord }
                onValueChange={(itemValue) => {
                  this.setState({ typeOfWord: itemValue });
                }}>
                  <Picker.Item label={ 'Select' } value={ null }/>
                {
                  wordTypes.map((type) => {
                    return (
                      <Picker.Item key={ type } label={ type } value={ type }/>
                    );
                  })
                }
              </Picker>
            </View>
            <Text style={ styles.label }>Category</Text>
            <View style={ styles.textInput }>
              <Picker
                style={ styles.picker }
                selectedValue={ this.state.category }
                onValueChange={(itemValue) => {
                  this.setState({ category: itemValue });
                }}>
                  <Picker.Item label={ 'Select' } value={ null }/>
                {
                  wordCategories.map((category) => {
                    return (
                      <Picker.Item key={ category } label={ category } value={ category }/>
                    );
                  })
                }
              </Picker>
            </View>
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
