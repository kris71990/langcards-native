import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import RootStack from './root-stack/root-stack';
import store from '../store';

import { BASE, HEADER_BORDER_TOP } from '../style/colors';

class App extends React.Component {
  render() {
    console.log(store.getState()); // eslint-disable-line

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
    borderTopWidth: 10,
    borderTopColor: HEADER_BORDER_TOP,
  },
});

export default App;
