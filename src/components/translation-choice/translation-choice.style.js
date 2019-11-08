import { StyleSheet } from 'react-native';
import { LIGHT_GREY } from '../../style/colors';

export default StyleSheet.create({
  translationChoiceContainer: {
    flex: 1,
    backgroundColor: LIGHT_GREY,
  },
  translationChoiceButtons: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 100,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 100,
    marginBottom: 50,
  },
});
