import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ModeType, ColorType } from '../../../types';
import { MarginProps } from './Panel';
import PullBar, { PullBarHeight } from '../core/PullBar';

interface PullbarProps extends MarginProps {
  mode: ModeType;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  backgroundColor?: ColorType;
}

const Pullbar: FC<PullbarProps> = ({ mode, style, onPress, backgroundColor, ...rest }) => {
  return (
    <PullBar
      color={mode === 'day' ? 'grey3' : 'grey'}
      style={style}
      backgroundColor={backgroundColor}
      onPress={onPress}
      {...rest}
    />
  );
};

export { PullBarHeight };

export default Pullbar;
