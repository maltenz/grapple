import React, { FC } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { ColorType, ModeType } from '../../types';
import SvgIconChat from '../../assets/svg/icons/large/SvgIconChat';
import Panel from './Panel';
import SvgIconSearch from '../../assets/svg/icons/large/SvgIconSearch';
import SvgIconLeft from '../../assets/svg/icons/large/SvgIconLeft';
import SvgIconSmallClose from '../../assets/svg/icons/small/SvgIconSmallClose';
import { AssetStyles } from '../../assets/styles';

interface NavigationIconProps {
  mode: ModeType;
  type: 'chat' | 'search' | 'delete' | 'saved' | 'back' | 'close';
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const NavigationIconEl: FC<NavigationIconProps> = ({ mode, type = 'back' }) => {
  const config: {
    color?: ColorType;
    scale?: number;
  } = {
    color: mode === 'day' ? 'grey' : 'white',
    scale: 0.9,
  };

  switch (type) {
    case 'chat':
      return <SvgIconChat {...config} />;
    case 'search':
      return <SvgIconSearch {...config} />;
    case 'back':
      return <SvgIconLeft {...config} />;
    case 'close':
      return <SvgIconSmallClose {...config} />;
    default:
      return null;
  }
};

const NavigationIcon: FC<NavigationIconProps> = ({ onPress, ...rest }) => {
  return (
    <Panel alignItems="flex-end" onPress={onPress}>
      <NavigationIconEl {...rest} />
    </Panel>
  );
};

interface NavigationProps {
  Left?: React.ReactNode;
  Center?: React.ReactNode;
  Right?: React.ReactNode;
  mode: ModeType;
  style?: StyleProp<ViewStyle>;
  i18nKey?: string;
}

const HEIGHT = 60;
const NavigationHeight = HEIGHT;

const Navigation: FC<NavigationProps> = ({ mode, Left, Center, Right, style }) => {
  const insets = useSafeArea();
  return (
    <Panel
      backgroundColor={mode === 'day' ? 'white' : 'black'}
      alignItems="flex-end"
      row
      style={[{ height: HEIGHT + insets.top, ...AssetStyles.shadow }, style]}
    >
      {Left && <Panel style={styles.left}>{Left}</Panel>}
      {Center}
      {Right && <Panel style={styles.right}>{Right}</Panel>}
    </Panel>
  );
};

export { NavigationHeight };

const GUTTER = AssetStyles.measure.space / 2;

const styles = StyleSheet.create({
  left: {
    position: 'absolute',
    left: GUTTER,
    bottom: GUTTER,
  },
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: GUTTER,
    justifyContent: 'center',
  },
  right: {
    position: 'absolute',
    right: GUTTER,
    bottom: GUTTER,
  },
});

export { NavigationIcon };
export default Navigation;
