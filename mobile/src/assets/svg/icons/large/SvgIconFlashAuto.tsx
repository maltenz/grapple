import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { Color, ColorType } from '../../../colors';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
}

const SvgIconFlashAuto = ({
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
          d="M22.387 5.878L8.332 21.69h10.541l-1.756 10.54 14.054-15.811H20.63l1.757-10.541z"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <Path
          fill="none"
          d="M34.981 8.622H31.9l-.585 1.758h-1.87l3.176-8.531h1.629l3.193 8.53h-1.869zm-2.607-1.424h2.133l-1.072-3.193z"
        />
      </G>
    </Svg>
  );
};

export default SvgIconFlashAuto;
