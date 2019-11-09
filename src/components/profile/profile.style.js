import { StyleSheet } from 'react-native';
import { HEADER_UNDERLINE } from '../../style/colors';

export default StyleSheet.create({
  profileScreen: {
    flex: 1,
    justifyContent: 'center',
  },
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
  guestProfileContainer: {
    margin: 20,
  },  
  guestProfileText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
