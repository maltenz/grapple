import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { ColorType } from '../../../../types';
import { Color } from '../../../colors';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
}

const SvgIconFlashOff: FC<SvgIconProps> = ({
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
      <Path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        d="M15.4469,11.8224l3.92177-4.40948a1.1,1.1,0,0,1,1.90692.9122L19.9679,16.1564h9.14447a1.1,1.1,0,0,1,.82215,1.8308L26.0179,22.3934Z"
      />
      <Path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        d="M17.9989,22.1624l-1.2672,7.62529a1.1,1.1,0,0,0,1.90727.91113L22.3549,26.5184l-10.571-10.571L8.068,20.122a1.1,1.1,0,0,0,.82165,1.83136H17.7899"
      />
    </Svg>
  );
};

export default SvgIconFlashOff;
