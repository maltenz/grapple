import React, { FC } from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { Color } from '../../../colors';
import { ColorType } from '../../../../types';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
}

const SvgIconUp: FC<SvgIconProps> = ({ scale, color: propColor, strokeWidth: propStrokeWidth }) => {
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
          d="M8.75 18.25l11-11 11 11"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <Path
          fill="none"
          d="M19.75 30.25V14.012"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </G>
    </Svg>
  );
};

export default SvgIconUp;
