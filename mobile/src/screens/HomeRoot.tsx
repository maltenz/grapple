/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, FC, ReactNode } from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { CompositeNavigationProp, useNavigation, RouteProp } from '@react-navigation/native';

import {
  Panel,
  SvgIconHome,
  SvgIconAccount,
  SvgTabbarBackgroundHeight,
  TabbarBackground,
  TabbarCircleButton,
} from '../components';
import Home from './Home';
import { AppRootParamList } from './AppRoot';
import AccountRoot from './AccountRoot';
import MenuRoot from './MenuRoot';
import CreateRoot from './CreateRoot';
import MyProfile from './MyProfile';

/**
 * Home parent
 */

export type HomeParentRootParamList = {
  HomeChildRoot: undefined;
  MenuRoot: undefined;
  CreateRoot: undefined;
};

type HomeParentRootRouteProp = RouteProp<HomeParentRootParamList, 'HomeChildRoot'>;

export type HomeParentRootNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeParentRootParamList>,
  StackNavigationProp<AppRootParamList>
>;

type HomeParentNavigationProp = StackNavigationProp<HomeParentRootParamList, 'HomeChildRoot'>;

type HomeParentNavigationProps = {
  route: HomeParentRootRouteProp;
  navigation: HomeParentNavigationProp;
};

const HomeParentStack = createStackNavigator<HomeParentRootParamList>();

/**
 * Home child
 */
type HomeChildRootParamList = {
  HomeStack: undefined;
  MyProfile: undefined;
};

type HomeChildRootRouteProp = RouteProp<HomeChildRootParamList, 'HomeStack'>;

export type HomeChildRootNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeChildRootParamList>,
  StackNavigationProp<AppRootParamList>
>;

type HomeChildNavigationProp = StackNavigationProp<HomeChildRootParamList, 'HomeStack'>;

type HomeChildNavigationProps = {
  route: HomeChildRootRouteProp;
  navigation: HomeChildNavigationProp;
};

const HomeChildStack = createStackNavigator<HomeChildRootParamList>();

/**
 * Home tab
 */
const HomeStackTab = createBottomTabNavigator();

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const TabBar: FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  const myNavigation = useNavigation<HomeParentRootNavigationProp>();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0 }}>
        <TabbarBackground />

        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label = options.title ? options.title : route.name;

          const isFocused = state.index === index;

          const onPress = (): void => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = (): void => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Fragment key={label}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  flex: 1,
                  height: SvgTabbarBackgroundHeight,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {label === 'Home' ? <SvgIconHome scale={0.9} /> : <SvgIconAccount scale={0.9} />}
              </TouchableOpacity>
              {index === 0 && (
                <Panel center style={{ flex: 1 }}>
                  <TabbarCircleButton
                    isFocused={isFocused}
                    onPress={(): void => myNavigation.navigate('MenuRoot')}
                    onLongPress={onLongPress}
                  />
                </Panel>
              )}
            </Fragment>
          );
        })}
      </View>
    </>
  );
};

const HomeStack: FC = () => (
  <HomeStackTab.Navigator tabBar={(props): ReactNode => <TabBar {...props} />}>
    <HomeStackTab.Screen name="Home" component={Home} />
    <HomeStackTab.Screen name="Account" component={AccountRoot} />
  </HomeStackTab.Navigator>
);

const HomeChildRoot: FC<HomeChildNavigationProps> = () => {
  return (
    <HomeChildStack.Navigator headerMode="none">
      <HomeChildStack.Screen name="HomeStack" component={HomeStack} />
      <HomeChildStack.Screen name="MyProfile" component={MyProfile} />
    </HomeChildStack.Navigator>
  );
};

const HomeParentRoot: FC<HomeParentNavigationProps> = () => {
  return (
    <>
      <HomeParentStack.Navigator
        mode="modal"
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: 'transparent',
          },
        }}
      >
        <HomeParentStack.Screen name="HomeChildRoot" component={HomeChildRoot} />
        <HomeParentStack.Screen name="MenuRoot" component={MenuRoot} />
        <HomeParentStack.Screen name="CreateRoot" component={CreateRoot} />
      </HomeParentStack.Navigator>
    </>
  );
};

export default HomeParentRoot;
