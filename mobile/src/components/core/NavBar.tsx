import React, { FC } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { ModeType, ColorType } from '../../types';
import Panel, { PanelProps } from '../base/Panel';
import { AssetStyles } from '../../assets/styles';

interface NavBarProps extends PanelProps {
  mode: ModeType;
  style?: StyleProp<ViewStyle>;
}

const NavBar: FC<NavBarProps> = ({ children, mode, style, ...rest }) => {
  let backgroundColor: ColorType;
  switch (mode) {
    case 'day':
      backgroundColor = 'white';
      break;
    case 'night':
    default:
      backgroundColor = 'grey';
  }

  return (
    <Panel
      row
      alignItems="center"
      backgroundColor={myBackgroundColor(backgroundColor)}
      style={[styles.container, style]}
      {...rest}
    >
      {children}
    </Panel>
  );
};

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

const HEIGHT = AssetStyles.measure.circle.small.size;

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
    alignSelf: 'flex-start',
  },
});

export default NavBar;
