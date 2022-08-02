import { StyleSheet } from 'react-native';
import { rem } from '../../index.style';

const css = StyleSheet.create({
  round: {
    marginHorizontal: 0.2 * rem,
  },
  sectionview: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 2 * rem,
    fontWeight: '700',
    padding: 1 * rem,
    textTransform: 'capitalize',
  },
});

export default css;
