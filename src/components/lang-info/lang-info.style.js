import { StyleSheet } from 'react-native';
import { HEADER_UNDERLINE, HIGHLIGHT_GREEN } from '../../style/colors';

export default StyleSheet.create({
  title: {
    fontSize: 30,
    padding: 20,
    textAlign: 'center',
  },
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
    borderBottomWidth: 1,
    borderBottomColor: '#2A5068',
    padding: 10,
    backgroundColor: '#67BFF4',
  },
  moreInfoContainer: {
    borderWidth: 2,
    borderColor: HIGHLIGHT_GREEN,
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
    color: HIGHLIGHT_GREEN,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 20,
  },
  unselectedLanguage: {
    letterSpacing: 1,
  },
});
