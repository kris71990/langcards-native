import React from 'react';
import { 
  TouchableOpacity, View, Text, Button,
} from 'react-native';
import PropTypes from 'prop-types';

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
          <TouchableOpacity
            style={ styles.dirButton }
            onPress={ () => this.handleChange('native-english') }
          >
            <Text style={ styles.buttonText }>
              { formattedLangSelection } - English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ styles.dirButton }
            onPress={ () => this.handleChange('english-native') }
          >
            <Text style={ styles.buttonText }>
              English - { formattedLangSelection }
            </Text>
          </TouchableOpacity>
        </View>
        <View style={ styles.sectionContainer }>
        { 
          formattedLangSelection && this.state.translationDirection 
            ? <Button 
                title="Show Cards"
                onPress={ () => {
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
