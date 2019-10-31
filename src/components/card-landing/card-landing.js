import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

import * as wordActions from '../../actions/words';
import * as indexOptions from '../../utils/card-randomizer';
import autoBind from '../../utils/autobind';

const getData = async (prop) => {
  try {
    const value = await AsyncStorage.getItem(prop);
    if (value !== null) {
      return value;
    }
    return null;
  } catch (e) {
    return null;
  }
};

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

  componentDidMount() {
    let { words, languageProperties } = this.props;
    // TODO 
    // Render method receives props
    // CDM method should check if data exists in async storage and set it if it doesn't

    /* 
    ... 
      try {
        await response from getItem from Async storage
      } catch {
        await setItem
      }
    */
    if (!languageProperties.languageSelectionCode) {
      languageProperties = this.handleSetData('languageProperties');
    }
    if (!words.languageId) {
      words = this.handleSetData('words');
    } 
    return null;
  }

  handleSetData = async (prop) => {
    const { languageProperties } = this.props;
    if (prop === 'languageProperties') {
      await AsyncStorage.setItem(prop, JSON.stringify(languageProperties));
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
        await AsyncStorage.setItem(prop, JSON.stringify(words));
        return null;
      });
  };

  render() {
    let { words, languageProperties } = this.props;
    // const { score } = this.state;
    if (!words.langId) words = getData('words');
    if (!languageProperties.totalSpeakers) languageProperties = getData('languageProperties');

    return (
      <View>
        <Text>CARD CONTAINER</Text>
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
