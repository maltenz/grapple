import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { ColorType } from '../../../../types';
import { Color } from '../../../colors';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
}

const SvgIconFlash: FC<SvgIconProps> = ({
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
        d="M20.11612,7.41189,8.818,20.12233a1.1,1.1,0,0,0,.82215,1.8308h9.14535l-1.30535,7.83215a1.1,1.1,0,0,0,1.90718.91164L30.68545,17.98649a1.1,1.1,0,0,0-.82215-1.8308H20.71795L22.0233,8.32353A1.1,1.1,0,0,0,20.11612,7.41189Z"
      />
    </Svg>
  );
};

export default SvgIconFlash;
