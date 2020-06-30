import React, { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeArea } from 'react-native-safe-area-context';
import { SvgWiggleFill, Color, AssetStyles, SvgIconAccount, Panel, CoreText } from '../../assets';
import { NavigationHeight } from '../../assets/components/base/Navigation';

const WIDTH = AssetStyles.measure.window.width;
const SPACE = AssetStyles.measure.space;
const DIMENSION = WIDTH;
const CIRCLE = 110;
const RADIUS = AssetStyles.measure.radius.large;

const ProfileIcon: FC = () => {
  return (
    <BlurView tint="light" intensity={90} style={styles.blurviewCircle}>
      <SvgIconAccount strokeWidth={3} color="purple" scale={1.5} />
      {/* <Badge type="add" appearance="strong" style={styles.badge} /> */}
    </BlurView>
  );
};

const ProfileName: FC = () => {
  return (
    <BlurView tint="light" intensity={90} style={styles.blurviewText}>
      <CoreText type="p" color="purple" bold textAlign="center">
        Anonymous
      </CoreText>
    </BlurView>
  );
};

const ProfileBackground: FC = () => {
  const inset = useSafeArea();
  const [primaryColor] = useState<string>(Color.red);
  const [secondaryColor] = useState<string>(Color.purple);

  return (
    <Panel
      center
      style={[
        styles.container,
        { paddingTop: inset.top + NavigationHeight },
        StyleSheet.absoluteFill,
      ]}
    >
      <SvgWiggleFill
        dimension={DIMENSION}
        style={StyleSheet.absoluteFill}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <ProfileIcon />
      <ProfileName />
    </Panel>
  );
};

const styles = StyleSheet.create({
  container: {
    width: DIMENSION,
    height: DIMENSION,
  },
  blurviewCircle: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: AssetStyles.measure.space / 2,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: SPACE,
    right: SPACE,
  },
  blurviewText: {
    borderRadius: RADIUS,
  },
});

export default ProfileBackground;
