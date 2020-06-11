import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path, Ellipse } from 'react-native-svg';
import { Color } from '../colors';
import { ColorType } from '..';

interface SvgAnonymousProfileProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
  style?: StyleProp<ViewStyle>;
}

const SvgAnonymousProfile: FC<SvgAnonymousProfileProps> = ({
  scale,
  color: propColor,
  strokeWidth: propStrokeWidth,
  style,
}) => {
  const color = propColor ? Color[propColor] : Color.grey;

  let width = 68.2;
  let height = 29.6;
  let strokeWidth = 2.5;

  if (typeof propStrokeWidth === 'number') {
    strokeWidth = propStrokeWidth;
  }

  if (scale) {
    width *= scale;
    height *= scale;
  }

  return (
    <Svg width={width} height={height} x="0px" y="0px" viewBox="0 0 68.2 29.6" style={style}>
      <Path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        d="M65.7,6.6c-0.1-1-0.4-2.1-1.1-2.8c-1.7-1.9-5-1.3-7.2-0.8c-3,0.6-5.9,1.6-8.8,2.7c-4.6,1.7-9.4,3.4-14.4,3.4
	c-0.1,0-0.1,0-0.2,0v0c0,0,0,0,0,0c0,0,0,0,0,0v0c-0.1,0-0.1,0-0.2,0c-5,0-9.8-1.7-14.4-3.4c-2.9-1.1-5.8-2.1-8.8-2.7
	c-2.2-0.4-5.5-1-7.2,0.8c-0.7,0.8-1,1.8-1.1,2.8c0,0.2,0,0.4,0,0.6c0,0.4,0,0.7,0,1.1c0.2,2.9,1.3,5.7,2.3,8.4
	c1,2.8,2.3,5.4,4.4,7.6c1.6,1.6,3.4,2.5,5.4,2.7c0.6,0.1,1.2,0.1,1.8,0c0.8-0.1,1.6-0.3,2.4-0.6c5.8-2.3,9.8-3.4,12.2-3.9
	c2-0.4,4-0.4,6,0c2.4,0.5,6.4,1.6,12.2,3.9c0.8,0.3,1.6,0.5,2.4,0.6c0.6,0.1,1.2,0.1,1.8,0c2-0.2,3.8-1.1,5.4-2.7
	c2.1-2.1,3.4-4.8,4.4-7.6c1-2.8,2.1-5.5,2.3-8.4c0-0.4,0-0.7,0-1.1C65.7,7,65.7,6.8,65.7,6.6z"
      />
      <Ellipse
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        transform="matrix(0.1903 -0.9817 0.9817 0.1903 0.5582 32.3435)"
        cx="19.9"
        cy="15.8"
        rx="3.8"
        ry="6.8"
      />
      <Ellipse
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        transform="matrix(0.9817 -0.1903 0.1903 0.9817 -2.1296 9.489)"
        cx="48.3"
        cy="15.8"
        rx="6.8"
        ry="3.8"
      />
    </Svg>
  );
};

export default SvgAnonymousProfile;
