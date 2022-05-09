import { StyleSheet } from 'react-native';
import { border } from 'css';

const css = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  singleeliminationview: {
    height: '100%',
    width: '100%',
    ...border(2, 'solid', 'blue'),
  },
});

export default css;
