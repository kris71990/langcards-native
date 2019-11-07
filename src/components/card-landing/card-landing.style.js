import { StyleSheet } from 'react-native';
import { 
  BASE, 
  CARD_BACKGROUND,
} from '../../style/colors';

export default StyleSheet.create({
  cardContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: BASE,
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
    height: 300,
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

// $score-green: #0A9E11;
// $score-teal: #0CA693;
// $score-blue: #0C6CA6;
// $score-purple: #860D4D;
// $score-orange: #D47312;
// $score-red: #DE1610;
