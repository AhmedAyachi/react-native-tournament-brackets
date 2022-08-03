import { Dimensions } from 'react-native';

export const { height, width } = Dimensions.get('window');
export const vw = width * 0.01;
export const vh = height * 0.01;
export const rem = 3 * vw;

export const border = (width = 2, style = 'solid', color = 'black') => ({
  borderWidth: width,
  borderStyle: style,
  borderColor: color,
});
