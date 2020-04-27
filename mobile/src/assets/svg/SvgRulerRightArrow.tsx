import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ColorType } from '../../types';
import { Color } from '../colors';

interface SvgRulerRightArrowProps {
  style?: StyleProp<ViewStyle>;
  scale?: number;
  color: ColorType;
}

const SvgRulerRightArrow = ({ style, scale, color: propColor }: SvgRulerRightArrowProps) => {
  const color = propColor ? Color[propColor] : Color.grey;
  let width = 35;
  let height = 198;

  if (scale) {
    width *= scale;
    height *= scale;
  }

  return (
    <Svg width={width} height={height} viewBox="0 0 35 198" style={style}>
      <Path
        fill={color}
        d="M35,198c0-9.5,0-21.3,0-35.3c0-21-35-32.2-35-64s0,32.4,0,0.6s35-43,35-64c0-14,0-25.7,0-35.3	V198z"
      />
    </Svg>
  );
};

export default SvgRulerRightArrow;
