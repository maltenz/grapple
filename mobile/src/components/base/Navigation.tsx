import React, { FC } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { ColorType, ModeType } from '../../types';
import SvgIconChat from '../../assets/svg/icons/large/SvgIconChat';
import Panel from './Panel';
import SvgIconSearch from '../../assets/svg/icons/large/SvgIconSearch';
import Button from './Button';
import SvgIconLeft from '../../assets/svg/icons/large/SvgIconLeft';
import SvgIconSmallClose from '../../assets/svg/icons/small/SvgIconSmallClose';
import { AssetStyles } from '../../assets/styles';

interface NavigationIconProps {
  mode: ModeType;
  type: 'chat' | 'search' | 'delete' | 'saved' | 'back' | 'close';
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const NavigationIconEl = ({ mode, type = 'back', onPress }: NavigationIconProps) => {
  const config: {
    color?: ColorType;
    scale?: number;
    onPress: () => void;
  } = {
    color: mode === 'day' ? 'grey' : 'white',
    scale: 0.9,
    onPress,
  };

  switch (type) {
    case 'chat':
      return <SvgIconChat {...config} />;
    case 'search':
      return <SvgIconSearch {...config} />;
    case 'delete':
      return (
        <Button mode={mode} onPress={onPress} appearance="subtle" type="small">
          Delete
        </Button>
      );
    case 'saved':
      return (
        <Button mode={mode} onPress={onPress} appearance="subtle" type="small">
          Saved
        </Button>
      );
    case 'back':
      return <SvgIconLeft {...config} />;
    case 'close':
      return <SvgIconSmallClose {...config} />;
    default:
      return null;
  }
};

const NavigationIcon = ({ ...rest }: NavigationIconProps) => {
  return (
    <Panel>
      <NavigationIconEl {...rest} />
    </Panel>
  );
};

interface NavigationProps {
  Left?: any;
  Center?: any;
  Right?: any;
  mode: ModeType;
  style?: StyleProp<ViewStyle>;
  i18nKey?: string;
  t?: any;
}

const HEIGHT = 60;

const Navigation: FC<NavigationProps> = ({ mode, Left, Center, Right }) => {
  const insets = useSafeArea();
  return (
    <Panel
      backgroundColor={mode === 'day' ? 'white' : 'black'}
      alignItems="flex-end"
      row
      style={{ height: HEIGHT + insets.top, ...AssetStyles.shadow }}
    >
      {Left && <Panel style={styles.left}>{Left}</Panel>}
      {Center}
      {Right && <Panel style={styles.right}>{Right}</Panel>}
    </Panel>
  );
};

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
