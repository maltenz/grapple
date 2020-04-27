import React, { FC } from 'react';
import { ModeType } from '../../types';
import { MarginProps } from './Panel';
import PullBar from '../core/PullBar';

interface PullbarProps extends MarginProps {
  mode: ModeType;
}

const Pullbar: FC<PullbarProps> = ({ mode, ...rest }) => {
  return <PullBar color={mode === 'day' ? 'grey3' : 'grey'} {...rest} />;
};

export default Pullbar;
