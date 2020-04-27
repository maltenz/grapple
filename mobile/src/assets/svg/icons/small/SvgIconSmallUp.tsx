import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { Color, ColorType } from '../../../colors';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
}

const SvgIconSmallUp = ({
  scale,
  color: propColor,
  strokeWidth: propStrokeWidth,
}: SvgIconProps) => {
  const color = propColor ? Color[propColor] : Color.grey;
  let width = 24;
  let height = 24;
  let strokeWidth = 1;

  if (scale) {
    width *= scale;
    height *= scale;
  }

  if (typeof propStrokeWidth === 'number') {
    strokeWidth = propStrokeWidth;
  }

  return (
    <Svg height={height} width={width} viewBox="0 0 24.483 23.855">
      <G>
        <Path
          stroke={color}
          d="M4.686 15.688l7.7-7.7 7.7 7.7"
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
};

export default SvgIconSmallUp;
