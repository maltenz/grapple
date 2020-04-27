/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ColorType, UtilityType } from '../../types';
import CoreThumbnail from '../core/Thumbnail';
import { MarginProps } from './Panel';

interface ThumbailProps extends MarginProps {
  type: UtilityType;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  Badge?: any;
}

const Thumbail: FC<ThumbailProps> = ({ children, type, onPress, Badge, ...rest }) => {
  let outline: ColorType;

  switch (type) {
    case 'delete':
      outline = 'red';
      break;
    default:
  }

  return (
    <CoreThumbnail
      outline={
        // @ts-ignore
        outline
      }
      onPress={onPress}
      TopRight={Badge}
      {...rest}
    >
      {children}
    </CoreThumbnail>
  );
};

export default Thumbail;
