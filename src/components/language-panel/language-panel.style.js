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
  // langContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   borderWidth: 1, 
  //   backgroundColor: 'white',
  //   padding: 10,
  // },
  // langName: {
  //   paddingLeft: 30,
  // },  
  // wordCount: {
  //   paddingRight: 30,
  //   color: 'red',
  // },
});
