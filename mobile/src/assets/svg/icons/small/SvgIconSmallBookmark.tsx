import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { ColorType } from '../../../../types';
import { Color } from '../../../colors';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
  onPress?: () => void;
  active: boolean;
  style?: StyleProp<ViewStyle>;
}

const SvgIconSmallBookmark: FC<SvgIconProps> = ({
  scale,
  color: propColor,
  strokeWidth: propStrokeWidth,
  onPress,
  active,
  style,
}) => {
  const color = propColor ? Color[propColor] : Color.grey2;
  let width = 28;
  let height = 28;
  let strokeWidth = 2;

  if (scale) {
    width *= scale;
    height *= scale;
  }

  if (typeof propStrokeWidth === 'number') {
    strokeWidth = propStrokeWidth;
  }

  return (
    <Svg height={height} width={width} viewBox="0 0 24.483 23.855" onPress={onPress} style={style}>
      <Path
        stroke={active ? Color.blue : color}
        strokeWidth={strokeWidth}
        d="M16.762 18.832l-3.7-2.158a1.345 1.345 0 0 0-1.355 0l-3.7 2.158a1.345 1.345 0 0 1-2.023-1.162V6.817a1.6 1.6 0 0 1 1.6-1.6h9.6a1.6 1.6 0 0 1 1.6 1.6V17.67a1.345 1.345 0 0 1-2.022 1.162z"
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default SvgIconSmallBookmark;
