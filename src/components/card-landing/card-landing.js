import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

import * as wordActions from '../../actions/words';
import * as indexOptions from '../../utils/card-randomizer';
import autoBind from '../../utils/autobind';

async function getData(prop) {
  try {
    const value = await AsyncStorage.getItem(prop);
    return value;
  } catch (e) {
    return null;
  }
}

class CardLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: 0,
      cardTracker: [],
      isCorrect: false,
      answer: false,
      hintCategory: false,
      hintType: false,
      hintTransliteration: false,
      score: [0, 0],
      color: 'black',
      editing: false,
      actionError: undefined,
      delete: false,
    };
    autoBind.call(this, CardLanding);
  }

  // when component mounts, check to see if data exists in props
  // if it does, check if in async storage and conditionally set to async storage
  // if it doesn't, check if in async storage
  // if in async storage, return; if not, get data from server and set to async storage
  async componentDidMount() {
    const { words, languageProperties } = this.props;
    
    if (!words.languageId || !languageProperties.languageSelectionCode) {
      if (!languageProperties.languageSelectionCode) {
        const langPropsFromASIfNoProps = await this.handleGetData('languageProperties');
        if (!langPropsFromASIfNoProps) this.handleSetDataFromAPI('languageProperties');
      }
      if (!words.languageId) {
        const wordsFromASIfNoProps = await this.handleGetData('words');
        if (!wordsFromASIfNoProps) this.handleSetDataFromAPI('words');
      } 
      return null;
    }

    const langPropsFromASIfProps = await this.handleGetData('languageProperties');
    const wordsFromASIfProps = await this.handleGetData('words');

    if (!langPropsFromASIfProps) {
      await this.handleSetDataFromProps('languageProperties');
    }
    if (!wordsFromASIfProps) {
      await this.handleSetDataFromProps('words');
    }
    return null;
  }

  handleGetData = async (prop) => {
    try {
      const value = await AsyncStorage.getItem(prop);
      return value;
    } catch (e) {
      return null;
    }
  }

  handleSetDataFromProps = async (prop) => {
    const { languageProperties, words } = this.props;
    if (prop === 'languageProperties') {
      await AsyncStorage.setItem(prop, JSON.stringify(languageProperties));
      return null;
    }

    try {
      await AsyncStorage.setItem(prop, JSON.stringify(words));
      return null;
    } catch (e) {
      return null;
    } finally {
      const indexArr = indexOptions.createShuffledIndexArray(words.words.length);
      this.setState({
        cardTracker: indexArr,
        cardNumber: indexArr[0],
      });
    }
  }

  handleSetDataFromAPI = async (prop) => {
    const { languageProperties } = this.props;
    if (prop === 'languageProperties') {
      try {
        console.log('Language Properties retrieved'); // eslint-disable-line
        await AsyncStorage.setItem(prop, JSON.stringify(languageProperties));
      } catch {
        return null;
      }
      return null;
    }

    return this.props.wordsFetch({ 
      languageSelection: languageProperties.languageSelection, 
      translationDirection: languageProperties.translationDirection, 
      languageSelectionCode: languageProperties.languageSelectionCode, 
      languageSelectionLocal: languageProperties.languageSelectionLocal,
      languageSelectionTransliteration: languageProperties.languageSelectionTransliteration,
      spokenIn: languageProperties.spokenIn,
      family: languageProperties.family,
      totalSpeakers: languageProperties.totalSpeakers,
    })
      .then(() => {
        const { words } = this.props;
        console.log('Words retrieved'); // eslint-disable-line
        const indexArr = indexOptions.createShuffledIndexArray(words.words.length);
        this.setState({
          cardTracker: indexArr,
          cardNumber: indexArr[0],
        });
        return words;
      })
      .then(async (words) => {
        try {
          await AsyncStorage.setItem(prop, JSON.stringify(words));
          return null;
        } catch {
          return null;
        }
      });
  };

  render() {
    let { words, languageProperties } = this.props;
    let { score } = this.state;

    const { 
      cardNumber, answer, hintType, hintCategory, hintTransliteration,
    } = this.state;
    let flashcardWords;
    let totalWords;

    if (words && words.words) {
      flashcardWords = words.words;
      totalWords = flashcardWords.length;
    }

    return (
      <View>
        {
          flashcardWords && flashcardWords.length > 0
            ? 
            <View>
              <Text>Your {words.language} flashcards ({ totalWords ? totalWords : '0'})</Text>
              <View>
                <Text>{ words.translationDirection }</Text>
                <Text>{ `${score[0]}/${score[1]}` }</Text>
              </View>
              <View><Text>CARD JSX</Text></View>
              <View><Text>Card Buttons</Text></View>
            </View>
            : 
            <View>
              <Text>There are currently no flashcards to study for { words.language }.</Text>
              <Text>Add some words!</Text>
              <Text>Add Button</Text>
            </View>
        }
      </View>
    );
  }
}

CardLanding.propTypes = {
  words: PropTypes.object,
  languageProperties: PropTypes.object,
  wordsFetch: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  wordsFetch: (lang) => dispatch(wordActions.wordsFetchRequest(lang)),
  // wordUpdate: (word) => dispatch(wordActions.wordUpdateRequest(word)),
  // wordDelete: (id) => dispatch(wordActions.wordDeleteRequest(id)),
});

const mapStateToProps = (state) => {
  return {
    words: {
      language: state.words.languageSelection,
      languageId: state.words.languageSelectionCode,
      translationDirection: state.words.translationDirection,
      words: state.words.words,
    },
    languageProperties: state.language,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardLanding);
