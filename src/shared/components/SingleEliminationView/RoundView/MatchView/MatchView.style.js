import { StyleSheet } from 'react-native';
import { border } from 'css';

const css = StyleSheet.create({
  matchview: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    ...border(2, 'solid', 'red'),
  },
});

export default css;
