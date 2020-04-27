import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Color, ColorType } from '../../../colors';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const SvgIconSmallHeart = ({
  scale,
  color: propColor,
  strokeWidth: propStrokeWidth,
  onPress,
  style,
}: SvgIconProps) => {
  const color = propColor ? Color[propColor] : Color.grey;
  let width = 24;
  let height = 24;
  let strokeWidth = 1;

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
        stroke={color}
        strokeWidth={strokeWidth}
        d="M12.902 6.562a.488.488 0 0 1-.805 0A4.03 4.03 0 0 0 5.055 9.53c0 2.333 1.622 5.379 6.247 8.529a2.136 2.136 0 0 0 2.396 0c4.625-3.15 6.247-6.196 6.247-8.53 0-4.62-5.223-5.462-7.043-2.967z"
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default SvgIconSmallHeart;
