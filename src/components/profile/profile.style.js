import { StyleSheet } from 'react-native';
import { HEADER_UNDERLINE } from '../../style/colors';

export default StyleSheet.create({
  profileViewContainer: {
    borderTopColor: HEADER_UNDERLINE,
    borderTopWidth: 10,
  },
  tableContainer: {
    borderWidth: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    
  },
  row: {
    flex: 1, 
  },
});
