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
} from '../assets';

import { AppRootParamList } from './AppRoot';

import Home from './Home';
import Menu from './Menu';
import CreateCamera from './CreateCamera';
import UserCamera from './UserCamera';
import MyProfile from './MyProfile';
import MyProfileEdit from './MyProfileEdit';
import Account from './Account';
import Search from './Search';
import CreatePost from './CreatePost';

/**
 * Home parent
 */

export type ParentParamList = {
  Child: undefined;
  Menu: undefined;
  CreateCamera: undefined;
  UserCamera: undefined;
  Search: undefined;
};

type ParentRouteProp = RouteProp<ParentParamList, 'Child'>;

export type ParentNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ParentParamList>,
  StackNavigationProp<AppRootParamList>
>;

type MyParentNavigationProp = StackNavigationProp<ParentParamList, 'Child'>;

type parentNavigationProps = {
  route: ParentRouteProp;
  navigation: MyParentNavigationProp;
};

const ParentStack = createStackNavigator<ParentParamList>();

/**
 * Home child
 */

export type MyProfileEditParams = { newProfileImg?: boolean };

type ChildParamList = {
  HomeStack: undefined;
  // Profile
  MyProfile: undefined;
  MyProfileEdit: undefined;
  // Post
  CreatePost: undefined;
  // Account
  Notifications: undefined;
  Help: undefined;
  CommunityGuidelines: undefined;
  PrivacyPolicy: undefined;
  Terms: undefined;
  Security: undefined;
};

type ChildRouteProp = RouteProp<ChildParamList, 'HomeStack'>;

export type ChildNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ChildParamList>,
  StackNavigationProp<AppRootParamList>
>;

type MyChildNavigationProp = StackNavigationProp<ChildParamList, 'HomeStack'>;

type ChildNavigationProps = {
  route: ChildRouteProp;
  navigation: MyChildNavigationProp;
};

const ChildStack = createStackNavigator<ChildParamList>();

/**
 * Home tab
 */
const TabStack = createBottomTabNavigator();

interface TabBarProps {
  state: StackNavigationState;
  descriptors: StackDescriptorMap;
  navigation: NavigationHelpers<ChildNavigationProps>;
}

const TabBar: FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  const parentNavigation = useNavigation<ParentNavigationProp>();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0 }}>
        <TabbarBackground />

        {state.routes.map(
          // @ts-ignore
          (route: RouteProp<ChildNavigationProps, 'route'>, index: number) => {
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

              // @ts-ignore
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
                      onPress={(): void => parentNavigation.navigate('Menu')}
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
  <TabStack.Navigator
    tabBar={(props): ReactNode => {
      // @ts-ignore
      return <TabBar {...props} />;
    }}
  >
    <TabStack.Screen name="Home" component={Home} />
    <TabStack.Screen name="Account" component={Account} />
  </TabStack.Navigator>
);

const Child: FC<ChildNavigationProps> = () => {
  return (
    <ChildStack.Navigator headerMode="none">
      <ChildStack.Screen name="HomeStack" component={HomeStack} />
      {/* Profile */}
      <ChildStack.Screen name="MyProfile" component={MyProfile} />
      <ChildStack.Screen name="MyProfileEdit" component={MyProfileEdit} />
      {/* Post */}
      <ChildStack.Screen name="CreatePost" component={CreatePost} />
      {/* Account */}
      <ChildStack.Screen name="Notifications" component={MyProfile} />
      <ChildStack.Screen name="Help" component={MyProfile} />
      <ChildStack.Screen name="Security" component={MyProfile} />
      <ChildStack.Screen name="CommunityGuidelines" component={MyProfile} />
      <ChildStack.Screen name="PrivacyPolicy" component={MyProfile} />
    </ChildStack.Navigator>
  );
};

const Parent: FC<parentNavigationProps> = () => {
  return (
    <>
      <ParentStack.Navigator
        mode="modal"
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: 'transparent',
          },
        }}
      >
        <ParentStack.Screen name="Child" component={Child} />
        <ParentStack.Screen name="Menu" component={Menu} />
        <ParentStack.Screen name="CreateCamera" component={CreateCamera} />
        <ParentStack.Screen name="UserCamera" component={UserCamera} />
        <ParentStack.Screen name="Search" component={Search} />
      </ParentStack.Navigator>
    </>
  );
};

export default Parent;
