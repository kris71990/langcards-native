import { StyleSheet } from 'react-native';
import * as colors from '../../style/colors';

export default StyleSheet.create({
  langPanelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1, 
    backgroundColor: 'white',
    padding: 10,
  },
  langName: {
    paddingLeft: 30,
  },  
  wordCount: {
    paddingRight: 30,
    color: 'red',
  },
  langInfoContainer: {
    flex: 1,
    color: 'red',
    borderBottomWidth: 2,
    borderBottomColor: colors.LIST_BORDER,
    padding: 10,
    backgroundColor: colors.LIST_LIGHT_BLUE,
  },
  moreInfoContainer: {
    borderWidth: 1,
    borderColor: colors.DARK_RED,
    backgroundColor: 'white',
    marginTop: 5,
    padding: 10,
  },
  infoTextTitle: {
    letterSpacing: 1,
    fontSize: 15,
    fontWeight: 'bold',
  },
  infoTextBlock: {
    letterSpacing: 1,
    fontSize: 15,
    fontWeight: 'normal',
    textAlign: 'right',
    paddingLeft: 30,
  },
  selectedLanguage: {
    letterSpacing: 2,
    color: colors.DARK_RED,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 25,
  },
  unselectedLanguage: {
    fontSize: 20,
    letterSpacing: 1,
  },
});
