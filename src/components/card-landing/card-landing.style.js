import { StyleSheet } from 'react-native';
import { 
  GUEST_BUTTON, 
  BASE, 
  CARD_BACKGROUND,
} from '../../style/colors';

export default StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: BASE,
  },
  cardText: {
    textAlign: 'center',
    fontSize: 24,
  },
  cardContent: {
    justifyContent: 'center',
    height: 300,
    borderWidth: 3,
    marginBottom: 20,
    marginTop: 50,
    backgroundColor: CARD_BACKGROUND,
  },  
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardButtons: {
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: GUEST_BUTTON,
  },  
});
