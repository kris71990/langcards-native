import { StyleSheet } from 'react-native';
import { 
  BASE, 
  CARD_BACKGROUND,
} from '../../style/colors';

export default StyleSheet.create({
  appNavButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: BASE,
  },
  nullCardsContainer: {
    flex: 1,
    justifyContent: 'center',
  },  
  nullCardsContainerTxt: {
    marginLeft: 40,
    marginRight: 40,
    fontSize: 20,
  },  
  cardHeader: {
    marginTop: 30,
    fontSize: 24,
    textAlign: 'center',
  },
  cardSubheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  cardText: {
    textAlign: 'center',
    fontSize: 24,
  },
  cardContent: {
    justifyContent: 'center',
    height: 250,
    borderWidth: 3,
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: CARD_BACKGROUND,
  },  
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  checkbox: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  subheaderText: {
    fontWeight: 'bold',
  },  
  green: {
    color: '#0A9E11',
  },
  teal: {
    color: '#0CA693',
  },
  blue: {
    color: '#0C6CA6',
  },
  purple: {
    color: '#860D4D',
  },
  orange: {
    color: '#D47312',
  },
  red: {
    color: '#DE1610',
  },
});
