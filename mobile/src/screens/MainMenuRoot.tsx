import React, { FC } from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { AppRootParamList } from './AppRoot';

import MainMenu from './MainMenu';

const Stack = createStackNavigator();

type ScreenNavigationProp = StackNavigationProp<AppRootParamList, 'CreateRoot'>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type CreateRootProps = NavProps;

export type CreateRootParamList = {
  MainMenu: undefined;
};

export type CreateRootScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AppRootParamList>,
  StackNavigationProp<CreateRootProps>
>;

const CreateRoot: FC<CreateRootProps> = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Stack.Screen name="MainMenu" component={MainMenu} />
    </Stack.Navigator>
  );
};

export default CreateRoot;
