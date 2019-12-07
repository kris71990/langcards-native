import { StyleSheet } from 'react-native';
import { HEADER_UNDERLINE, LIGHT_GREY } from '../../style/colors';

export default StyleSheet.create({
  profileScreen: {
    flex: 1,
  },
  headerContainer: {
    borderTopWidth: 5,
    borderTopColor: HEADER_UNDERLINE,
  },
  profileViewContainer: {
    borderTopColor: HEADER_UNDERLINE,
    borderTopWidth: 10,
    marginTop: 5,
    paddingTop: 20,
  },
  tableContainer: {
    justifyContent: 'center',
  },
  table: {
    backgroundColor: LIGHT_GREY,
  },  
  rowContainer: {
    flexDirection: 'row',
    // marginTop: 5,
    // marginBottom: 5,
    borderWidth: 1,
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 2,
    paddingTop: 10,
    paddingBottom: 10,
    borderRightWidth: 1, 
  },
  headerRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1, 
  },
  accountAge: {
    alignSelf: 'flex-end',
    paddingRight: 5,
    fontSize: 16,
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
