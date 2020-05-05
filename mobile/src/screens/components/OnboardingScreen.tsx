import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { Panel, Text, SvgBlob, SvgBlobMirrored, Color, AssetStyles } from '../../components';
import Ruler from './OnboardingRuler';

interface OnboardingScreenProps {
  title: string;
  heading: string;
  subheading: string;
  blobMirrored?: boolean;
}

const OnboardingScreen: FC<OnboardingScreenProps> = ({
  title,
  heading,
  subheading,
  blobMirrored,
}) => {
  const insets = useSafeArea();

  return (
    <>
      <Panel
        backgroundColor="white"
        paddingHorizontal
        alignItems="center"
        style={[
          {
            paddingTop: insets.top + AssetStyles.measure.space * 2,
            paddingBottom: insets.top,
          },
          StyleSheet.absoluteFill,
        ]}
      >
        <Text
          mode="day"
          type="h2"
          appearance="strong"
          marginBottom={3}
          textAlign="center"
          color="purple"
        >
          {title}
        </Text>
        {blobMirrored ? (
          <SvgBlobMirrored color="white" style={styles.blob} />
        ) : (
          <SvgBlob color="white" style={styles.blob} />
        )}
        <Text mode="day" type="h3" appearance="heavy" marginBottom textAlign="center">
          {heading}
        </Text>
        <Text
          mode="day"
          type="p"
          appearance="normal"
          regular
          textAlign="center"
          color="grey"
          marginHorizontal
        >
          {subheading}
        </Text>
      </Panel>
      <Ruler position="lower" />
    </>
  );
};

const styles = StyleSheet.create({
  blob: {
    shadowRadius: 20,
    shadowColor: Color.red,
    shadowOpacity: 0.5,
    marginBottom: AssetStyles.measure.space * 3,
  },
});

export default OnboardingScreen;
