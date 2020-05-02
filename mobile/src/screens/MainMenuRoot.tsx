import React, { FC } from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { AppRootParamList } from './AppRoot';

import MainMenu from './MainMenu';

const Stack = createStackNavigator();

type ScreenNavigationProp = StackNavigationProp<MainMenuParamList, 'MainMenu'>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type MainMenuProps = NavProps;

export type MainMenuParamList = {
  MainMenu: undefined;
};

export type MainMenuNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AppRootParamList>,
  StackNavigationProp<MainMenuProps>
>;

const MainMenuRoot: FC<MainMenuNavigationProp> = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Stack.Screen name="MainMenuRoot" component={MainMenu} />
    </Stack.Navigator>
  );
};

export default MainMenuRoot;
