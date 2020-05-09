import React, { FC } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { ColorType } from '../../../types';
import Panel, { MarginProps } from '../base/Panel';
import { AssetStyles } from '../../styles';
import { Color } from '../../colors';

interface PullBarProps extends MarginProps {
  color?: ColorType;
  style?: StyleProp<ViewStyle>;
}

const PullBarHeight = 30;

const PullBar: FC<PullBarProps> = ({ color, style, ...rest }) => {
  return (
    <Panel center style={{ height: PullBarHeight }} {...rest}>
      <View
        style={[
          {
            height: AssetStyles.measure.border.large,
            borderRadius: PullBarHeight / 2,
            width: 40,
            backgroundColor: (color && Color[color]) || Color.grey3,
          },
          style,
        ]}
      />
    </Panel>
  );
};

export { PullBarHeight };

export default PullBar;
