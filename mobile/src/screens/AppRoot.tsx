import React, { FC } from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import HomeRoot, { ParentParamList } from './HomeRoot';
import OnboardingRoot from './OnboardingRoot';
import { useGetSignUserQuery } from '../generated/graphql';

export type AppRootParamList = {
  HomeRoot: undefined;
  OnboardingRoot: undefined;
};

type AppRootRouteProp = RouteProp<AppRootParamList, 'HomeRoot'>;

export type AppRootNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AppRootParamList>,
  StackNavigationProp<ParentParamList>
>;

type MyCreateNavigationProp = StackNavigationProp<AppRootParamList, 'HomeRoot'>;

type NavigationProps = {
  route?: AppRootRouteProp;
  navigation?: MyCreateNavigationProp;
};

const Stack = createStackNavigator<AppRootParamList>();

const AppRoot: FC<NavigationProps> = () => {
  const { data } = useGetSignUserQuery();

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator headerMode="none">
        {data?.signUser.userId ? (
          <Stack.Screen name="HomeRoot" component={HomeRoot} />
        ) : (
          <Stack.Screen name="OnboardingRoot" component={OnboardingRoot} />
        )}
      </Stack.Navigator>
    </>
  );
};

export default AppRoot;
