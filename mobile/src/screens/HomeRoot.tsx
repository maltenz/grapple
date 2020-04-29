/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, Fragment, FC } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

import {
  Panel,
  SvgIconHome,
  SvgIconAccount,
  SvgTabbarBackgroundHeight,
  Navigation,
  NavigationIcon,
  TabbarBackground,
  TabbarCircleButton,
} from '../components';
import HomeMenu from './components/HomeMenu';
import Home from './Home';
import { AppStackParamList } from './AppRoot';
import OnboardingRoot from './OnboardingRoot';

type ScreenNavigationProp = StackNavigationProp<AppStackParamList, 'HomeRoot'>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type HomeRootProps = NavProps;

export type HomeRootParamList = {
  Home: undefined;
  Menu: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator();

interface MyTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const MyTabBar: FC<MyTabBarProps> = ({ state, descriptors, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
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
                    onPress={(): void => setModalVisible(true)}
                    onLongPress={onLongPress}
                  />
                </Panel>
              )}
            </Fragment>
          );
        })}
      </View>
      <HomeMenu onOpenClose={(): void => setModalVisible(!modalVisible)} isOpen={modalVisible} />
    </>
  );
};

const HomeRoot: FC<HomeRootProps> = ({ navigation }) => {
  return (
    <>
      <Navigation
        mode="day"
        Left={
          <NavigationIcon
            mode="day"
            type="search"
            onPress={(): void => navigation.navigate('CreateRoot')}
          />
        }
        Right={<NavigationIcon mode="day" type="chat" onPress={(): void => Alert.alert('test')} />}
      />
      <Tab.Navigator tabBar={(props): React.ReactNode => <MyTabBar {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Account" component={OnboardingRoot} />
      </Tab.Navigator>
    </>
  );
};

export default HomeRoot;
