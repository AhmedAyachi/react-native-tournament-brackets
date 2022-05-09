import { StyleSheet } from 'react-native';
import { border, rem } from 'css';

const css = StyleSheet.create({
  roundview: {
    alignItems: 'center',
    ...border(2, 'solid', 'green'),
  },
  row0: {
    paddingVertical: 1 * rem,
  },
  row1: {},
  space: {
    height: 50,
    ...border(1, 'solid', 'blue'),
  },
  title: {
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});

export default css;
