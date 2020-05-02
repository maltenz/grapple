/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, FC } from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
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

type ScreenNavigationProp = StackNavigationProp<AppRootParamList, 'HomeRoot'>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type HomeRootProps = NavProps;

export type HomeRootParamList = {
  Home: undefined;
  Account: undefined;
};

export type HomeRootNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeRootParamList>,
  StackNavigationProp<AppRootParamList>
>;

const Tab = createBottomTabNavigator();

interface MyTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const MyTabBar: FC<MyTabBarProps> = ({ state, descriptors, navigation }) => {
  const myNavigation = useNavigation<HomeRootNavigationProp>();

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
                    onPress={(): void => myNavigation.navigate('MainMenuRoot')}
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

const HomeRoot: FC<HomeRootProps> = () => (
  <>
    <Tab.Navigator tabBar={(props): React.ReactNode => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Account" component={AccountRoot} />
    </Tab.Navigator>
  </>
);

export default HomeRoot;
