import React, { FC } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import Onboarding1 from './Onboarding1';
import Onboarding2 from './Onboarding2';
import Onboarding3 from './Onboarding3';
import Onboarding4 from './Onboarding4';
import Onboarding5 from './Onboarding5';
import { AppStackParamList } from './AppRoot';

type ScreenNavigationProp = StackNavigationProp<AppStackParamList, 'OnboardingRoot'>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type OnboardingRootProps = NavProps;

export type OnboardingRootParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  Onboarding4: undefined;
  Onboarding5: undefined;
};

const Stack = createMaterialTopTabNavigator();

const OnboardingRoot: FC<OnboardingRootProps> = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
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
