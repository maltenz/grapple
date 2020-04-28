import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ColorType } from '../../types';
import { Color } from '../colors';

interface SvgBlobProps {
  style?: StyleProp<ViewStyle>;
  scale?: number;
  color: ColorType;
}

const SvgBlob: FC<SvgBlobProps> = ({ style, scale, color: propColor }) => {
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
        d="M34.7,168.6C13.7,149.3,0.6,121.8,0,92.6C-1,38.9,44.2,4.7,94.3,0.4C111-1,128.1,1.3,143.8,7.5C160.4,14,176,21.9,194,24
        c15.3,1.8,31,1.6,46,5.8c25.7,7.2,49.9,22.9,57.2,49.9c6.5,23.9,1.5,51.5-12.3,72c-4.9,7.4-11.2,13.9-18.6,18.8
        c-22.6,14.7-50.7,13.6-74.2,2.2c-15.3-7.4-32.6-6.9-48.6-2.1c-17.7,5.4-33.5,17.8-52.1,20.9C70.2,195,49.7,182.5,34.7,168.6z"
      />
    </Svg>
  );
};

export default SvgBlob;
