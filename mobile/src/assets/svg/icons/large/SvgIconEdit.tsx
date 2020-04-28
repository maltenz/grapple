import React, { FC } from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { ColorType } from '../../../../types';
import { Color } from '../../../colors';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
}

const SvgIconEdit: FC<SvgIconProps> = ({
  scale,
  color: propColor,
  strokeWidth: propStrokeWidth,
}) => {
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
          d="M21.155 8.107h-8.98a3.604 3.604 0 0 0-3.604 3.604v14.364a3.604 3.604 0 0 0 3.604 3.604H26.54a3.604 3.604 0 0 0 3.604-3.604v-8.98"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <Path
          fill="none"
          d="M29.711 8.539L19.357 18.893"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </G>
    </Svg>
  );
};

export default SvgIconEdit;
