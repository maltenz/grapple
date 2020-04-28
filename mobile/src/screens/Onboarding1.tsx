import React, { useEffect, FC } from 'react';
import { StatusBar, StyleSheet, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeArea } from 'react-native-safe-area-context';
import {
  SvgLogoGrapple,
  SvgBlob,
  Panel,
  Text,
  Bullet,
  Color,
  BulletPager,
  AssetStyles,
} from '../components';
import Ruler from './components/OnboardingRuler';

const ListRow: FC = ({ children }) => (
  <Panel row alignItems="center">
    <Bullet active mode="day" marginRight />
    <Text mode="day" type="small" appearance="normal">
      {children}
    </Text>
  </Panel>
);

const Onboarding1: FC = () => {
  const insets = useSafeArea();
  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  return (
    <>
      <ImageBackground source={{ uri: 'https://source.unsplash.com/random' }} style={{ flex: 1 }}>
        <Panel
          backgroundColor="purple"
          flex={1}
          style={[StyleSheet.absoluteFill, { opacity: 0.75 }]}
        />
        <BlurView tint="dark" intensity={75} style={[StyleSheet.absoluteFill, { flex: 1 }]} />
        <SvgBlob color="white" scale={2.5} style={styles.blob} />
        <Panel
          marginHorizontal={2}
          flex={1.5}
          style={{ marginTop: insets.top, marginBottom: insets.top }}
        >
          <Panel flex={1} justifyContent="space-around">
            <Panel center>
              <SvgLogoGrapple color="white" />
              <Text
                marginTop={0.5}
                marginBottom={0.5}
                textAlign="center"
                mode="night"
                type="h3"
                appearance="normal"
                regular
              >
                A platform for women
              </Text>
            </Panel>
            <Text marginBottom={1} mode="night" type="p" appearance="normal" textAlign="center">
              One in five women have experienced violence with a loved one in New Zealand
            </Text>
          </Panel>
        </Panel>
        <Panel
          flex={1}
          justifyContent="flex-end"
          alignItems="flex-start"
          marginHorizontal={2}
          marginBottom={2}
        >
          <Text mode="day" type="h4" appearance="heavy">
            The Tools
          </Text>
          <ListRow>An alert systems to get help fast</ListRow>
          <ListRow>Find or become a buddy to help</ListRow>
          <ListRow>A social network to connect and share</ListRow>
          <ListRow>Collect evidence to build your case</ListRow>
          <ListRow>Security and anonymous support</ListRow>
        </Panel>
        <Panel alignItems="center" style={{ marginBottom: insets.bottom }}>
          <BulletPager mode="day" activeIndex={0} count={4} />
        </Panel>
      </ImageBackground>
      <Ruler position="center" />
    </>
  );
};

const styles = StyleSheet.create({
  blob: {
    position: 'absolute',
    bottom: '-7%',
    left: '-15%',
    transform: [{ rotate: '-25deg' }],
    shadowRadius: 50,
    shadowColor: Color.red,
    shadowOpacity: 0.25,
  },
  ruler: {
    position: 'absolute',
    width: 5,
    height: AssetStyles.measure.window.height,
    top: 0,
    right: 0,
  },
  rulerArrow: {
    position: 'absolute',
    top: '50%',
    right: 5,
  },
});

export default Onboarding1;
