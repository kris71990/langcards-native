import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

import * as wordActions from '../../actions/words';
import * as indexOptions from '../../utils/card-randomizer';
import autoBind from '../../utils/autobind';

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('words');
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
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
    let { words, language } = this.props;
    if (!words.languageId) {
      let words;
      let language;
      setData = async () => {
        try {
          words = await AsyncStorage.setItem('words');
          language = await AsyncStorage.setItem('language');
          console.log('Words retrieved'); // eslint-disable-line
          const indexArr = indexOptions.createShuffledIndexArray(langData.words.length);
          return this.setState({
            cardTracker: indexArr,
            cardNumber: indexArr[0],
          });
        } catch {
          return this.props.wordsFetch({ 
            languageSelection: langData.languageSelection, 
            translationDirection: langData.translationDirection, 
            languageSelectionCode: langData.languageSelectionCode, 
            languageSelectionLocal: baseLangData.languageSelectionLocal,
            languageSelectionTransliteration: baseLangData.languageSelectionTransliteration,
            spokenIn: baseLangData.spokenIn,
            family: baseLangData.family,
            totalSpeakers: baseLangData.totalSpeakers,
          })
            .then(() => {
              console.log('Words retrieved'); // eslint-disable-line
              const indexArr = indexOptions.createShuffledIndexArray(langData.words.length);
              return this.setState({
                cardTracker: indexArr,
                cardNumber: indexArr[0],
              });
            });
        }
      };
    } 
    return null;
  }

  render() {
    let { words, languageProperties } = this.props;
    // const { score } = this.state;
    if (!words.langId) words = JSON.parse(localStorage.getItem('words'));
    if (!baseLangData.spokenIn) baseLangData = JSON.parse(localStorage.getItem('language'));

    return (
      <View>
        <Text>CARD CONTAINER</Text>
      </View>
    );
  }
}

CardLanding.propTypes = {
  words: PropTypes.object,
  language: PropTypes.object,
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
    language: state.language,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardLanding);
