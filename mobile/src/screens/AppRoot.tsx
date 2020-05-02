import React, { FC } from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeRoot from './HomeRoot';
import OnboardingRoot from './OnboardingRoot';

export type AppRootParamList = {
  HomeRoot: undefined;
  OnboardingRoot: undefined;
};

const AppStack = createStackNavigator<AppRootParamList>();

const AppRoot: FC = () => {
  return (
    <>
      <StatusBar hidden={false} barStyle="light-content" />
      <AppStack.Navigator headerMode="none">
        <AppStack.Screen name="HomeRoot" component={HomeRoot} />
        <AppStack.Screen name="OnboardingRoot" component={OnboardingRoot} />
      </AppStack.Navigator>
    </>
  );
};

export default AppRoot;
