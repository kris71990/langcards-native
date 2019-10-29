import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './language.style';

const InfoItemTextBlock = ({ text }) => {
  return <Text style={ styles.infoTextBlock }>{ text }</Text>;
};

const InfoItemTitle = ({ text }) => {
  return <Text style={ styles.infoTextTitle }>{ text }</Text>;
};

const LanguageChoiceInfo = ({ data, state }) => {
  const { showMoreInfoIndex } = state;
  const languageKey = parseInt(data.key, 10);
  return (
    <View style={ styles.langInfoContainer }>
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

const LanguageChoicePanel = ({ data }) => {
  return (
    <View style={ styles.langPanelContainer }>
      <Text style={ styles.langName }>
      { `${data.languageName.charAt(0).toUpperCase()}${data.languageName.slice(1)}` }
      </Text>
      <Text style={ styles.wordCount }>{ data.wordCount }</Text>
    </View>
  );
};

LanguageChoicePanel.propTypes = {
  data: PropTypes.object,
};

LanguageChoiceInfo.propTypes = {
  data: PropTypes.object,
  state: PropTypes.object,
};

InfoItemTitle.propTypes = {
  text: PropTypes.string,
};

InfoItemTextBlock.propTypes = {
  text: PropTypes.string,
};

export { LanguageChoiceInfo, LanguageChoicePanel };
