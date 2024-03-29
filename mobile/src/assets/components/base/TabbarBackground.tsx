import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import SvgTabbarBackground, { SvgTabbarBackgroundWidth } from '../../svg/SvgTabbarBackground';
import { AssetStyles } from '../../styles';
import { ColorType } from '../..';

interface TabbarBackgroundProps {
  color?: ColorType;
}

const TabbarBackground: FC<TabbarBackgroundProps> = ({ color = 'white' }) => {
  return <SvgTabbarBackground style={styles.tabbar} color={color} />;
};

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    zIndex: 0,
    bottom: 0,
    left: -SvgTabbarBackgroundWidth / 2 + AssetStyles.measure.window.width / 2,
    ...AssetStyles.shadow.deep,
  },
});

export default TabbarBackground;
