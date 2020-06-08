import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { ColorType } from '../../../../types';
import { Color } from '../../../colors';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const SvgIconSmallDown: FC<SvgIconProps> = ({
  scale,
  color: propColor,
  strokeWidth: propStrokeWidth,
  onPress,
  style,
}: SvgIconProps) => {
  const color = propColor ? Color[propColor] : Color.grey2;
  let width = 24;
  let height = 24;
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
      <G>
        <Path
          stroke={color}
          strokeWidth={strokeWidth}
          d="M6.15 8.983l6.3 6.3 6.3-6.3"
          fill="none"
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
};

export default SvgIconSmallDown;
