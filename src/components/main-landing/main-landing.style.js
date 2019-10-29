import { StyleSheet } from 'react-native';
import { BASE } from '../../style/colors';


export default StyleSheet.create({
  homeBackground: {
    backgroundColor: BASE,
  },
  sectionContainer: {
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  headerTitle: {
    paddingBottom: 10,
    fontSize: 24,
    fontWeight: '600',
  },
  headerConjunction: {
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
