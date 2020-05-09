import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ColorType, ModeType } from '../../../types';
import { MarginProps } from './Panel';
import CoreBullet from '../core/Bullet';

interface BulletProps extends MarginProps {
  style?: StyleProp<ViewStyle>;
  mode: ModeType;
  active?: boolean;
  onPress?: (index?: number) => void;
  appearance?: 'strong';
}

const Bullet: FC<BulletProps> = ({ mode, active, onPress, appearance, ...rest }) => {
  let backgroundColor: ColorType = 'grey3';

  switch (mode) {
    case 'day':
      if (appearance === 'strong') {
        backgroundColor = 'white';
      }
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
