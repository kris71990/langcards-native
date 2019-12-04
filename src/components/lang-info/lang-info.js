import React from 'react';
import PropTypes from 'prop-types';
import { 
  View, Text, SafeAreaView, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

import LoginButton from '../common/buttons/loginButton';
import AnimatedFlatList from '../common/animated-flatlist/animated-flatlist';
import { LanguageChoiceInfo } from '../common/language/language';
import { resetHomeStack } from '../../utils/home-stack-actions';

import { supportedLanguages } from '../../utils/supported-langs';
import styles from './lang-info.style';
import headers from '../../style/headers';

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
    const { navigation, token } = this.props;

    return (
      <SafeAreaView style={ styles.listContainer }>
        { !token ?
            <View>
              <LoginButton
                stackNav={ () => navigation.dispatch(resetHomeStack) }
              />
            </View>
          : null
        }
        <Text style={ headers.title }>Languages</Text>
        <AnimatedFlatList
          style={ styles.flatList }
          data={ supportedLanguages }
          renderItem={({ item, index }) => { 
            return (
              <TouchableOpacity onPress={ () => this.toggleInfo(index) }>
                <LanguageChoiceInfo data={ item } state={ this.state }/>
              </TouchableOpacity>
            );
          }}
          keyExtractor={ (item) => item.key }
        />
      </SafeAreaView>
    );
  }
}

LanguageInfo.propTypes = {
  navigation: PropTypes.object,
  token: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    token: state.auth,
  };
};

export default connect(mapStateToProps, null)(LanguageInfo);
