import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import Panel from './Panel';
import CoreText from '../core/Text';
import Border from './Border';
import SvgIconSmallRight from '../../svg/icons/small/SvgIconSmallRight';

interface MenuItemProps {
  title: string;
  last?: boolean;
  onPress: () => void;
}

const HEIGHT = 60;

const MenuItemHeight = HEIGHT;

const MenuItem: FC<MenuItemProps> = ({ title, last, onPress }) => {
  return (
    <Panel
      onPress={onPress}
      marginHorizontal
      row
      alignItems="center"
      justifyContent="space-between"
      style={styles.container}
    >
      <CoreText type="p">{title}</CoreText>
      <SvgIconSmallRight color="grey2" strokeWidth={1.5} style={styles.icon} />
      {!last && <Border mode="day" style={styles.border} />}
    </Panel>
  );
};

export { MenuItemHeight };

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    position: 'relative',
  },
  border: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  icon: {
    marginRight: 5,
  },
});

export default MenuItem;
