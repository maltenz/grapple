import _ from 'lodash';
import React, { FC } from 'react';
import { ModeType } from '../../types';
import Panel, { MarginProps } from './Panel';
import Bullet from './Bullet';

interface BulletPagerProps extends MarginProps {
  count: number;
  activeIndex: number;
  mode: ModeType;
  center?: boolean;
}

const BulletPager: FC<BulletPagerProps> = ({ count, activeIndex, mode, center, ...rest }) => {
  return (
    <Panel row {...rest} center={center}>
      {_.times(count, (index) => (
        <Bullet mode={mode} key={index} active={index === activeIndex} marginRight={0.5} />
      ))}
    </Panel>
  );
};

export default BulletPager;
