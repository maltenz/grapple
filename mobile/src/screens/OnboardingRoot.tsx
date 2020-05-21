import React, { FC, useState, useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { useSafeArea } from 'react-native-safe-area-context';

import { BulletPager, AssetStyles } from '../assets';

import { useGetPagerQuery, useGetTokenQuery } from '../generated/graphql';

import { AppRootParamList } from './AppRoot';

import Authentication from './components/Authentication';
import PullModal from './components/PullModal';

import Onboarding1 from './Onboarding1';
import Onboarding2 from './Onboarding2';
import Onboarding3 from './Onboarding3';
import Onboarding4 from './Onboarding4';
import Onboarding5 from './Onboarding5';

export type OnboardingRootParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  Onboarding4: undefined;
  Onboarding5: undefined;
};

type OnboardingRootRouteProp = RouteProp<OnboardingRootParamList, 'Onboarding1'>;

export type OnboardingRootNavigationProp = CompositeNavigationProp<
  StackNavigationProp<OnboardingRootParamList>,
  StackNavigationProp<AppRootParamList>
>;

type MyOnboardingRootNavigationProp = StackNavigationProp<OnboardingRootParamList, 'Onboarding1'>;

type NavigationProps = {
  route: OnboardingRootRouteProp;
  navigation: MyOnboardingRootNavigationProp;
};

const Stack = createMaterialTopTabNavigator();

const OnboardingRoot: FC<NavigationProps> = () => {
  const inset = useSafeArea();
  const { data: tokenData } = useGetTokenQuery();
  const { data: pagerData } = useGetPagerQuery();

  const [pagerAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(pagerAnim, {
      toValue: pagerData?.pager.visible ? 1 : 0,
      duration: 600,
    }).start();
  }, [pagerData?.pager.visible]);

  const pagerOpacity = pagerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const BULLET_TOP =
    AssetStyles.measure.window.height - inset.bottom - AssetStyles.measure.space * 2;

  // eslint-disable-next-line no-console
  console.log(`tokenData ${tokenData?.token}`);
  // console.log(tokenData?.token);

  return (
    <>
      <Stack.Navigator
        tabBarOptions={{
          style: {
            display: 'none',
          },
        }}
      >
        <Stack.Screen name="onboarding1" component={Onboarding1} />
        <Stack.Screen name="onboarding2" component={Onboarding2} />
        <Stack.Screen name="onboarding3" component={Onboarding3} />
        <Stack.Screen name="onboarding4" component={Onboarding4} />
        <Stack.Screen name="onboarding5" component={Onboarding5} />
      </Stack.Navigator>
      <Animated.View style={[styles.pagerContainer, { top: BULLET_TOP, opacity: pagerOpacity }]}>
        {pagerData && (
          <BulletPager
            mode="day"
            count={pagerData.pager.count}
            activeIndex={pagerData.pager.activeIndex}
            center
          />
        )}
      </Animated.View>
      <PullModal>
        <Authentication />
      </PullModal>
    </>
  );
};

const styles = StyleSheet.create({
  pagerContainer: {
    position: 'absolute',
    right: 0,
    left: 0,
  },
});

export default OnboardingRoot;
