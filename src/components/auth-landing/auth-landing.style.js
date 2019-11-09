import { StyleSheet } from 'react-native';
import { 
  HEADER_UNDERLINE, GUEST_BUTTON, BASE, MID_GREY, ERROR_RED,
} from '../../style/colors';

export default StyleSheet.create({
  title: {
    borderBottomColor: HEADER_UNDERLINE,
    borderBottomWidth: 20,
  },

  homeBackground: {
    backgroundColor: BASE,
    borderTopWidth: 5,
    borderTopColor: GUEST_BUTTON,
  },
  
  authContainer: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: MID_GREY,
    backgroundColor: GUEST_BUTTON,
  },

  textInput: {
    borderBottomColor: MID_GREY,
    borderBottomWidth: 2,
    borderStyle: 'dashed',
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

  errorMessageContainer: {
    marginLeft: 20,
    marginTop: 20,
  },

  errorMessage: {
    fontWeight: 'bold',
    fontSize: 15,
    color: ERROR_RED,
  },
});
