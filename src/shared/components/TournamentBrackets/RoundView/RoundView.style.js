import { StyleSheet } from 'react-native';
import { rem, border } from 'css';

const css = StyleSheet.create({
  roundview: {
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    justifyContent: 'space-between',
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
