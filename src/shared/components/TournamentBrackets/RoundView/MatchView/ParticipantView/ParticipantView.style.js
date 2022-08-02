import { StyleSheet } from 'react-native';
import { rem } from '../../../index.style';

const css = StyleSheet.create({
  col0: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center',
    maxWidth: 10 * rem,
    minWidth: 5 * rem,
    overflow: 'hidden',
    paddingLeft: 0.5 * rem,
    paddingVertical: 0.5 * rem,
  },
  col1: {
    overflow: 'hidden',
    paddingHorizontal: 0.5 * rem,
    paddingVertical: 0.5 * rem,
    width: 4 * rem,
  },
  name: {
    color: 'white',
    textAlign: 'left',
    textTransform: 'capitalize',
  },
  participantview: {
    borderRadius: 0.25 * rem,
    flexDirection: 'row',
    marginVertical: 0.25 * rem,
    overflow: 'hidden',
    width: '100%',
  },
  status: {
    color: 'white',
    textAlign: 'right',
    textTransform: 'capitalize',
  },
});

export default css;
