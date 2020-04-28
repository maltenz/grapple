import React, { FC } from 'react';
import Svg, { G, Path, Circle } from 'react-native-svg';
import { ColorType } from '../../../../types';
import { Color } from '../../../colors';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
}

const SvgIconIncognito: FC<SvgIconProps> = ({
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
        <Circle
          fill="none"
          cx="26"
          cy="26.874"
          r="4.375"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <Circle
          fill="none"
          cx="12.251"
          cy="26.874"
          r="4.375"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <Path
          fill="none"
          d="M19.125 6.25a9.23 9.23 0 0 1 8.571 5.803l2.679 5.697H7.876l2.679-5.697a9.23 9.23 0 0 1 8.57-5.803z"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <Path
          fill="none"
          d="M21.75 25.89a4.296 4.296 0 0 0-5.24 0"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </G>
    </Svg>
  );
};

export default SvgIconIncognito;
