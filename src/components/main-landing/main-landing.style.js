import { StyleSheet } from 'react-native';
import { BASE, LIST_LIGHT_GREEN } from '../../style/colors';


export default StyleSheet.create({
  homeBackground: {
    flex: 1,
    backgroundColor: BASE,
    borderTopColor: LIST_LIGHT_GREEN,
    borderTopWidth: 5,
  },
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  sectionContainerTwo: {
    flex: 2,
  },
  headerTitle: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerConjunction: {
    textAlign: 'center',
    paddingBottom: 10,
  },
});
