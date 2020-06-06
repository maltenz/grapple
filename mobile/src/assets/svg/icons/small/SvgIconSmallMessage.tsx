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
  style?: StyleProp<ViewStyle>;
}

const SvgIconSmallMessage: FC<SvgIconProps> = ({
  scale,
  color: propColor,
  strokeWidth: propStrokeWidth,
  onPress,
  style,
}) => {
  const color = propColor ? Color[propColor] : Color.grey2;
  let width = 24;
  let height = 24;
  let strokeWidth = 1.5;

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
        d="M13.933 5.318h-2.874a6.071 6.071 0 0 0-6.071 6.07V18h8.945a6.071 6.071 0 0 0 6.071-6.071v-.54a6.071 6.071 0 0 0-6.071-6.071z"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default SvgIconSmallMessage;
