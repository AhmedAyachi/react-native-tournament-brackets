import { StyleSheet } from 'react-native';
import { rem } from '../index.style';

const css = StyleSheet.create({
  roundview: {
    marginHorizontal: 0.15 * rem,
  },
  tournamentview: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default css;
