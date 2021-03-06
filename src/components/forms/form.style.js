import { StyleSheet } from 'react-native';
import {
  BASE,
  MID_GREY,
  LIGHT_GREY,
  ERROR_RED,
} from '../../style/colors';


export default StyleSheet.create({
  homeBackground: {
    backgroundColor: BASE,
  },
  title: {
    textAlign: 'center',
    margin: 10,
    fontSize: 20,
  }, 
  formContainer: {
    marginTop: 20,
  },
  label: {
    marginLeft: 20,
  },  
  textInput: {
    backgroundColor: LIGHT_GREY,
    borderTopColor: MID_GREY,
    borderBottomColor: MID_GREY,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    height: 60,
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  errorMsg: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: ERROR_RED,
  },
  pickerContainer: {
    marginTop: 20,
    backgroundColor: LIGHT_GREY,
    borderTopColor: MID_GREY,
    borderBottomColor: MID_GREY,
    borderBottomWidth: 2,
    borderTopWidth: 2,
  },
  picker: {
    color: 'white',
    marginLeft: -7,
  },
});
