import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeRoot from './HomeRoot';
import CreateRoot from './CreateRoot';
import OnboardingRoot from './OnboardingRoot';

const Stack = createStackNavigator();

const AppRoot: FC = () => {
  return (
    <Stack.Navigator mode="modal" headerMode="none">
      <Stack.Screen name="HomeRoot" component={HomeRoot} />
      <Stack.Screen name="OnboardingRoot" component={OnboardingRoot} />
      <Stack.Screen name="CreateRoot" component={CreateRoot} />
    </Stack.Navigator>
  );
};

export default AppRoot;
