import { StyleSheet } from 'react-native';
import { rem } from '../index.style';

const css = StyleSheet.create({
  col0: {
    alignItems: 'flex-end',
    height: '100%',
  },
  col1: {
    alignItems: 'flex-start',
    height: '115%',
    justifyContent: 'flex-start',
  },
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  doubleeliminationView: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    height: '100%',
    width: '100%',
  },
  finalconnectorheight: 0.65 * rem,
  strokewidthfrac: 1 / (89 * rem),
});

export default css;
