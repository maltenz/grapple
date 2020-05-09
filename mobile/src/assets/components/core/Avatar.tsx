import React, { FC } from 'react';
import { StyleSheet, StyleProp, ViewStyle, ImageSourcePropType, Image } from 'react-native';
import { ColorType } from '../../../types';
import Panel, { MarginProps } from '../base/Panel';
import { AssetStyles } from '../../styles';

interface AvatarProps extends MarginProps {
  style?: StyleProp<ViewStyle>;
  src?: ImageSourcePropType;
  backgroundColor?: ColorType;
}

const Avatar: FC<AvatarProps> = ({ style, src, backgroundColor, ...rest }) => {
  return (
    <Panel backgroundColor={backgroundColor || 'grey4'} {...rest} style={[styles.container, style]}>
      {src && <Image source={src} style={[StyleSheet.absoluteFill, { zIndex: -1 }]} />}
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
