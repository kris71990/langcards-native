import React from 'react';
import { 
  View, Text, ScrollView, TextInput, Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';

import TouchableButton from '../common/buttons/touchableButton';
import formatter from '../../utils/formatter';
import styles from './form.style';
import autoBind from '../../utils/autobind';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    const { word } = props;
    this.state = {
      wordEnglish: word.wordEnglish,
      wordLocal: word.wordLocal,
      transliteration: word.transliteration,
      typeOfWord: word.typeOfWord,
      categoryOfWord: word.category,
      wordDirty: false,
      wordError: undefined,
    };
    autoBind.call(this, EditForm);
  }

  handleValidation() {
    const { wordEnglish, wordLocal, transliteration } = this.state;

    if (!wordEnglish || !wordLocal || (this.props.baseLang.languageSelectionTransliteration && !transliteration)) {
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
    });
  }

  handleChangeWordLocal(wordLocal) {
    return this.setState({ 
      wordLocal,
    });
  }

  handleChangeTransliteration(transliteration) {
    return this.setState({ 
      transliteration,
    });
  }

  handleSubmit() {
    if (this.handleValidation()) {
      return this.props.onComplete({ ...this.state, wordId: this.props.word.wordId });
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
          <Text style={ styles.title }>Edit Word</Text>
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

EditForm.propTypes = {
  word: PropTypes.object,
  lang: PropTypes.object,
  baseLang: PropTypes.object,
  onComplete: PropTypes.func,
};

export default EditForm;
