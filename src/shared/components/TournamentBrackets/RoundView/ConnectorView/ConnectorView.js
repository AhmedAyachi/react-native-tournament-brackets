import React from 'react';
import {} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { rem } from 'css';
import css from './ConnectorView.style';

export default function ConnectorView(props) {
  const {
    height = 100,
    width = height / 10,
    strokeWidth,
    straight,
    stroke,
  } = props;
  const h = 50 - strokeWidth,
    v = 50 - strokeWidth * 3;
  return (
    <Svg
      style={[css.connectorview, props.style]} /* preserveAspectRatio="none" */
      width={height}
      height={height}
      viewBox="0 0 100 100"
      strokeWidth={strokeWidth}
    >
      <Path
        fill="transparent"
        stroke={stroke}
        d={
          straight
            ? `
                    m0 ${50 + strokeWidth / 4} h100
                `
            : `
                    m0 ${strokeWidth} h${h}
                    c${strokeWidth} 0,${strokeWidth} ${strokeWidth},${strokeWidth} ${strokeWidth}
                    v${v}
                    c0 ${strokeWidth},${strokeWidth} ${strokeWidth},${strokeWidth} ${strokeWidth}
                    h${h} h-${h}
                    c-${strokeWidth} 0,-${strokeWidth} -${strokeWidth},-${strokeWidth} ${strokeWidth}
                    v${v}
                    c0 ${strokeWidth},-${strokeWidth} ${strokeWidth},-${strokeWidth} ${strokeWidth}
                    h-${h}
                `
        }
      />
    </Svg>
  );
}

ConnectorView.defaultProps = {
  height: 100,
  strokeWidth: 3,
  stroke: 'orange',
};
