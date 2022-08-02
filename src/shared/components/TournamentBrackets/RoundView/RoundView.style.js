import { StyleSheet } from 'react-native';
import { rem } from 'css';

const css = StyleSheet.create({
  matchcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 1 * rem,
  },
  roundview: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 0.15 * rem,
  },
  row0: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 0.2 * rem,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingVertical: 0.5 * rem,
    width: '100%',
  },
  row1: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'space-around',
    overflow: 'hidden',
    width: '100%',
  },
  section: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  title: {
    fontWeight: '700',
    marginHorizontal: 1 * rem,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});

export default css;
