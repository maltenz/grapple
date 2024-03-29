import React, { FC } from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { ColorType } from '../../types';
import { Color } from '../colors';

interface SvgGrappleLogoProps {
  scale?: number;
  color?: ColorType;
}

const SvgGrappleLogo: FC<SvgGrappleLogoProps> = ({ scale, color: propColor }) => {
  const color = propColor ? Color[propColor] : Color.white;
  let width = 220;
  let height = 50;

  if (scale) {
    width *= scale;
    height *= scale;
  }

  return (
    <Svg width={width} height={height} viewBox="0 0 220 49.6">
      <G>
        <Path
          fill={color}
          d="M37.8,39.3h-6.9l-0.5-3.9c-0.9,1.3-2.3,2.5-4.2,3.4c-1.8,0.9-4.1,1.4-6.6,1.4c-5.5,0-10.1-1.9-13.9-5.6
      C1.9,30.8,0,26,0,20.1C0,14.2,1.9,9.4,5.8,5.6C9.7,1.9,14.5,0,20,0c5,0,9,1.2,11.9,3.5c2.9,2.4,4.9,5.1,5.9,8.4l-8.2,2.9
      c-0.4-1.6-1.4-3.2-3-4.6C25,8.7,22.8,8,20,8c-3,0-5.6,1-7.9,3.1c-2.3,2-3.4,5-3.4,9c0,3.8,1.1,6.8,3.3,9c2.2,2.2,5,3.2,8.2,3.2
      c2.8,0,5-0.7,6.6-2c1.6-1.4,2.6-2.8,2.9-4.3H18.2v-7.3h19.6V39.3z"
        />
        <Path
          fill={color}
          d="M61.6,12.3v8.1c-0.8-0.2-1.6-0.3-2.6-0.3c-1.8,0-3.4,0.6-4.5,1.8c-1.2,1.2-1.8,3-1.8,5.5v11.8h-8.2v-27h8V16
      c0.7-1.4,1.6-2.4,3-3c1.3-0.6,2.7-0.9,4-0.9C60.3,12,61,12.1,61.6,12.3z"
        />
        <Path
          fill={color}
          d="M65.2,31.9c0-2.3,0.7-4.1,2.2-5.5c1.5-1.4,3.4-2.3,5.8-2.6l6.3-1c1.3-0.2,2-0.8,2-1.8c0-0.8-0.4-1.5-1.1-2.1
      c-0.7-0.6-1.7-0.8-2.9-0.8c-1.4,0-2.5,0.4-3.3,1.2c-0.8,0.8-1.3,1.7-1.3,2.8l-7.2-1.5c0.2-2.2,1.3-4.3,3.3-6.2
      c2-1.9,4.9-2.8,8.5-2.8c4.1,0,7.1,1,9,2.9c1.9,2,2.9,4.4,2.9,7.5v13.2c0,1.7,0.1,3.1,0.3,4.2h-7.4c-0.2-0.7-0.3-1.7-0.3-3
      C80.6,38.8,78,40,74.5,40c-2.9,0-5.1-0.8-6.8-2.4C66,36,65.2,34.1,65.2,31.9z M76.5,34.1c1.4,0,2.6-0.4,3.5-1.2
      c0.9-0.8,1.4-2.2,1.4-4.1v-1.2l-5.1,0.8c-2,0.3-3,1.3-3,3c0,0.8,0.3,1.4,0.8,2C74.6,33.8,75.4,34.1,76.5,34.1z"
        />
        <Path
          fill={color}
          d="M104.7,49.6h-8.2V12.3h8v2.8c0.6-0.9,1.6-1.7,3.1-2.4c1.4-0.7,3-1,4.9-1c3.8,0,6.9,1.3,9.1,3.9c2.3,2.6,3.4,6,3.4,10.1
      c0,4.1-1.2,7.5-3.6,10.2c-2.4,2.7-5.5,4-9.3,4c-3.4,0-5.8-0.9-7.3-2.7V49.6z M115,30.7c1.2-1.2,1.8-2.8,1.8-5
      c0-2.1-0.6-3.8-1.8-4.9c-1.2-1.2-2.6-1.7-4.4-1.7c-1.7,0-3.1,0.6-4.3,1.7c-1.2,1.2-1.8,2.8-1.8,4.9c0,2.1,0.6,3.8,1.8,5
      c1.2,1.2,2.6,1.8,4.3,1.8C112.4,32.5,113.8,31.9,115,30.7z"
        />
        <Path
          fill={color}
          d="M138.4,49.6h-8.2V12.3h8v2.8c0.6-0.9,1.6-1.7,3.1-2.4c1.4-0.7,3-1,4.9-1c3.8,0,6.9,1.3,9.1,3.9c2.3,2.6,3.4,6,3.4,10.1
      c0,4.1-1.2,7.5-3.6,10.2c-2.4,2.7-5.5,4-9.3,4c-3.4,0-5.8-0.9-7.3-2.7V49.6z M148.8,30.7c1.2-1.2,1.8-2.8,1.8-5
      c0-2.1-0.6-3.8-1.8-4.9c-1.2-1.2-2.6-1.7-4.4-1.7c-1.7,0-3.1,0.6-4.3,1.7c-1.2,1.2-1.8,2.8-1.8,4.9c0,2.1,0.6,3.8,1.8,5
      c1.2,1.2,2.6,1.8,4.3,1.8C146.1,32.5,147.6,31.9,148.8,30.7z"
        />
        <Path fill={color} d="M172.2,39.3h-8.2V0h8.2V39.3z" />
        <Path
          fill={color}
          d="M197.1,29.6l6.9,2c-0.7,2.5-2.1,4.6-4.3,6.2c-2.2,1.6-4.9,2.4-8.1,2.4c-3.9,0-7.2-1.3-10-3.9c-2.7-2.6-4.1-6.1-4.1-10.5
      c0-4.2,1.3-7.6,4-10.3c2.7-2.6,5.8-4,9.5-4c4.2,0,7.5,1.2,9.9,3.7c2.4,2.4,3.6,5.8,3.6,10.2c0,1.4-0.1,2.2-0.2,2.6h-18.8
      c0.1,1.5,0.7,2.7,1.9,3.7c1.2,1,2.6,1.5,4.2,1.5C194.5,33.1,196.3,31.9,197.1,29.6z M185.7,22.6h10.8c-0.1-1.2-0.6-2.3-1.4-3.2
      c-0.9-0.9-2.2-1.4-4-1.4c-1.6,0-2.9,0.5-3.8,1.4C186.3,20.4,185.8,21.4,185.7,22.6z"
        />
        <Path
          fill={color}
          d="M210.5,38.1c-1.1-1.1-1.6-2.4-1.6-3.9c0-1.5,0.5-2.8,1.6-3.9c1.1-1.1,2.4-1.6,3.9-1.6c1.5,0,2.8,0.5,3.9,1.6
      c1.1,1.1,1.7,2.4,1.7,3.9c0,1.5-0.6,2.8-1.7,3.9c-1.1,1.1-2.4,1.7-3.9,1.7C212.9,39.8,211.6,39.2,210.5,38.1z"
        />
      </G>
    </Svg>
  );
};

export default SvgGrappleLogo;
