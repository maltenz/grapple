import _ from 'lodash';
import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ModeType } from '../../types';
import Panel, { MarginProps } from './Panel';
import Bullet from './Bullet';

interface BulletPagerProps extends MarginProps {
  count: number;
  activeIndex: number;
  mode: ModeType;
  center?: boolean;
  appearance?: 'strong';
  style?: StyleProp<ViewStyle>;
}

const BulletPager: FC<BulletPagerProps> = ({
  count,
  activeIndex,
  mode,
  center,
  appearance,
  style,
  ...rest
}) => {
  return (
    <Panel row {...rest} center={center} style={style}>
      {_.times(count, (index) => (
        <Bullet
          mode={mode}
          key={index}
          active={index === activeIndex}
          marginRight={index !== count && 0.5}
          appearance={appearance}
        />
      ))}
    </Panel>
  );
};

export default BulletPager;
