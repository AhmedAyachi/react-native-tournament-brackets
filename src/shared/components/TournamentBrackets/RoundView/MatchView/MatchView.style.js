import { StyleSheet } from 'react-native';
import { border, rem } from 'css';

const css = StyleSheet.create({
  date: {
    fontWeight: '700',
  },
  matchview: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 1 * rem,
  },
  row0: {
    width: '100%',
  },
  row1: {
    width: '100%',
  },
  status: {
    color: 'orangered',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});

export default css;
