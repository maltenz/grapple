import React, { FC } from 'react';
import { StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { ColorType } from '../../types';
import Panel, { MarginProps } from '../base/Panel';
import { AssetStyles } from '../../assets/styles';

interface BadgeProps extends MarginProps {
  style?: StyleProp<ViewStyle>;
  backgroundColor?: ColorType;
  onPress?: () => void;
}

const Badge: FC<BadgeProps> = ({ backgroundColor, children, style, onPress, ...rest }) => {
  return (
    <Panel
      onPress={onPress}
      center
      backgroundColor={backgroundColor || 'blue'}
      style={[styles.container, style]}
      {...rest}
    >
      {children}
    </Panel>
  );
};

const PADDING = AssetStyles.measure.circle.small.padding;
const DIAMETER = AssetStyles.measure.circle.small.size - PADDING * 2;

const styles = StyleSheet.create({
  container: {
    width: DIAMETER,
    height: DIAMETER,
    borderRadius: DIAMETER / 2,
  },
});

export default Badge;
