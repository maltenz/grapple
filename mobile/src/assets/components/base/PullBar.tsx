import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ModeType } from '../../../types';
import { MarginProps } from './Panel';
import PullBar, { PullBarHeight } from '../core/PullBar';

interface PullbarProps extends MarginProps {
  mode: ModeType;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const Pullbar: FC<PullbarProps> = ({ mode, style, onPress, ...rest }) => {
  return (
    <PullBar color={mode === 'day' ? 'grey3' : 'grey'} style={style} onPress={onPress} {...rest} />
  );
};

export { PullBarHeight };

export default Pullbar;
