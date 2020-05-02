import React, { FC } from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { Color } from '../../../colors';
import { ColorType } from '../../../../types';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
  onPress?: () => void;
}

const SvgIconSearch: FC<SvgIconProps> = ({
  scale,
  color: propColor,
  strokeWidth: propStrokeWidth,
  onPress,
}: SvgIconProps) => {
  const color = propColor ? Color[propColor] : Color.grey;
  let width = 39;
  let height = 38;
  let strokeWidth = 2.5;

  if (scale) {
    width *= scale;
    height *= scale;
  }

  if (typeof propStrokeWidth === 'number') {
    strokeWidth = propStrokeWidth;
  }

  return (
    <Svg height={height} width={width} viewBox="0 0 39 38" onPress={onPress}>
      <G>
        <Path
          fill="none"
          d="M18.57182,6.10166a11.4,11.4,0,1,0,11.4,11.4A11.4,11.4,0,0,0,18.57182,6.10166Z"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <Path
          fill="none"
          d="M25.3819,27.42666l3.42295,3.423a1.99582,1.99582,0,0,0,2.8853-.06572h0a1.99581,1.99581,0,0,0-.0628-2.75678l-3.5516-3.55161"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </G>
    </Svg>
  );
};

export default SvgIconSearch;
