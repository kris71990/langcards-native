import React from 'react';
import { 
  View, Text, ScrollView, TextInput, Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';

import formatter from '../../utils/formatter';
import styles from './edit-form.style';
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
      wordError: 'Error',
    };
    autoBind.call(this, EditForm);
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

  render() {
    const { languageSelectionTransliteration, languageSelection } = this.props.baseLang;
    const formattedLanguage = formatter({ 
      type: 'language-simple', language: languageSelection, 
    });

    return (
      <ScrollView style={ styles.homeBackground }>
        <View>
          <Text style={ styles.title }>Edit Word</Text>
          <View style={ styles.authContainer }>
            <Text>English</Text>
            <TextInput
              style={ styles.textInput }
              placeholder="ex. boy"
              placeholderTextColor="white"
              borderColor="transparent"
              onBlur={ Keyboard.dismiss }
              value={ this.state.wordEnglish }
              onChangeText={ this.handleChangeWordEnglish }
            />
            <Text>{ formattedLanguage }</Text>
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
                ? <TextInput
                    style={ styles.textInput }
                    placeholder="ni hao"
                    placeholderTextColor="white"
                    underlineColorAndroid="transparent"
                    onBlur={ Keyboard.dismiss }
                    value={ this.state.transliteration }
                    onChangeText={ this.handleChangeTransliteration }
                  />
                : null
            }
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
