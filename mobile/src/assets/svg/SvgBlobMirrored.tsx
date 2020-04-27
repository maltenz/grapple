import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ColorType } from '../../types';
import { Color } from '../colors';

interface SvgBlobProps {
  style?: StyleProp<ViewStyle>;
  scale?: number;
  color: ColorType;
}

const SvgBlob = ({ style, scale, color: propColor }: SvgBlobProps) => {
  const color = propColor ? Color[propColor] : Color.white;
  let width = 300;
  let height = 192;

  if (scale) {
    width *= scale;
    height *= scale;
  }

  return (
    <Svg width={width} height={height} viewBox="0 0 300 192" style={style}>
      <Path
        fill={color}
        d="M208.6,191.5c-18.6-3.1-34.4-15.6-52.1-20.9c-16-4.8-33.3-5.4-48.6,2.1c-23.4,11.4-51.6,12.5-74.2-2.2
        c-7.5-4.8-13.7-11.4-18.6-18.8c-13.8-20.5-18.7-48.1-12.3-72C10.1,52.7,34.3,37,60,29.8c15-4.2,30.6-4,46-5.8
        c18.1-2.1,33.6-9.9,50.2-16.5C171.9,1.3,189-1,205.7,0.4c50,4.3,95.3,38.5,94.2,92.1c-0.6,29.2-13.7,56.7-34.7,76.1
        C250.3,182.5,229.8,195,208.6,191.5z"
      />
    </Svg>
  );
};

export default SvgBlob;
