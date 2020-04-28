import React, { FC } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OnboardingScreen1 from './components/Onboarding1Screen';
import OnboardingScreen2 from './Onboadring2';
import OnboardingScreen3 from './Onboadring3';
import OnboardingScreen4 from './Onboadring4';
import OnboardingScreen5 from './Onboadring5';

const Stack = createMaterialTopTabNavigator();

const OnboardingScreen: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        style: {
          display: 'none',
        },
      }}
    >
      <Stack.Screen name="onboarding1" component={OnboardingScreen1} />
      <Stack.Screen name="onboarding2" component={OnboardingScreen2} />
      <Stack.Screen name="onboarding3" component={OnboardingScreen3} />
      <Stack.Screen name="onboarding4" component={OnboardingScreen4} />
      <Stack.Screen name="onboarding5" component={OnboardingScreen5} />
    </Stack.Navigator>
  );
};

export default OnboardingScreen;
