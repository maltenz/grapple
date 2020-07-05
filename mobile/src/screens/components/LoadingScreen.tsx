import React, { FC } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Panel, AssetStyles, Color, SvgLogoGrapple } from '../../assets';

interface LoadingScreenProps {
  visible: boolean;
}

const LoadingScreen: FC<LoadingScreenProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <Panel style={[StyleSheet.absoluteFill, styles.loaderContainer]} center backgroundColor="red">
      <ActivityIndicator size="large" color={Color.white} style={styles.activityIndicator} />
      <SvgLogoGrapple color="white" scale={0.65} />
    </Panel>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    zIndex: 10,
    opacity: 0.9,
  },
  activityIndicator: {
    marginBottom: AssetStyles.measure.space * 2,
  },
});

export default LoadingScreen;
