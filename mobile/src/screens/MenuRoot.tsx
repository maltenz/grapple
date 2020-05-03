import React, { FC } from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { AppRootParamList } from './AppRoot';

import Menu from './Menu';

export type MenuRootParamList = {
  Menu: undefined;
};

type MenuRootRouteProp = RouteProp<MenuRootParamList, 'Menu'>;

export type MenuRootNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MenuRootParamList>,
  StackNavigationProp<AppRootParamList>
>;

type MyMenuRootNavigationProp = StackNavigationProp<MenuRootParamList, 'Menu'>;

type NavigationProps = {
  route: MenuRootRouteProp;
  navigation: MyMenuRootNavigationProp;
};

const Stack = createStackNavigator<MenuRootParamList>();

const MenuRoot: FC<NavigationProps> = () => {
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
