import { StyleSheet } from 'react-native';
import { border, rem } from 'css';

const css = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 0.2 * rem,
    paddingHorizontal: 1 * rem,
    paddingVertical: 0.5 * rem,
    width: '100%',
  },
  roundview: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginHorizontal: 0.25 * rem,
    paddingHorizontal: 2 * rem,
  },
  row0: {
    paddingVertical: 1 * rem,
    width: '100%',
  },
  row1: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});

export default css;
