import { StyleSheet } from 'react-native';
import { GUEST_BUTTON, CARD_BUTTONS_LIGHT } from '../../../style/colors';

export default StyleSheet.create({
  cardText: {
    textAlign: 'center',
    fontSize: 24,
  },
  userActionButtons: {
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: GUEST_BUTTON,
  },  
  cardActionButtons: {
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: CARD_BUTTONS_LIGHT,
  },  
});
