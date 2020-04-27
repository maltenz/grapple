import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ColorType } from '../../types';
import { Color } from '../colors';

interface SvgTabbarBackgroundProps {
  color?: ColorType;
  style: StyleProp<ViewStyle>;
}

const SvgTabbarBackgroundWidth = 2414;
const SvgTabbarBackgroundHeight = 86.1;

const SvgTabbarBackground = ({ color: propColor, style }: SvgTabbarBackgroundProps) => {
  const color = propColor ? Color[propColor] : Color.white;
  const width = SvgTabbarBackgroundWidth;
  const height = SvgTabbarBackgroundHeight;

  return (
    <Svg width={width} height={height} style={style} viewBox="0 0 2414 86.1">
      <Path
        fill={color}
        d="M1414,0h-101c-62.5,0-43.4,59.7-106,59.7S1163.5,0,1101,0h-101v0H0v86.1h1000v0h414h1000V0H1414z"
      />
    </Svg>
  );
};

export { SvgTabbarBackgroundWidth, SvgTabbarBackgroundHeight };

export default SvgTabbarBackground;
