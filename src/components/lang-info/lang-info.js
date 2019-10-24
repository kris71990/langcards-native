import React from 'react';
import PropTypes from 'prop-types';
import { 
  View, Text, SafeAreaView, TouchableOpacity,
} from 'react-native';

import AnimatedFlatList from '../animated-flatlist/animated-flatlist';
import { supportedLanguages } from '../../utils/supported-langs';
import styles from './lang-info.style';
import headers from '../../style/headers';

const InfoItemTextBlock = ({ text }) => {
  return <Text style={ styles.infoTextBlock }>{ text }</Text>;
};

const InfoItemTitle = ({ text }) => {
  return <Text style={ styles.infoTextTitle }>{ text }</Text>;
};

const Language = ({ data, state }) => {
  const { showMoreInfoIndex } = state;
  const languageKey = parseInt(data.key, 10);
  return (
    <View style={ styles.langContainer }>
      <Text 
        style={ showMoreInfoIndex === languageKey ? styles.selectedLanguage : styles.unselectedLanguage }>{ data.name }
      </Text>
      {
        showMoreInfoIndex === languageKey ?
          <View style={ styles.moreInfoContainer }>
            <InfoItemTitle text="Locally known as ..."/>
            <InfoItemTextBlock text={ data.localName ? data.localName : data.name }/>
            <InfoItemTitle text="Spoken by ..."/>
            <InfoItemTextBlock text={ `${data.totalSpeakers} people` }/>
            <InfoItemTitle text="Spoken in ..."/>
            <InfoItemTextBlock text={ data.spokenIn.join(', ') }/>
            <InfoItemTitle text="Family tree ..."/>
            <InfoItemTextBlock text={ data.family.join(' --> ') }/>
          </View>
          : null
      }
    </View>
  );
};

class LanguageInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreInfo: false, 
      showMoreInfoIndex: undefined,
    };
  }

  static navigationOptions = {
    title: 'Info',
  };

  toggleInfo = (index) => {
    if (this.state.showMoreInfo) {
      if (this.state.showMoreInfoIndex !== index) {
        return this.setState({
          showMoreInfoIndex: index,
        });
      }
      return this.setState({
        showMoreInfo: false,
        showMoreInfoIndex: undefined,
      });
    }
    return this.setState({
      showMoreInfo: true,
      showMoreInfoIndex: index,
    });
  }

  render() {
    return (
      <SafeAreaView style={ styles.listContainer }>
        <Text style={ headers.title }>Languages</Text>
        <AnimatedFlatList
          style={ styles.flatList }
          data={ supportedLanguages }
          renderItem={({ item, index }) => { 
            return (
              <TouchableOpacity onPress={ () => this.toggleInfo(index) }>
                <Language data={ item } state={ this.state }/>
              </TouchableOpacity>
            );
          }}
          keyExtractor={ (item) => item.key }
        />
      </SafeAreaView>
    );
  }
}

Language.propTypes = {
  data: PropTypes.object,
  state: PropTypes.object,
};

InfoItemTitle.propTypes = {
  text: PropTypes.string,
};

InfoItemTextBlock.propTypes = {
  text: PropTypes.string,
};

export default LanguageInfo;
