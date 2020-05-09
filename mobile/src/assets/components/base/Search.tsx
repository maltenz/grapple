import React, { FC } from 'react';
import { BlurView } from 'expo-blur';

import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import CoreText from '../core/Text';
import { AssetStyles } from '../../styles';
import Panel, { MarginProps } from './Panel';

const PADDING = AssetStyles.measure.space;
const HEIGHT = 60;

interface SearchProps extends MarginProps {
  style?: StyleProp<ViewStyle>;
}

const Search: FC<SearchProps> = ({ style, marginBottom = 1, ...rest }) => {
  return (
    <Panel marginBottom={marginBottom} {...rest} style={[AssetStyles.shadow.overlay, style]}>
      <BlurView tint="light" intensity={20} style={[styles.container]}>
        <CoreText type="p" color="white" textInput value="Search..." style={styles.input} />
      </BlurView>
    </Panel>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: HEIGHT / 2,
    height: HEIGHT,
  },
  input: {
    paddingVertical: PADDING,
    paddingHorizontal: PADDING,
    height: HEIGHT,
  },
});

export default Search;
