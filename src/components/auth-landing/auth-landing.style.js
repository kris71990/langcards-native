import { StyleSheet } from 'react-native';
import { HEADER_UNDERLINE, GUEST_BUTTON } from '../../style/colors';

export default StyleSheet.create({
  title: {
    borderBottomColor: HEADER_UNDERLINE,
    borderBottomWidth: 10,
  },
  
  authContainer: {
    marginTop: 20,
    backgroundColor: 'red',
  },

  textInput: {
    borderColor: 'black',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 80,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },

  authButtons: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },

  guestButton: {
    borderWidth: 1,
    borderColor: GUEST_BUTTON,
    backgroundColor: GUEST_BUTTON,
    padding: 10,
    margin: 50,
    marginTop: 40,
  },
});
