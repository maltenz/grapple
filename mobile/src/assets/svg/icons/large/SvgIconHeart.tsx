import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { Color, ColorType } from '../../../colors';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
}

const SvgIconHeart = ({ scale, color: propColor, strokeWidth: propStrokeWidth }: SvgIconProps) => {
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
          d="M20.155 10.125a.813.813 0 0 1-1.312 0C15.881 6.08 7.37 7.39 7.37 14.96c0 4.113 3.093 9.585 12.131 15.161 9.038-5.576 12.131-11.048 12.131-15.16 0-7.53-8.51-8.901-11.476-4.835z"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </G>
    </Svg>
  );
};

export default SvgIconHeart;
