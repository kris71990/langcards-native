import React from 'react';
import PropTypes from 'prop-types';
import { 
  View, Text, SafeAreaView, FlatList, TouchableOpacity,
} from 'react-native';

import { supportedLanguages } from '../../utils/supported-langs';
import styles from './lang-info.style';

function Language({ data, state }) {
  const { showMoreInfoIndex } = state;
  const languageKey = parseInt(data.key, 10);
  return (
    <View style={ styles.langContainer }>
      <Text>{ data.name }</Text>
      <View style={ styles.moreInfoContainer }>
        {
          showMoreInfoIndex === languageKey ? <Text>{ data.localName }</Text> : null
        }
      </View>
    </View>
  );
}

// function MoreInfo({ data, state }) {
//   return (
//     <View style={ styles.moreInfoContainer }>
//       {
//         showMoreInfoIndex === languageKey ? <Text>{ data.localName }</Text> : null
//       }
//     </View>
//   );
// }

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
        <Text style={ styles.title }>Languages</Text>
        <FlatList
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

// MoreInfo.propTypes = {
//   data: PropTypes.object,
// }

export default LanguageInfo;
