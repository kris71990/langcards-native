import { StyleSheet } from 'react-native';
import {
  BASE,
  GUEST_BUTTON,
  MID_GREY,
} from '../../style/colors';


export default StyleSheet.create({
  homeBackground: {
    backgroundColor: BASE,
    borderTopWidth: 5,
    borderTopColor: GUEST_BUTTON,
  },
  title: {
    textAlign: 'center',
    margin: 10,
    fontSize: 20,
  }, 
  textInput: {
    borderTopColor: MID_GREY,
    borderBottomColor: MID_GREY,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderStyle: 'dashed',
    height: 60,
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
