import React, { FC } from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import Camera from './Camera';
import MyPosts from './MyPosts';
import MyPost from './MyPost';
import { AppRootParamList } from './AppRoot';

export type CreateRootParamList = {
  Camera: undefined;
  MyPosts: undefined;
  MyPost: undefined;
};

type CreateRootRouteProp = RouteProp<CreateRootParamList, 'Camera'>;

export type CreateRootNavigationProp = CompositeNavigationProp<
  StackNavigationProp<CreateRootParamList>,
  StackNavigationProp<AppRootParamList>
>;

type MyCreateNavigationProp = StackNavigationProp<CreateRootParamList, 'Camera'>;

type NavigationProps = {
  route: CreateRootRouteProp;
  navigation: MyCreateNavigationProp;
};

const Stack = createStackNavigator<CreateRootParamList>();

const CreateRoot: FC<NavigationProps> = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Camera" component={Camera} />
      <Stack.Screen name="MyPosts" component={MyPosts} />
      <Stack.Screen name="MyPost" component={MyPost} />
    </Stack.Navigator>
  );
};

export default CreateRoot;
