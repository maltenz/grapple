import React, { FC } from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import Camera from './Camera';
import { AppRootParamList } from './AppRoot';
import MyPosts from './MyPosts';
import MyPost from './MyPost';

const Stack = createStackNavigator();

type ScreenNavigationProp = StackNavigationProp<AppRootParamList, 'CreateRoot'>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type CreateRootProps = NavProps;

export type CreateRootParamList = {
  Camera: undefined;
  MyPosts: undefined;
  MyPost: undefined;
};

export type CreateRootScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AppRootParamList>,
  StackNavigationProp<CreateRootProps>
>;

const CreateRoot: FC<CreateRootProps> = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Create" component={Camera} />
      <Stack.Screen name="MyPosts" component={MyPosts} />
      <Stack.Screen name="MyPost" component={MyPost} />
    </Stack.Navigator>
  );
};

export default CreateRoot;
