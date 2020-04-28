import React, { FC } from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { ColorType } from '../../../../types';
import { Color } from '../../../colors';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
}

const SvgIconVideo: FC<SvgIconProps> = ({
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
          d="M7.46 13.37a2.448 2.448 0 0 1 2.45-2.45h12.27a2.46 2.46 0 0 1 2.46 2.46v1.63h3.3L32 13.37v13.09l-7.36-3.27v3.27a2.45 2.45 0 0 1-2.45 2.45H9.96a2.5 2.5 0 0 1-2.5-2.5z"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </G>
    </Svg>
  );
};

export default SvgIconVideo;
