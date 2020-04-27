import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ColorType, ModeType } from '../../types';
import { MarginProps } from './Panel';
import CoreBullet from '../core/Bullet';

interface BulletProps extends MarginProps {
  style?: StyleProp<ViewStyle>;
  mode: ModeType;
  active?: boolean;
  onPress?: (index?: number) => void;
}

const Bullet = ({ mode, active, onPress, ...rest }: BulletProps) => {
  let backgroundColor: ColorType = 'grey3';

  switch (mode) {
    case 'day':
      if (active) {
        backgroundColor = 'red';
      }
      break;
    case 'night':
    default:
      if (active) {
        backgroundColor = 'blue';
      }
  }

  return <CoreBullet backgroundColor={backgroundColor} onPress={onPress} {...rest} />;
};

export default Bullet;
