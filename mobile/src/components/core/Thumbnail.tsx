import React, { FC } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, ImageSourcePropType, Image } from 'react-native';
import { ColorType } from '../../types';
import { AssetStyles } from '../../assets/styles';
import Panel, { MarginProps } from '../base/Panel';
import { Color } from '../../assets/colors';

const myBackgroundColor = (value: ColorType | boolean | undefined): any => {
  switch (typeof value) {
    case 'string':
      return `${value}`;
    case 'boolean':
    default: {
      return 'grey';
    }
  }
};

const borderColor = (value: ColorType | boolean | undefined): any => {
  switch (typeof value) {
    case 'string':
      return Color[value];
    case 'boolean':
      return Color.white;
    default: {
      return null;
    }
  }
};

interface ThumbnailProps extends MarginProps {
  style?: StyleProp<ViewStyle>;
  src?: ImageSourcePropType;
  backgroundColor?: ColorType;
  outline?: boolean | ColorType;
  onPress?: () => void;
  TopRight?: any;
}

const Thumbnail: FC<ThumbnailProps> = ({
  onPress,
  style,
  src,
  backgroundColor,
  outline,
  TopRight,
  ...rest
}: ThumbnailProps) => {
  const thumbnailStyles = {};

  if (outline) {
    Object.assign(thumbnailStyles, {
      borderWidth: AssetStyles.measure.border.large,
      borderColor: borderColor(outline),
    });
  }

  return (
    <Panel {...rest}>
      <Panel style={styles.container} onPress={onPress}>
        <Panel backgroundColor={myBackgroundColor(backgroundColor)} style={styles.image} />
        {src && <Image source={src} style={styles.image} />}
        <Panel style={[styles.border, thumbnailStyles, style]} />
        {TopRight && <View style={styles.topRight}>{TopRight}</View>}
      </Panel>
    </Panel>
  );
};

const WIDTH = 80;
const HEIGHT = 80;
const BORDER_WIDTH = AssetStyles.measure.radius.regular;

const styles = StyleSheet.create({
  container: {
    width: WIDTH + BORDER_WIDTH * 2,
    height: WIDTH + BORDER_WIDTH * 2,
    margin: -BORDER_WIDTH,
  },
  border: {
    width: WIDTH,
    height: HEIGHT,
    borderRadius: BORDER_WIDTH,
    position: 'absolute',
    top: BORDER_WIDTH,
    left: BORDER_WIDTH,
  },
  image: {
    width: WIDTH,
    height: HEIGHT,
    top: BORDER_WIDTH,
    left: BORDER_WIDTH,
    borderRadius: BORDER_WIDTH,
    position: 'absolute',
  },
  topRight: {
    position: 'absolute',
    top: BORDER_WIDTH / 2,
    right: BORDER_WIDTH / 2,
  },
});

export default Thumbnail;
