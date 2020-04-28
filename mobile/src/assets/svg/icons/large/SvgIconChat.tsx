import React, { FC } from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { ColorType } from '../../../../types';
import { Color } from '../../../colors';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
  onPress?: () => void;
}

const SvgIconChat: FC<SvgIconProps> = ({
  scale,
  color: propColor,
  strokeWidth: propStrokeWidth,
}) => {
  const color = propColor ? Color[propColor] : Color.grey;
  let width = 39;
  let height = 38;
  let strokeWidth = 2;

  if (scale) {
    width *= scale;
    height *= scale;
  }

  if (typeof propStrokeWidth === 'number') {
    strokeWidth = propStrokeWidth;
  }

  return (
    <Svg height={height} width={width} viewBox="0 0 39 38">
      <G>
        <Path
          fill="none"
          d="M31.38 21.029a5.827 5.827 0 0 1 1.041 3.329v6.32H25.17a5.685 5.685 0 0 1-3.851-1.498"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <Path
          fill="none"
          d="M18.796 6.44H14.6a8.864 8.864 0 0 0-8.864 8.864v9.652h13.06a8.864 8.864 0 0 0 8.863-8.863v-.789a8.864 8.864 0 0 0-8.863-8.863z"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </G>
    </Svg>
  );
};

export default SvgIconChat;
