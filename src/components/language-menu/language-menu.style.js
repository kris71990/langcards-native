import { StyleSheet } from 'react-native';
import { LIGHT_GREY, MID_GREY } from '../../style/colors';

export default StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  pickerContainer: {
    flex: 1,
    marginRight: 10,
    backgroundColor: LIGHT_GREY,
    borderColor: MID_GREY,
    borderWidth: 2,
  },
});
