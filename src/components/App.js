import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import RootStack from './root-stack/root-stack';
import store from '../store';

import { BASE } from '../style/colors';

class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <View style={ styles.base }>
          <RootStack/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: BASE,
    flex: 1,
  },
});

export default App;
