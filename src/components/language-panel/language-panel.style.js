import { StyleSheet } from 'react-native';
import { HEADER_UNDERLINE } from '../../style/colors';

export default StyleSheet.create({
  panelContainer: {
    borderBottomWidth: 10,
    borderBottomColor: HEADER_UNDERLINE,
  },
  flatList: {
    borderTopColor: HEADER_UNDERLINE,
    borderTopWidth: 10,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#ff5c5c',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
