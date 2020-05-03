/* eslint-disable @typescript-eslint/ban-ts-ignore */

import React, { Fragment, FC, ReactNode } from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import {
  CompositeNavigationProp,
  useNavigation,
  RouteProp,
  StackNavigationState,
  NavigationHelpers,
} from '@react-navigation/native';

import { StackDescriptorMap } from '@react-navigation/stack/lib/typescript/src/types';

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
import MenuRoot from './MenuRoot';
import Camera from './Camera';
import MyProfile from './MyProfile';
import MyPost from './MyPost';
import Account from './Account';
import MyPosts from './MyPosts';

/**
 * Home parent
 */

export type HomeParentRootParamList = {
  HomeChildRoot: undefined;
  MenuRoot: undefined;
  Camera: undefined;
};

type HomeParentRootRouteProp = RouteProp<HomeParentRootParamList, 'HomeChildRoot'>;

export type HomeParentRootNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeParentRootParamList>,
  StackNavigationProp<AppRootParamList>
>;

type MyHomeParentRootNavigationProp = StackNavigationProp<HomeParentRootParamList, 'HomeChildRoot'>;

type HomeParentNavigationProps = {
  route: HomeParentRootRouteProp;
  navigation: MyHomeParentRootNavigationProp;
};

const HomeParentStack = createStackNavigator<HomeParentRootParamList>();

/**
 * Home child
 */
type HomeChildRootParamList = {
  HomeStack: undefined;
  // Profile
  MyProfile: undefined;
  // Post
  MyPost: undefined;
  MyPosts: undefined;
  // Account
  Notifications: undefined;
  Help: undefined;
  CommunityGuidelines: undefined;
  PrivacyPolicy: undefined;
  Terms: undefined;
  Security: undefined;
};

type HomeChildRootRouteProp = RouteProp<HomeChildRootParamList, 'HomeStack'>;

export type HomeChildRootNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeChildRootParamList>,
  StackNavigationProp<AppRootParamList>
>;

type MyHomeChildRootNavigationProp = StackNavigationProp<HomeChildRootParamList, 'HomeStack'>;

type HomeChildNavigationProps = {
  route: HomeChildRootRouteProp;
  navigation: MyHomeChildRootNavigationProp;
};

const HomeChildStack = createStackNavigator<HomeChildRootParamList>();

/**
 * Home tab
 */
const HomeStackTab = createBottomTabNavigator();

interface TabBarProps {
  state: StackNavigationState;
  descriptors: StackDescriptorMap;
  navigation: NavigationHelpers<HomeChildNavigationProps>;
}

const TabBar: FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  const myNavigation = useNavigation<HomeParentRootNavigationProp>();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0 }}>
        <TabbarBackground />

        {state.routes.map(
          // @ts-ignore
          (route: RouteProp<HomeChildNavigationProps, 'route'>, index: number) => {
            const { options } = descriptors[route.key];
            const label = options.title ? options.title : route.name;

            const isFocused = state.index === index;

            const onPress = (): void => {
              const event = navigation.emit({
                // @ts-ignore
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
                // @ts-ignore
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <Fragment key={label}>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityStates={isFocused ? ['selected'] : []}
                  // @ts-ignore
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
          }
        )}
      </View>
    </>
  );
};

const HomeStack: FC = () => (
  <HomeStackTab.Navigator
    tabBar={(props): ReactNode => {
      // @ts-ignore
      return <TabBar {...props} />;
    }}
  >
    <HomeStackTab.Screen name="Home" component={Home} />
    <HomeStackTab.Screen name="Account" component={Account} />
  </HomeStackTab.Navigator>
);

const HomeChildRoot: FC<HomeChildNavigationProps> = () => {
  return (
    <HomeChildStack.Navigator headerMode="none">
      <HomeChildStack.Screen name="HomeStack" component={HomeStack} />
      {/* Profile */}
      <HomeChildStack.Screen name="MyProfile" component={MyProfile} />
      {/* Post */}
      <HomeChildStack.Screen name="MyPost" component={MyPost} />
      <HomeChildStack.Screen name="MyPosts" component={MyPosts} />
      {/* Account */}
      <HomeChildStack.Screen name="Notifications" component={MyPost} />
      <HomeChildStack.Screen name="Help" component={MyPost} />
      <HomeChildStack.Screen name="Security" component={MyPost} />
      <HomeChildStack.Screen name="CommunityGuidelines" component={MyPost} />
      <HomeChildStack.Screen name="PrivacyPolicy" component={MyPost} />
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
        <HomeParentStack.Screen name="Camera" component={Camera} />
      </HomeParentStack.Navigator>
    </>
  );
};

export default HomeParentRoot;
