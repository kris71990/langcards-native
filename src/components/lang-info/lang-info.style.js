import { StyleSheet } from 'react-native';
import { 
  HEADER_UNDERLINE, DARK_RED, LIST_LIGHT_BLUE, LIST_BORDER, 
} from '../../style/colors';

export default StyleSheet.create({
  flatList: {
    flex: 1,
    borderTopColor: HEADER_UNDERLINE,
    borderTopWidth: 10,
  },
  listContainer: {
    flex: 1,
    borderBottomWidth: 10,
    borderBottomColor: HEADER_UNDERLINE,
  },
  langContainer: {
    flex: 1,
    color: 'red',
    borderBottomWidth: 2,
    borderBottomColor: LIST_BORDER,
    padding: 10,
    backgroundColor: LIST_LIGHT_BLUE,
  },
  moreInfoContainer: {
    borderWidth: 1,
    borderColor: DARK_RED,
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
    color: DARK_RED,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 25,
  },
  unselectedLanguage: {
    fontSize: 20,
    letterSpacing: 1,
  },
});
