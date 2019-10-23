import { StyleSheet } from 'react-native';
import { HEADER_UNDERLINE } from '../../style/colors';

export default StyleSheet.create({
  title: {
    fontSize: 30,
    padding: 20,
    textAlign: 'center',
  },
  flatList: {
    borderTopColor: HEADER_UNDERLINE,
    borderTopWidth: 10,
  },
  listContainer: {
    flex: 1,
    borderBottomWidth: 10,
    borderBottomColor: HEADER_UNDERLINE,
  },
  langContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#2A5068',
    padding: 10,
    backgroundColor: '#67BFF4',
  },
});
