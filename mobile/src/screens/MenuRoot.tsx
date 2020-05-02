import React, { FC } from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { AppRootParamList } from './AppRoot';

import Menu from './Menu';

const Stack = createStackNavigator();

type ScreenNavigationProp = StackNavigationProp<MenuParamList, 'Menu'>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type MenuProps = NavProps;

export type MenuParamList = {
  Menu: undefined;
};

export type MenuNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AppRootParamList>,
  StackNavigationProp<MenuProps>
>;

const MenuRoot: FC<MenuNavigationProp> = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Stack.Screen name="MenuRoot" component={Menu} />
    </Stack.Navigator>
  );
};

export default MenuRoot;
