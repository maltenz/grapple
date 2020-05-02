import React, { FC } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import OnboardingScreen from './components/OnboardingScreen';
import { AppRootParamList } from './AppRoot';

type ScreenNavigationProp = StackNavigationProp<AppRootParamList, 'MainMenu'>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type MainMenuProps = NavProps;

const MainMenu: FC<MainMenuProps> = () => (
  <>
    <StatusBar barStyle="dark-content" />
    <OnboardingScreen
      title="Find your voice"
      heading="Whether you just want to talk, or find a away out"
      subheading="There are women who you can trust and can help you"
    />
  </>
);

export default MainMenu;
