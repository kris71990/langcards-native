import React from 'react';
import {
  ScrollView, View, Text, Button, TextInput, Keyboard, Alert,
} from 'react-native';

// import styles from './auth-landing.style';

class AuthLanding extends React.Component {
  render() {
    return (
      <ScrollView>
        <View>
          <Text>Auth Form Component</Text>
          <TextInput
            placeholder="Username"
            onBlur={ Keyboard.dismiss }
          />
          <TextInput
            placeholder="Password"
            onBlur={ Keyboard.dismiss }
          />
          <Button
            title="Log In"
            onPress={ () => Alert.alert('Logged In') }
          />
        </View>
      </ScrollView>
    );
  }
}

export default AuthLanding;
