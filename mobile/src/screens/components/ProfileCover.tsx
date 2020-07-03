import React, { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

import {
  Panel,
  Badge,
  ColorThumbnail,
  Color,
  AssetStyles,
  SvgWiggleFill,
  CoreText,
  SvgIconAccount,
} from '../../assets';

import { ParentNavigationProp } from '../HomeRoot';

const WIDTH = AssetStyles.measure.window.width;
const SPACE = AssetStyles.measure.space;
const DIMENSION = WIDTH - SPACE * 2;
const CIRCLE = 125;
const RADIUS = AssetStyles.measure.radius.large;

interface ProfileCoverProps {
  onColorPicker: (value: boolean) => void;
}

const ProfileCover: FC<ProfileCoverProps> = ({ onColorPicker }) => {
  const parentNavigation = useNavigation<ParentNavigationProp>();
  const [primaryColor] = useState<string>(Color.red);
  const [secondaryColor] = useState<string>(Color.purple);

  return (
    <Panel style={styles.profile} marginHorizontal marginBottom={2} center>
      <SvgWiggleFill
        dimension={DIMENSION}
        style={StyleSheet.absoluteFill}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <ColorThumbnail
        style={styles.colorOuter}
        color={primaryColor}
        onPress={(): void => onColorPicker(true)}
      />
      <Panel onPress={(): void => parentNavigation.navigate('UserCamera')}>
        <BlurView tint="light" intensity={90} style={styles.blurviewCircle}>
          <SvgIconAccount strokeWidth={3} color="purple" scale={2} />
          <Badge type="add" appearance="strong" style={styles.badge} />
        </BlurView>
      </Panel>
      <BlurView tint="light" intensity={90} style={styles.blurviewText}>
        <CoreText type="p" color="purple" bold textAlign="center">
          Anonymous
        </CoreText>
      </BlurView>
    </Panel>
  );
};

const styles = StyleSheet.create({
  profile: {
    overflow: 'hidden',
    width: DIMENSION,
    height: DIMENSION,
  },
  colorOuter: {
    position: 'absolute',
    right: SPACE,
    bottom: SPACE,
  },
  blurviewCircle: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACE / 2,
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

export default ProfileCover;
