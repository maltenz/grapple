import React, { FC } from 'react';
import { View } from 'react-native';
import { ColorType } from '../../types';
import Panel, { MarginProps } from '../base/Panel';
import { Color } from '../../assets/colors';
import { AssetStyles } from '../../assets/styles';

interface PullBarProps extends MarginProps {
  color?: ColorType;
}

const myColor = (value: ColorType | boolean | undefined): any => {
  switch (typeof value) {
    case 'string':
      return Color[value];
    case 'boolean':
    default: {
      return Color.grey3;
    }
  }
};

const PullBar: FC<PullBarProps> = ({ color, ...rest }) => {
  const height = AssetStyles.measure.border.large;
  return (
    <Panel marginVertical={0.5} center {...rest}>
      <View
        style={{ height, borderRadius: height / 2, width: 40, backgroundColor: myColor(color) }}
      />
    </Panel>
  );
};

export default PullBar;
