import React, { FC } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import OnboardingScreen from './components/OnboardingScreen';
import { OnboardingRootParamList } from './OnboardingRoot';

type ScreenNavigationProp = StackNavigationProp<OnboardingRootParamList, 'Onboarding2'>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type Onboarding2Props = NavProps;

const OnboardingScreen2: FC<Onboarding2Props> = () => (
  <OnboardingScreen
    title="Find your voice"
    heading="Whether you just want to talk, or find a away out"
    subheading="There are women who you can trust and can help you"
  />
);

export default OnboardingScreen2;
