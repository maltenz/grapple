import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { Color, ColorType } from '../../../colors';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
}

const SvgIconFlashOff = ({
  scale,
  color: propColor,
  strokeWidth: propStrokeWidth,
}: SvgIconProps) => {
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
          d="M15.77 12.48l5.87-6.6-1.76 10.54h10.54l-5.04 5.67"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <Path
          fill="none"
          d="M12.44 16.23l-4.86 5.46H18.12l-.03.19-1.72 10.35 5.68-6.39"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <Path
          fill="none"
          d="M9.875 10.125l17 17"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </G>
    </Svg>
  );
};

export default SvgIconFlashOff;
