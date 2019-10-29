import { StyleSheet } from 'react-native';
import { BASE } from '../../style/colors';


export default StyleSheet.create({
  homeBackground: {
    flex: 1,
    backgroundColor: BASE,
  },
  sectionContainer: {
    // flex: 1,
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionContainerTwo: {
    flex: 1,
  },
  headerTitle: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 24,
    fontWeight: '600',
  },
  headerConjunction: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
