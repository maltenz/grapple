import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ModeType } from '../../types';
import { MarginProps } from './Panel';
import PullBar, { PullBarHeight } from '../core/PullBar';

interface PullbarProps extends MarginProps {
  mode: ModeType;
  style?: StyleProp<ViewStyle>;
}

const Pullbar: FC<PullbarProps> = ({ mode, style, ...rest }) => {
  return <PullBar color={mode === 'day' ? 'grey3' : 'grey'} style={style} {...rest} />;
};

export { PullBarHeight };

export default Pullbar;
