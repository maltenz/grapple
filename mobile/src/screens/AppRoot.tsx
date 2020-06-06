import React, { FC, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/react-hooks';
import HomeRoot, { ParentParamList } from './HomeRoot';
import OnboardingRoot from './OnboardingRoot';
import { authUserSelector } from '../store';
import { GET_USER_POSTS_LIKED } from '../queries/user';

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
  const user = useSelector(authUserSelector);
  const [getUserPostsLiked, { data }] = useLazyQuery(GET_USER_POSTS_LIKED);

  useEffect(() => {
    if (user.id) {
      getUserPostsLiked({ variables: { id: user.id } });
    }
  }, []);

  useEffect(() => {
    // if (data.userLiked) {
    // }
  }, [data]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator headerMode="none">
        {user.id ? (
          <Stack.Screen name="HomeRoot" component={HomeRoot} />
        ) : (
          <Stack.Screen name="OnboardingRoot" component={OnboardingRoot} />
        )}
      </Stack.Navigator>
    </>
  );
};

export default AppRoot;
