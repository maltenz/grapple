import React, { FC } from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';

import { AppRootParamList } from './AppRoot';
import MyProfile from './MyProfile';

export type HomeRootStackParamList = {
  MyProfile: undefined;
};

type ScreenNavigationProp = StackNavigationProp<HomeRootStackParamList>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type HomeRootStackProps = NavProps;

export type HomeRootStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeRootStackProps>,
  StackNavigationProp<AppRootParamList>
>;

const HomeRootStack = createStackNavigator<HomeRootStackParamList>();

const HomeRoot: FC<NavProps> = () => {
  return (
    <HomeRootStack.Navigator headerMode="none">
      <HomeRootStack.Screen name="MyProfile" component={MyProfile} />
    </HomeRootStack.Navigator>
  );
};

export default HomeRoot;
