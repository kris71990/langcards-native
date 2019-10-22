import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import RootStack from './root-stack/root-stack';
import store from '../store';

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
    flex: 1,
  },
});

export default App;
