import React, { FC } from 'react';
import Svg, { Circle } from 'react-native-svg';
import { Color } from '../../../colors';
import { ColorType } from '../../../../types';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
}

const SvgIconMenu: FC<SvgIconProps> = ({
  scale,
  color: propColor,
  strokeWidth: propStrokeWidth,
}) => {
  const color = propColor ? Color[propColor] : Color.grey;
  let width = 39;
  let height = 38;
  let strokeWidth = 2.5;

  if (scale) {
    width *= scale;
    height *= scale;
  }

  if (typeof propStrokeWidth === 'number') {
    strokeWidth = propStrokeWidth;
  }

  return (
    <Svg height={height} width={width} viewBox="0 0 39 38">
      <Circle
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        cx="9.75006"
        cy="18.6493"
        r="3.29859"
      />
      <Circle
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        cx="19.1109"
        cy="18.6493"
        r="3.29859"
      />
      <Circle
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        cx="28.63887"
        cy="18.6493"
        r="3.29859"
      />
    </Svg>
  );
};

export default SvgIconMenu;
