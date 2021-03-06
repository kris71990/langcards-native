import { StyleSheet } from 'react-native';
import { HEADER_UNDERLINE, LIST_LIGHT_BLUE } from '../../style/colors';

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
    borderTopColor: LIST_LIGHT_BLUE,
    borderTopWidth: 5,
  },
});
