import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import TouchableButton from '../common/buttons/touchableButton';

import autoBind from '../../utils/autobind';

import styles from './translation-choice.style';

class TranslationChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translationDirection: '',
    };
    autoBind.call(this, TranslationChoice);
  }

  handleChange(dir) {
    this.props.setTransDir(dir);
    return this.setState({
      translationDirection: dir,
    });
  }

  render() {
    const { formattedLangSelection } = this.props; 

    return (
      <View style={ styles.translationChoiceContainer }>
        <Text style={ styles.title }>Select Translation Direction</Text>
        <View style={ styles.translationChoiceButtons }>
          <TouchableButton
            text={ `${formattedLangSelection} - English` }
            stackNav={ () => this.handleChange('native-english') }
          />
          <TouchableButton
            text={ `English - ${formattedLangSelection}` }
            stackNav={ () => this.handleChange('english-native') }
          />
        </View>
        <View style={ styles.sectionContainer }>
        { 
          formattedLangSelection && this.state.translationDirection 
            ? <TouchableButton
                text="Show Cards"
                stackNav={ () => {
                  this.props.showCards();
                } }
              />
            : null
        }
        </View>
      </View>
    );
  }
}

TranslationChoice.propTypes = {
  formattedLangSelection: PropTypes.string,
  setTransDir: PropTypes.func,
  showCards: PropTypes.func,
};


export default TranslationChoice;
