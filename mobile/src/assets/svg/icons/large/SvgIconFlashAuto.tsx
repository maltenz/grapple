import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { Color } from '../../../colors';
import { ColorType } from '../../../../types';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
}

const SvgIconFlashAuto: FC<SvgIconProps> = ({
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
        d="M20.11612,7.41189,8.818,20.12233a1.1,1.1,0,0,0,.82215,1.8308H17.487A1.1,1.1,0,0,1,18.572,23.234l-1.09188,6.55131a1.1,1.1,0,0,0,1.90718.91164L30.68545,17.98649a1.1,1.1,0,0,0-.82215-1.8308H20.71795L22.0233,8.32353A1.1,1.1,0,0,0,20.11612,7.41189Z"
      />
      <Path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        d="M34.98145,8.62207h-3.082l-.58593,1.75781H29.44434l3.17578-8.53125H34.249l3.19336,8.53125H35.57324ZM32.374,7.19824h2.13282L33.43457,4.00488Z"
      />
    </Svg>
  );
};

export default SvgIconFlashAuto;
