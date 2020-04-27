import React, { FC } from 'react';
import { StyleSheet, StyleProp, ViewStyle, ImageSourcePropType, Image } from 'react-native';
import { ColorType } from '../../types';
import Panel, { MarginProps } from '../base/Panel';
import { AssetStyles } from '../../assets/styles';

interface AvatarProps extends MarginProps {
  style?: StyleProp<ViewStyle>;
  src?: ImageSourcePropType | any;
  backgroundColor?: ColorType;
}

const myBackgroundColor = (value: ColorType | boolean | undefined): any => {
  switch (typeof value) {
    case 'string':
      return `${value}`;
    case 'boolean':
    default: {
      return 'grey4';
    }
  }
};

const Avatar: FC<AvatarProps> = ({ style, src, backgroundColor, ...rest }) => {
  return (
    <Panel
      backgroundColor={myBackgroundColor(backgroundColor)}
      {...rest}
      style={[styles.container, style]}
    >
      <Image source={src} style={[StyleSheet.absoluteFill, { zIndex: -1 }]} />
    </Panel>
  );
};

const PADDING = AssetStyles.measure.circle.small.padding / 2;
const DIAMETER = AssetStyles.measure.circle.small.size - PADDING * 2;

const styles = StyleSheet.create({
  container: {
    margin: AssetStyles.measure.circle.small.padding / 2,
    width: DIAMETER,
    height: DIAMETER,
    borderRadius: DIAMETER / 2,
    overflow: 'hidden',
  },
});

export default Avatar;
