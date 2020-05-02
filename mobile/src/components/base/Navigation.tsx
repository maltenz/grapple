import React, { FC, ReactNode } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { ColorType, ModeType } from '../../types';
import SvgIconChat from '../../assets/svg/icons/large/SvgIconChat';
import Panel from './Panel';
import CoreText from '../core/Text';
import SvgIconSearch from '../../assets/svg/icons/large/SvgIconSearch';
import SvgIconLeft from '../../assets/svg/icons/large/SvgIconLeft';
import SvgIconSmallClose from '../../assets/svg/icons/small/SvgIconSmallClose';
import { AssetStyles } from '../../assets/styles';
import SvgLogoGrapple from '../../assets/svg/SvgGrappleLogo';

interface NavigationProps {
  Left?: ReactNode;
  Center?: ReactNode;
  Right?: ReactNode;
  mode: ModeType;
  style?: StyleProp<ViewStyle>;
  blur?: boolean;
}

interface NavigationIconProps {
  mode: ModeType;
  type: 'chat' | 'search' | 'delete' | 'saved' | 'back' | 'close';
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

interface NavigationLogoProps {
  mode: ModeType;
}

interface NavigationHeadingProps {
  mode: ModeType;
  text: string;
}

interface NavigationBackgroundProps {
  mode: ModeType;
  blur?: boolean;
  style?: StyleProp<ViewStyle>;
}

const HEIGHT = 60;
const NavigationHeight = HEIGHT;
const GUTTER = AssetStyles.measure.space / 2;

const NavigationIconEl: FC<NavigationIconProps> = ({ mode, type = 'back' }) => {
  const config: {
    color?: ColorType;
    scale?: number;
    strokeWidth?: number;
  } = {
    color: mode === 'day' ? 'grey' : 'white',
    scale: 0.9,
    strokeWidth: 2.5,
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

const NavigationBackground: FC<NavigationBackgroundProps> = ({ blur, mode, children, style }) => {
  const insets = useSafeArea();

  if (blur) {
    return (
      <BlurView intensity={100} style={[styles.container, { height: HEIGHT + insets.top }, style]}>
        {children}
      </BlurView>
    );
  }
  return (
    <Panel
      backgroundColor={mode === 'day' ? 'white' : 'black'}
      style={[styles.container, { height: HEIGHT + insets.top }, style]}
    >
      {children}
    </Panel>
  );
};

const Navigation: FC<NavigationProps> = ({ mode, Left, Center, Right, blur, style }) => {
  return (
    <NavigationBackground mode={mode} blur={blur} style={style}>
      {Left && <Panel style={styles.left}>{Left}</Panel>}
      {Center}
      {Right && <Panel style={styles.right}>{Right}</Panel>}
    </NavigationBackground>
  );
};

const NavigationLogo: FC<NavigationLogoProps> = ({ mode }) => {
  return (
    <Panel row justifyContent="center" alignItems="flex-end" flex={1} marginBottom={0.8}>
      <SvgLogoGrapple color={mode === 'day' ? 'grey' : 'white'} scale={0.4} />
    </Panel>
  );
};

const NavigationHeading: FC<NavigationHeadingProps> = ({ mode, text }) => {
  return (
    <Panel row justifyContent="center" alignItems="flex-end" flex={1} marginBottom={0.5}>
      <CoreText
        type="h4"
        color={mode === 'day' ? 'grey' : 'white'}
        style={{ marginLeft: 0, marginRight: 0 }}
      >
        {text}
      </CoreText>
    </Panel>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    ...AssetStyles.shadow.deep,
    zIndex: 1,
  },
  left: {
    position: 'absolute',
    left: GUTTER,
    bottom: GUTTER,
    zIndex: 1,
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
    zIndex: 1,
  },
});

export { NavigationIcon, NavigationLogo, NavigationHeading, NavigationHeight };
export default Navigation;
