/* eslint-disable react-native/sort-styles */
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
    paddingHorizontal: 0.2 * rem,
    // marginHorizontal:0.25*rem,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  row0: {
    paddingVertical: 1 * rem,
    width: '100%',
    // paddingHorizontal:2*rem,
  },
  row1: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-around',
  },
  section: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});

export default css;
