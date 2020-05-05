import React, { FC } from 'react';
import { View } from 'react-native';
import { ColorType } from '../../types';
import Panel, { MarginProps } from '../base/Panel';
import { AssetStyles } from '../../assets/styles';
import { Color } from '../../assets/colors';

interface PullBarProps extends MarginProps {
  color?: ColorType;
}

const PullBar: FC<PullBarProps> = ({ color, ...rest }) => {
  const height = AssetStyles.measure.border.large;
  return (
    <Panel marginVertical={0.5} center {...rest}>
      <View
        style={{
          height,
          borderRadius: height / 2,
          width: 40,
          backgroundColor: (color && Color[color]) || Color.grey3,
        }}
      />
    </Panel>
  );
};

export default PullBar;
