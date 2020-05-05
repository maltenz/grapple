import React, { FC } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
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

const BLOB_INSET = 100;

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

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Panel backgroundColor="purple" style={[StyleSheet.absoluteFill]} />
      <Panel
        marginHorizontal={2}
        flex={1}
        style={{ marginTop: insets.top, marginBottom: BLOB_INSET + AssetStyles.measure.space }}
      >
        <Panel flex={1} center>
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
      <Panel alignItems="flex-start" marginHorizontal={2} marginBottom={2} style={styles.main}>
        <SvgBlob color="white" scale={2.5} style={styles.blob} />
        <Panel>
          <Text mode="day" type="h4" appearance="heavy">
            The Tools
          </Text>
          <ListRow>An alert systems to get help fast</ListRow>
          <ListRow>Find or become a buddy to help</ListRow>
          <ListRow>A social network to connect and share</ListRow>
          <ListRow>Collect evidence to build your case</ListRow>
          <ListRow>Security and anonymous support</ListRow>
        </Panel>
        <Text
          mode="day"
          appearance="heavy"
          underline
          type="p"
          bold
          textAlign="center"
          marginTop
          style={{ width: '100%' }}
        >
          See More
        </Text>
      </Panel>
      <Panel alignItems="center" style={{ marginBottom: insets.bottom }}>
        <BulletPager mode="day" activeIndex={0} count={4} />
      </Panel>
      <Ruler position="center" />
    </>
  );
};

const styles = StyleSheet.create({
  blob: {
    position: 'absolute',
    top: -BLOB_INSET,
    left: '-50%',
    transform: [{ rotate: '-10deg' }],
    shadowRadius: 50,
    shadowColor: Color.red,
    shadowOpacity: 0.25,
  },
  main: {
    position: 'relative',
    height: 250,
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
