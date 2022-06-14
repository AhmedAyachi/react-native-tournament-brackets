import React from 'react';
import {} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { rem } from 'css';
import css from './ConnectorView.style';

export default function ConnectorView(props) {
  const { height, strokeWidth, stroke } = props;
  const h = 50 - strokeWidth,
    v = 50 - strokeWidth * 3;
  return (
    <Svg
      style={css.connectorview}
      preserveAspectRatio="none"
      width={(height / 10) * rem}
      height={`${height + 6}%`}
      viewBox="0 0 100 100"
      strokeWidth={strokeWidth}
    >
      <Path
        fill="transparent"
        stroke={stroke}
        d={`
                    m0 ${strokeWidth} h${h}
                    c${strokeWidth} 0,${strokeWidth} ${strokeWidth},${strokeWidth} ${strokeWidth}
                    v${v}
                    c0 ${strokeWidth},${strokeWidth} ${strokeWidth},${strokeWidth} ${strokeWidth}
                    h${h} h-${h}
                    c-${strokeWidth} 0,-${strokeWidth} -${strokeWidth},-${strokeWidth} ${strokeWidth}
                    v${v}
                    c0 ${strokeWidth},-${strokeWidth} ${strokeWidth},-${strokeWidth} ${strokeWidth}
                    h-${h}
                `}
      />
    </Svg>
  );
}

ConnectorView.defaultProps = {
  height: 100,
  strokeWidth: 3,
  stroke: '#f067a0',
};
