import React, { FC, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ColorType, UtilityType } from '../../types';
import CoreThumbnail from '../core/Thumbnail';
import { MarginProps } from './Panel';

interface ThumbailProps extends MarginProps {
  type: UtilityType;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  Badge?: React.ReactNode;
}

const Thumbail: FC<ThumbailProps> = ({ children, type, onPress, Badge, ...rest }) => {
  const [outline, setOutline] = useState<ColorType>();

  switch (type) {
    case 'delete':
      setOutline('red');
      break;
    default:
  }

  return (
    <CoreThumbnail outline={outline} onPress={onPress} TopRight={Badge} {...rest}>
      {children}
    </CoreThumbnail>
  );
};

export default Thumbail;
