import React, { FC } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import Panel from './Panel';
import CoreText from '../core/Text';
import { Color } from '../../colors';
import { AssetStyles } from '../../styles';

interface ColorThumbnailProps {
  style: StyleProp<ViewStyle>;
  color: string;
  onPress: () => void;
}

const RADIUS = AssetStyles.measure.radius.regular;

const ColorThumbnail: FC<ColorThumbnailProps> = ({ style, onPress, color }) => {
  return (
    <Panel row alignItems="center" style={style} onPress={onPress}>
      <CoreText type="small" bold marginRight={0.5} color="white">
        Pick color
      </CoreText>
      <View style={styles.colorContainer}>
        <View style={[styles.color, { backgroundColor: color }]} />
      </View>
    </Panel>
  );
};

const styles = StyleSheet.create({
  colorContainer: {
    width: 40,
    height: 40,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS,
  },
  color: {
    width: 30,
    height: 30,
    borderRadius: RADIUS - 2,
    backgroundColor: Color.red,
  },
});

export default ColorThumbnail;
