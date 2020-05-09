import React, { FC } from 'react';
import { StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { ColorType } from '../../../types';
import Panel, { MarginProps } from '../base/Panel';

interface BulletProps extends MarginProps {
  style?: StyleProp<ViewStyle>;
  backgroundColor?: ColorType;
  onPress?: () => void;
}

const BULLET_DIMENSION = 10;

const BulletDimension = BULLET_DIMENSION;

const Bullet: FC<BulletProps> = ({ backgroundColor, style, onPress, ...rest }) => {
  return (
    <Panel
      onPress={onPress}
      backgroundColor={backgroundColor || 'grey3'}
      {...rest}
      style={[styles.container, style]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: BULLET_DIMENSION,
    height: BULLET_DIMENSION,
    borderRadius: 5,
  },
});
export { BulletDimension };
export default Bullet;
