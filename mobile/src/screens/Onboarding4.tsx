import React, { FC } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import OnboardingScreen from './components/OnboardingScreen';
import { OnboardingRootParamList } from './OnboardingRoot';

type ScreenNavigationProp = StackNavigationProp<OnboardingRootParamList>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type Onboarding4Props = NavProps;

const OnboardingScreen4: FC<Onboarding4Props> = () => (
  <OnboardingScreen
    title="Your secret is safe"
    heading="Grapple has spoof mode to stop your partner from finding out    "
    subheading="Your safety is important to us"
  />
);

export default OnboardingScreen4;
