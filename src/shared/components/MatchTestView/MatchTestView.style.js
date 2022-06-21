import { StyleSheet } from 'react-native';
import { border, rem } from 'css';

const css = StyleSheet.create({
  matchtestview: {
    alignItems: 'center',
    backgroundColor: 'dodgerblue',
    height: 5 * rem,
    justifyContent: 'center',
    marginVertical: 1 * rem,
    width: 10 * rem,
    ...border(1, 'solid', 'black'),
  },
  name: {
    color: 'black',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});

export default css;
