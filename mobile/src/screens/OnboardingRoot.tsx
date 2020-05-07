import React, { FC, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { useSafeArea } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Onboarding1 from './Onboarding1';
import Onboarding2 from './Onboarding2';
import Onboarding3 from './Onboarding3';
import Onboarding4 from './Onboarding4';
import Onboarding5 from './Onboarding5';
import { AppRootParamList } from './AppRoot';
import PullModal from './components/PullModal';
import { Button, Panel, TextInput, Text, BulletPager, AssetStyles } from '../components';
import { storeTheme } from '../store';

export type OnboardingRootParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  Onboarding4: undefined;
  Onboarding5: undefined;
};

type OnboardingRootRouteProp = RouteProp<OnboardingRootParamList, 'Onboarding1'>;

export type OnboardingRootNavigationProp = CompositeNavigationProp<
  StackNavigationProp<OnboardingRootParamList>,
  StackNavigationProp<AppRootParamList>
>;

type MyOnboardingRootNavigationProp = StackNavigationProp<OnboardingRootParamList, 'Onboarding1'>;

type NavigationProps = {
  route: OnboardingRootRouteProp;
  navigation: MyOnboardingRootNavigationProp;
};

const Stack = createMaterialTopTabNavigator();

const OnboardingRoot: FC<NavigationProps> = () => {
  const inset = useSafeArea();
  const pagerStore = useSelector(storeTheme.pagerSelector);
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');

  const BULLET_TOP =
    AssetStyles.measure.window.height - inset.bottom - AssetStyles.measure.space * 2;

  return (
    <>
      <Stack.Navigator
        tabBarOptions={{
          style: {
            display: 'none',
          },
        }}
      >
        <Stack.Screen name="onboarding1" component={Onboarding1} />
        <Stack.Screen name="onboarding2" component={Onboarding2} />
        <Stack.Screen name="onboarding3" component={Onboarding3} />
        <Stack.Screen name="onboarding4" component={Onboarding4} />
        <Stack.Screen name="onboarding5" component={Onboarding5} />
      </Stack.Navigator>
      <BulletPager
        mode="day"
        count={pagerStore.count}
        activeIndex={pagerStore.activeIndex}
        center
        style={[styles.pager, { top: BULLET_TOP }]}
      />

      <PullModal>
        <Panel marginHorizontal>
          <Panel row marginBottom={1.5}>
            <Button
              mode="day"
              appearance="strong"
              type="normal"
              marginRight={0.5}
              style={{ flex: 1 }}
            >
              Login
            </Button>
            <Button
              mode="day"
              appearance="strong"
              type="normal"
              outline
              marginLeft={0.5}
              style={{ flex: 1 }}
            >
              Register
            </Button>
          </Panel>
          <TextInput
            mode="day"
            value={emailValue}
            placeholder="Email"
            onChangeText={(value): void => setEmailValue(value)}
            marginBottom
          />
          <TextInput
            mode="day"
            value={passwordValue}
            placeholder="Password"
            onChangeText={(value): void => setPasswordValue(value)}
          />
          <Text
            mode="day"
            appearance="heavy"
            type="small"
            bold
            marginTop
            textAlign="right"
            style={{ width: '100%' }}
            marginBottom={2}
          >
            Forgot password
          </Text>
          <Button mode="day" appearance="strong" type="large">
            Submit
          </Button>
        </Panel>
      </PullModal>
    </>
  );
};

const styles = StyleSheet.create({
  pager: {
    position: 'absolute',
    zIndex: 11,
    right: 0,
    left: 0,
  },
});

export default OnboardingRoot;
