import React, { FC, useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { SvgLogoGrapple, SvgBlob, Panel, Text, Bullet, Color, AssetStyles } from '../components';

import { PullbarOffset } from './components/PullModal';
import { OnboardingRootNavigationProp } from './OnboardingRoot';
import { storeTheme } from '../store';

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
  const dispatch = useDispatch();
  const navigation = useNavigation<OnboardingRootNavigationProp>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(storeTheme.updatePager({ activeIndex: 0, count: 4, visible: false }));
      dispatch(storeTheme.setPullModalVisibilty(true));
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Panel backgroundColor="purple" style={[StyleSheet.absoluteFill]} />
      <Panel flex={1} style={{ marginBottom: PullbarOffset + insets.bottom }}>
        <Panel
          marginHorizontal={2}
          flex={1}
          style={{
            marginTop: insets.top + AssetStyles.measure.space * 2,
            marginBottom: BLOB_INSET + AssetStyles.measure.space,
          }}
        >
          <Panel flex={1} center>
            <SvgLogoGrapple color="white" scale={0.8} />
            <Text
              marginTop={0.85}
              marginBottom={0.5}
              textAlign="center"
              mode="night"
              type="h3"
              appearance="normal"
              regular
            >
              A platform for women
            </Text>
            <Text marginBottom mode="night" type="p" appearance="normal" textAlign="center">
              One in five women have experienced violence with a loved one in New Zealand
            </Text>
          </Panel>
        </Panel>
        <Panel marginHorizontal={2} alignItems="flex-end" row style={styles.main} marginBottom={2}>
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
            <Text
              mode="day"
              appearance="heavy"
              underline
              type="p"
              bold
              textAlign="right"
              marginTop
              marginRight={-1}
            >
              See More
            </Text>
          </Panel>
        </Panel>
      </Panel>
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
  },
});

export default Onboarding1;
