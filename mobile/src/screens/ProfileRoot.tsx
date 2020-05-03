import React, { FC } from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';

import { AppRootParamList } from './AppRoot';
import MyProfile from './MyProfile';
import { GalleryItemType } from '../components';

export type ProfileRootParamList = {
  MyProfile: undefined;
};

type ScreenNavigationProp = StackNavigationProp<ProfileRootParamList>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type ProfileRootProps = NavProps;

export type ProfileRootNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ProfileRootProps>,
  StackNavigationProp<AppRootParamList>
>;

const ProfileStack = createStackNavigator<ProfileRootParamList>();

interface ProfileProps extends GalleryItemType {
  name: string;
  excerpt: string;
}

const ProfileRoot: FC<NavProps> = () => {
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name="MyProfile" component={MyProfile} />
    </ProfileStack.Navigator>
  );
};

export { ProfileProps };

export default ProfileRoot;
