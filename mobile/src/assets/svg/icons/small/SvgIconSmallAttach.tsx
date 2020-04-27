import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { Color, ColorType } from '../../../colors';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
}

const SvgIconSmallAttach = ({
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
          d="M12.848 9.73l-3.005 3.006a1.75 1.75 0 0 0 2.475 2.475l4.066-4.066a3.5 3.5 0 0 0-4.95-4.95l-4.419 4.42a5.25 5.25 0 0 0 7.425 7.425l4.065-4.066"
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
};

export default SvgIconSmallAttach;
