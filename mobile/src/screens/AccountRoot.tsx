import React, { FC } from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import MyPost from './MyPost';
import Account from './Account';
import { AppRootParamList } from './AppRoot';

export type AccountRootParamList = {
  Account: undefined;
  Notifications: undefined;
  Help: undefined;
  CommunityGuidelines: undefined;
  PrivacyPolicy: undefined;
  Terms: undefined;
  Security: undefined;
};

type AccountRootRouteProp = RouteProp<AccountRootParamList, 'Account'>;

export type AccountRootNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AccountRootParamList>,
  StackNavigationProp<AppRootParamList>
>;

type MyAccountRootNavigationProp = StackNavigationProp<AccountRootParamList, 'Account'>;

type NavigationProps = {
  route: AccountRootRouteProp;
  navigation: MyAccountRootNavigationProp;
};

const Stack = createStackNavigator<AccountRootParamList>();

const AccountRoot: FC<NavigationProps> = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Notifications" component={MyPost} />
      <Stack.Screen name="Help" component={MyPost} />
      <Stack.Screen name="Security" component={MyPost} />
      <Stack.Screen name="CommunityGuidelines" component={MyPost} />
      <Stack.Screen name="PrivacyPolicy" component={MyPost} />
    </Stack.Navigator>
  );
};

export default AccountRoot;
