import React, { FC } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { ModeType } from '..';
import { Color } from '../../assets/colors';

interface BorderProps {
  mode: ModeType;
  style?: StyleProp<ViewStyle>;
}

const Border: FC<BorderProps> = ({ mode, style }) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: mode === 'day' ? Color.grey3 : Color.red },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 1,
  },
});

export default Border;
