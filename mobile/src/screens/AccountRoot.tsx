import React, { FC } from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import MyPost from './MyPost';
import Account from './Account';
import { AppRootParamList } from './AppRoot';

export type AccountRootParamList = {
  Account: undefined;
  MyProfile: undefined;
  Notifications: undefined;
  Help: undefined;
  CommunityGuidelines: undefined;
  PrivacyPolicy: undefined;
  Terms: undefined;
  Security: undefined;
};

type ScreenNavigationProp = StackNavigationProp<AccountRootParamList>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type AccountRootProps = NavProps;

export type AccountRootNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AccountRootProps>,
  StackNavigationProp<AppRootParamList>
>;

const AccountStack = createStackNavigator<AccountRootParamList>();

const AccountRoot: FC<NavProps> = () => {
  return (
    <AccountStack.Navigator headerMode="none">
      <AccountStack.Screen name="Account" component={Account} />
      <AccountStack.Screen name="Notifications" component={MyPost} />
      <AccountStack.Screen name="Help" component={MyPost} />
      <AccountStack.Screen name="Security" component={MyPost} />
      <AccountStack.Screen name="CommunityGuidelines" component={MyPost} />
      <AccountStack.Screen name="PrivacyPolicy" component={MyPost} />
    </AccountStack.Navigator>
  );
};

export default AccountRoot;
