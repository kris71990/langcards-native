import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import CheckBox from '@react-native-community/checkbox';
import PropTypes from 'prop-types';

import TouchableButton from '../common/buttons/touchableButton';
import EditFormModal from '../modals/edit-modal';
import ConfirmModal from '../modals/confirm-modal';
import AddFormModal from '../modals/add-modal';
import ActionError from '../common/errors/errors';
import { CardViewButton, CardItemTextBlock } from '../common/card/card';
import { resetHomeStack } from '../../utils/home-stack-actions';
import scoreParser from '../../utils/score-parser';
import cardViewFormatter from '../../utils/formatter';
import * as wordActions from '../../actions/words';
import * as indexOptions from '../../utils/card-randomizer';
import autoBind from '../../utils/autobind';

import styles from './card-landing.style';

// async function getData(prop) {
//   try {
//     const value = await AsyncStorage.getItem(prop);
//     return value;
//   } catch (e) {
//     return null;
//   }
// }

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
      deleting: false,
      adding: false,
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

  handleFormat(type) {
    return cardViewFormatter({ 
      type, 
      language: this.props.words.language, 
      direction: this.props.words.translationDirection,
    });
  }

  handleRandomCard() {
    const { 
      score, cardTracker, isCorrect, 
    } = this.state;
    const { words } = this.props.words;
    const updatedScore = [...score];
    const indices = [...cardTracker];

    let updatedIndices = indexOptions.updateIndexArray(indices);
    if (updatedIndices.length === 0) {
      updatedIndices = indexOptions.createShuffledIndexArray(words.length);
    }
    
    if (isCorrect) {
      updatedScore[0] += 1;
      updatedScore[1] += 1;
    } else {
      updatedScore[1] += 1;
    }

    const updatedColor = scoreParser(updatedScore);

    return this.setState({
      cardTracker: updatedIndices,
      cardNumber: updatedIndices[0],
      isCorrect: false,
      score: updatedScore,
      answer: false,
      hintCategory: false,
      hintType: false,
      hintTransliteration: false,
      color: updatedColor,
      actionError: undefined,
    });
  }

  handleFlipCard() {
    const flip = !this.state.answer;
    return this.setState({
      answer: flip,
      actionError: undefined,
    });
  }

  handleHideHint() {
    return this.setState({
      hintCategory: false,
      hintType: false,
      hintTransliteration: false,
      actionError: undefined,
    });
  }

  handleHint() {
    const { words } = this.props.words;
    const { cardNumber } = this.state;
    const rand = Math.floor(Math.random() * 100 + 1);

    if (words[cardNumber].transliteration) {
      switch (rand % 3) {
        case 0:
          return this.setState({
            hintCategory: true,
            hintType: false,
            hintTransliteration: false,
            actionError: undefined,
          });
        case 1:
          return this.setState({
            hintType: true,
            hintCategory: false,
            hintTransliteration: false,
            actionError: undefined,
          });
        default:
          return this.setState({
            hintType: false,
            hintCategory: false,
            hintTransliteration: true,
            actionError: undefined,
          });
      }
    }

    switch (rand % 2) {
      case 0:
        return this.setState({
          hintCategory: true,
          hintType: false,
          hintTransliteration: false,
          actionError: undefined,
        });
      default: 
        return this.setState({
          hintType: true,
          hintCategory: false,
          hintTransliteration: false,
          actionError: undefined,
        });
    }
  }

  handleCreateWord(word) {
    return this.props.wordAdd(word);
  }

  handleUpdateWord(word) {
    return this.props.wordUpdate(word)
      .then(() => {
        this.setState({
          editing: false,
          actionError: undefined,
        });
      });
  }

  handleDeleteWord() {
    const { words } = this.props;
    const id = words.words[this.state.cardNumber].wordId;
    return this.props.wordDelete(id)
      .then(() => {
        return this.setState({
          deleting: false,
        });
      });
  }

  render() {
    const { words, navigation, token } = this.props;
    const { 
      score, 
      editing, 
      deleting, 
      adding, 
      cardNumber, 
      answer, 
      hintType, 
      hintCategory, 
      hintTransliteration,
    } = this.state;

    let formattedLang;
    let flashcardWords;
    let totalWords;

    if (words && words.words) {
      flashcardWords = words.words;
      totalWords = flashcardWords.length;
      formattedLang = cardViewFormatter({ type: 'language-simple', language: words.language });
    }

    let cardJSX;
    let editJSX;
    let deleteJSX;
    let addJSX;
    if (flashcardWords && flashcardWords.length > 0) {
      switch (words.translationDirection) {
        case 'native-english':
          if (!answer) {
            cardJSX = 
              <View style={ styles.cardContent }>
                <CardItemTextBlock text={ flashcardWords[cardNumber].wordLocal }/>
              { hintType ? 
                  <CardItemTextBlock 
                    text={`(${flashcardWords[cardNumber].typeOfWord})`}
                  /> 
                : null 
              }
              { hintCategory ? 
                  <CardItemTextBlock
                    text={ `(${flashcardWords[cardNumber].category})` }
                  /> 
                : null 
                }
              { hintTransliteration ? 
                  <CardItemTextBlock
                    text={`(${flashcardWords[cardNumber].transliteration})`}
                  /> 
                : null 
              }
              </View>;
          } else {
            cardJSX = 
              <View style={ styles.cardContent }>
                <CardItemTextBlock text={ flashcardWords[cardNumber].wordEnglish }/>
              </View>;
          }
          break;
        case 'english-native':
          if (!answer) {
            cardJSX = 
              <View style={ styles.cardContent }>
                <CardItemTextBlock text={ flashcardWords[cardNumber].wordEnglish }/>
              </View>;
          } else {
            cardJSX = 
              <View style={ styles.cardContent }>
                <CardItemTextBlock text={ flashcardWords[cardNumber].wordLocal }/>
              { hintType ? 
                  <CardItemTextBlock 
                    text={ `(${flashcardWords[cardNumber].typeOfWord})` }
                  /> 
                : null 
              }
              { hintCategory ? 
                <CardItemTextBlock 
                  text={ `(${flashcardWords[cardNumber].category})`}
                /> 
                : null 
              }
              { hintTransliteration ? 
                <CardItemTextBlock text={ `(${flashcardWords[cardNumber].transliteration})` }/> 
                : null 
              }
              </View>;
          }
          break;
        default: 
          cardJSX = <View><Text>Card Error</Text></View>;
      }
    }

    if (editing && token) {
      editJSX = 
        <EditFormModal
          close={ () => this.setState({ editing: false, actionError: undefined })}
          word={ flashcardWords[this.state.cardNumber] }
          lang={ this.props.words }
          baseLang={ this.props.languageProperties }
          onComplete={ this.handleUpdateWord }
        />;
    } else {
      editJSX = null;
    }

    if (deleting && token) {
      deleteJSX = 
        <ConfirmModal
          messageTxt={ 'Are you sure you want to delete?' }
          onConfirm={ this.handleDeleteWord }
          onBack={ () => this.setState({ deleting: false, actionError: undefined }) }
        />;
    } else {
      deleteJSX = null;
    }

    if (adding && token) {
      addJSX = 
        <AddFormModal
          close={ () => this.setState({ adding: false, actionError: undefined })}
          lang={ this.props.words }
          baseLang={ this.props.languageProperties }
          onComplete={ this.handleCreateWord }
        />;
    } else {
      addJSX = null;
    }

    return (
      <View style={ styles.cardContainer }>
        <View style={ styles.appNavButtons }>
          <TouchableButton
            text="Back to Languages"
            stackNav={ () => navigation.navigate('Main') }
          />
          {
            !token ?
              <TouchableButton 
                text="Login"
                stackNav={ () => navigation.dispatch(resetHomeStack) }
              />
              : null
          }
        </View>
        { editJSX }
        { deleteJSX }
        { addJSX }
        {
          flashcardWords && flashcardWords.length > 0
            ? 
            <View>
              <View style={ styles.headerContainer }>
                <Text style={ styles.cardHeader}>Your { this.handleFormat('language-simple') } flashcards ({ totalWords ? totalWords : '0'})</Text>
                <View style={ styles.cardSubheader }>
                  <Text style={ styles.subheaderText }>{ this.handleFormat('trans') }</Text>
                  <Text style={ [styles.subheaderText, styles[this.state.color]] }>{ `${score[0]}/${score[1]}` }</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={ this.handleFlipCard }
              >
                { cardJSX }
              </TouchableOpacity>
              <View style={ styles.checkbox }>
                <CheckBox
                  value={ this.state.isCorrect }
                  onValueChange={ () => this.setState({ isCorrect: !this.state.isCorrect })}
                />
                <Text>Correct?</Text>
              </View>
              <View style={ styles.buttonsContainer }>
                {
                  hintType || hintCategory || hintTransliteration ?
                    <CardViewButton
                      text="Hide Hint"
                      action={ this.handleHideHint }
                    />
                    : 
                    <CardViewButton
                      text="Show Hint"
                      action={ this.handleHint }
                    />
                }
                <CardViewButton
                  text="Next Card"
                  action={ this.handleRandomCard }
                />
              </View>
              <View style={ styles.buttonsContainer }>
                <CardViewButton
                  text="Edit"
                  action={ () => {
                    if (token) {
                      return this.setState({ editing: true, actionError: undefined });
                    }
                    return this.setState({ editing: false, actionError: 'edit' });
                  }}
                />
                <CardViewButton
                  text="Delete"
                  action={ () => {
                    if (token) {
                      return this.setState({ deleting: true, actionError: undefined });
                    }
                    return this.setState({ deleting: false, actionError: 'delete' });
                  } }
                />
                <CardViewButton
                  text="Add"
                  action={ () => {
                    if (token) {
                      return this.setState({ adding: true, actionError: undefined });
                    }
                    return this.setState({ adding: false, actionError: 'add' });
                  } }
                />
              </View>
              { 
                this.state.actionError 
                  ? <ActionError text={ `Log in to ${this.state.actionError}` }/> 
                  : null 
              }
            </View>
            : 
            <View style={ styles.nullCardsContainer }>
              <Text style={ styles.nullCardsContainerTxt }>There are currently no flashcards to study for { formattedLang }.</Text>
              <TouchableButton
                text="Add Words"
                stackNav={ () => {
                  if (token) {
                    return this.setState({ adding: true, actionError: undefined });
                  }
                  return this.setState({ adding: false, actionError: 'add' });
                } }
              />
              {
                this.state.actionError 
                  ? <ActionError text={ `Log in to ${this.state.actionError}`}/>
                  : null
              }
            </View>
        }
      </View>
    );
  }
}

CardLanding.propTypes = {
  navigation: PropTypes.object,
  token: PropTypes.string,
  words: PropTypes.object,
  languageProperties: PropTypes.object,
  wordsFetch: PropTypes.func,
  wordAdd: PropTypes.func,
  wordUpdate: PropTypes.func,
  wordDelete: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  wordsFetch: (lang) => dispatch(wordActions.wordsFetchRequest(lang)),
  wordUpdate: (word) => dispatch(wordActions.wordUpdateRequest(word)),
  wordDelete: (id) => dispatch(wordActions.wordDeleteRequest(id)),
  wordAdd: (word) => dispatch(wordActions.wordPostRequest(word)),
});

const mapStateToProps = (state) => {
  return {
    token: state.auth,
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
