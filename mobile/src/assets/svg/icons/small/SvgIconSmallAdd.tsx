import React, { FC } from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { ColorType } from '../../../../types';
import { Color } from '../../../colors';

interface SvgIconProps {
  scale?: number;
  color?: ColorType;
  strokeWidth?: boolean | number;
}

const SvgIconSmallAdd: FC<SvgIconProps> = ({
  scale,
  color: propColor,
  strokeWidth: propStrokeWidth,
}) => {
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
    <Svg height={height} width={width} viewBox="0 0 24.483 23.855">
      <G>
        <Path
          stroke={color}
          d="M12.167 19V6"
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <Path
          stroke={color}
          d="M5.667 12.5h13"
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
};

export default SvgIconSmallAdd;
