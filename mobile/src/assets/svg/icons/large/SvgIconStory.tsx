import React, { FC } from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { Color } from '../../../colors';
import { ColorType } from '../../../../types';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
}

const SvgIconStory: FC<SvgIconProps> = ({
  scale,
  color: propColor,
  strokeWidth: propStrokeWidth,
}) => {
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
    <Svg height={height} width={width} viewBox="0 0 39 38">
      <G>
        <Path
          fill="none"
          d="M18.364 10.405a26.704 26.704 0 0 0-9.949-2.323 2.023 2.023 0 0 0-2.165 2.016v15.148a2.007 2.007 0 0 0 1.87 2.006 27.135 27.135 0 0 1 10.244 2.343 1.942 1.942 0 0 0 1.773 0 27.131 27.131 0 0 1 10.243-2.343 2.007 2.007 0 0 0 1.87-2.006V10.098a2.023 2.023 0 0 0-2.165-2.016 26.704 26.704 0 0 0-9.949 2.323 1.942 1.942 0 0 1-1.772 0z"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <Path
          fill="none"
          d="M25.296 8.981v6.046"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </G>
    </Svg>
  );
};

export default SvgIconStory;
