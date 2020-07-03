import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface SvgWiggleFillProps {
  style?: StyleProp<ViewStyle>;
  dimension: number;
  primaryColor: string;
  secondaryColor: string;
}

const SvgWiggleFill: FC<SvgWiggleFillProps> = ({
  style,
  dimension,
  primaryColor,
  secondaryColor,
}) => {
  const width = dimension;
  const height = dimension;

  return (
    <Svg
      width={width}
      height={height}
      style={[style, { backgroundColor: secondaryColor }]}
      viewBox="0 0 640 640"
    >
      <Path
        fill={primaryColor}
        d="M640,0v2.7c-9.8,13.7-21.4,27.4-35,41c-92.1,92.1-187.9,91-264.9,90.2c-66.5-0.7-110.4-1.2-158.4,46.8
			c-48,48-47.5,91.9-46.8,158.4c0.9,77,1.9,172.8-90.2,264.9C30.7,618,16.5,630,2.3,640H0V202.6C12,161,34.7,118,76.9,75.9
			c41-41,82.8-63.6,123.3-75.9H640z"
      />
      <Path
        fill={primaryColor}
        d="M640,224.1v148.5c-21.2,1.2-41.6,1-60.8,0.8c-66.5-0.7-110.5-1.2-158.4,46.8c-48,48-47.5,91.9-46.8,158.4
			c0.2,19.4,0.4,40-0.8,61.4H224.7c1.6-18.1,1.3-37.7,1.1-59.8c-0.8-77-1.9-172.8,90.2-264.9s187.9-91,264.9-90.2
			C602.7,225.4,622.1,225.6,640,224.1z"
      />
      <Path
        fill={primaryColor}
        d="M640,493.8V640H493.9c13.4-28.3,32.9-56.9,61.2-85.2C583.3,526.6,611.8,507.2,640,493.8z"
      />
    </Svg>
  );
};

export default SvgWiggleFill;
