import React, { FC } from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import HomeRoot from './HomeRoot';
import OnboardingRoot from './OnboardingRoot';

export type AppRootParamList = {
  HomeRoot: undefined;
  OnboardingRoot: undefined;
};

type AppRootRouteProp = RouteProp<AppRootParamList, 'HomeRoot'>;

export type AppRootNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AppRootParamList>,
  StackNavigationProp<AppRootParamList>
>;

type MyCreateNavigationProp = StackNavigationProp<AppRootParamList, 'HomeRoot'>;

type NavigationProps = {
  route?: AppRootRouteProp;
  navigation?: MyCreateNavigationProp;
};

const Stack = createStackNavigator<AppRootParamList>();

const AppRoot: FC<NavigationProps> = () => {
  return (
    <>
      <StatusBar hidden={false} barStyle="light-content" />
      <Stack.Navigator headerMode="none" initialRouteName="OnboardingRoot">
        <Stack.Screen name="HomeRoot" component={HomeRoot} />
        <Stack.Screen name="OnboardingRoot" component={OnboardingRoot} />
      </Stack.Navigator>
    </>
  );
};

export default AppRoot;
