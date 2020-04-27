import React, { FC } from 'react';
import { StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { ColorType } from '../../types';
import Panel, { MarginProps } from '../base/Panel';

interface BulletProps extends MarginProps {
  style?: StyleProp<ViewStyle>;
  backgroundColor?: ColorType;
  onPress?: () => void;
}

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
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default Bullet;
