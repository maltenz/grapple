import React, { FC } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import Onboarding1 from './Onboarding1';
import Onboarding2 from './Onboarding2';
import Onboarding3 from './Onboarding3';
import Onboarding4 from './Onboarding4';
import Onboarding5 from './Onboarding5';
import { AppRootParamList } from './AppRoot';

export type OnboardingParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  Onboarding4: undefined;
  Onboarding5: undefined;
};

type OnboardingRouteProp = RouteProp<OnboardingParamList, 'Onboarding1'>;

export type OnboardingNavigationProp = CompositeNavigationProp<
  StackNavigationProp<OnboardingParamList>,
  StackNavigationProp<AppRootParamList>
>;

type MyOnboardingNavigationProp = StackNavigationProp<OnboardingParamList, 'Onboarding1'>;

type NavigationProps = {
  route: OnboardingRouteProp;
  navigation: MyOnboardingNavigationProp;
};

const Stack = createMaterialTopTabNavigator();

const OnboardingRoot: FC<NavigationProps> = () => {
  return (
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
  );
};

export default OnboardingRoot;
