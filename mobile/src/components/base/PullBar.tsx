import React, { FC } from 'react';
import { ModeType } from '../../types';
import { MarginProps } from './Panel';
import PullBar, { PullBarHeight } from '../core/PullBar';

interface PullbarProps extends MarginProps {
  mode: ModeType;
}

const Pullbar: FC<PullbarProps> = ({ mode, ...rest }) => {
  return <PullBar color={mode === 'day' ? 'grey3' : 'grey'} {...rest} />;
};

export { PullBarHeight };

export default Pullbar;
