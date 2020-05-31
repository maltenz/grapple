import React, { FC } from 'react';
import Svg, { Polyline, Path } from 'react-native-svg';
import { Color } from '../../../colors';
import { ColorType } from '../../../../types';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
}

const SvgIconCameraFlip: FC<SvgIconProps> = ({
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
        d="M25.27721,23.91071H13.60374a4.37755,4.37755,0,0,1-4.37755-4.37755V10.64541a4.37755,4.37755,0,0,1,4.37755-4.37755H25.27721a4.37754,4.37754,0,0,1,4.37755,4.37755v8.88775A4.37754,4.37754,0,0,1,25.27721,23.91071Z"
      />
      <Polyline
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        points="16.655 32.5 19.44 29.714 16.655 26.929"
      />
      <Path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        d="M31.57169,22.43133c1.14424.67414,1.79736,1.45312,1.79736,2.283v.35714c0,2.07889-4.099,3.83867-9.74992,4.4303"
      />
      <Path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        d="M19.44048,29.71429c-7.69254,0-13.92858-2.07868-13.92858-4.64286v-.35714c0-.83286.6579-1.6145,1.8099-2.29033"
      />
    </Svg>
  );
};

export default SvgIconCameraFlip;
