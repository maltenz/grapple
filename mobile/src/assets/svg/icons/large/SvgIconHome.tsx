import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { Color, ColorType } from '../../../colors';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
}

const SvgIconHome = ({ scale, color: propColor, strokeWidth: propStrokeWidth }: SvgIconProps) => {
  const color = propColor ? Color[propColor] : Color.grey;
  let width = 39;
  let height = 38;
  let strokeWidth = 2;

  if (scale) {
    width *= scale;
    height *= scale;
  }

  if (typeof propStrokeWidth === 'number') {
    strokeWidth = propStrokeWidth;
  }

  return (
    <Svg height={height} width={width} viewBox="0 0 39 38">
      <G>
        <Path
          fill="none"
          d="M17.876 7.394l-9 7.2a3 3 0 0 0-1.126 2.343v11.116a3 3 0 0 0 3 3h3a3 3 0 0 0 3-3v-2a3 3 0 0 1 3-3 3 3 0 0 1 3 3v2a3 3 0 0 0 3 3h3a3 3 0 0 0 3-3V16.937a3 3 0 0 0-1.126-2.343l-9-7.2a3 3 0 0 0-3.748 0z"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </G>
    </Svg>
  );
};

export default SvgIconHome;
