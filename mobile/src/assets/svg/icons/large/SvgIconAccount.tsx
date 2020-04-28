import React, { FC } from 'react';
import Svg, { G, Path, Circle } from 'react-native-svg';
import { ColorType } from '../../../../types';
import { Color } from '../../../colors';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
}

const SvgIconAccount: FC<SvgIconProps> = ({
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
          cx="19.418"
          cy="14.904"
          r="7.82"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <Path
          fill="none"
          d="M11.863 30.917c-3.252 0-4.326-2.834-1.425-3.784a30.882 30.882 0 0 1 9.312-1.3 30.882 30.882 0 0 1 9.312 1.3c2.9.95 1.827 3.784-1.425 3.784z"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </G>
    </Svg>
  );
};

export default SvgIconAccount;
