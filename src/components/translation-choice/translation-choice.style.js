import { StyleSheet } from 'react-native';
import { GUEST_BUTTON, LIGHT_GREY } from '../../style/colors';

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
  dirButton: {
    margin: 20,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: GUEST_BUTTON,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 100,
    marginBottom: 100,
  },
  buttonText: {
    fontSize: 20,
  },
});
