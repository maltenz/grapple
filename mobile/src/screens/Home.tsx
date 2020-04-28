/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, Fragment, FC } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navigation, { NavigationIcon } from '../components/base/Navigation';
import {
  AssetStyles,
  SvgTabbarBackgroundWidth,
  Color,
  SvgTabbarBackground,
  Panel,
  SvgIconSmallAdd,
  SvgIconHome,
  SvgIconAccount,
  SvgTabbarBackgroundHeight,
} from '../components';
import HomeMenu from './components/HomeMenu';
import HomePosts from './components/HomePosts';

const Home: FC = () => <HomePosts />;
const AccountDummyScreen: FC = () => <Panel flex={1} backgroundColor="blue" />;

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
        <SvgTabbarBackground style={styles.tabbar} />

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
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityStates={isFocused ? ['selected'] : []}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    onPress={(): void => setModalVisible(true)}
                    onLongPress={onLongPress}
                    style={styles.circle}
                  >
                    <SvgIconSmallAdd color="white" scale={1.25} />
                  </TouchableOpacity>
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

const HomeScreen: FC = () => {
  return (
    <>
      <Navigation
        mode="day"
        Left={<NavigationIcon mode="day" type="search" onPress={(): void => Alert.alert('test')} />}
        Right={<NavigationIcon mode="day" type="chat" onPress={(): void => Alert.alert('test')} />}
      />
      <Tab.Navigator tabBar={(props): React.ReactNode => <MyTabBar {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Account" component={AccountDummyScreen} />
      </Tab.Navigator>
    </>
  );
};

const CIRCLE_DIAMETER = AssetStyles.measure.circle.large.size;

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    zIndex: 0,
    bottom: 0,
    left: -SvgTabbarBackgroundWidth / 2 + AssetStyles.measure.window.width / 2,
    ...AssetStyles.shadow.deep,
  },
  circle: {
    width: CIRCLE_DIAMETER,
    height: CIRCLE_DIAMETER,
    borderRadius: CIRCLE_DIAMETER / 2,
    backgroundColor: Color.red,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -AssetStyles.measure.space * 2,
    ...AssetStyles.shadow.deep,
    shadowColor: Color.red,
  },
});

export default HomeScreen;
