import React, { FC } from 'react';
import { StatusBar } from 'react-native';
import OnboardingScreen from './components/OnboardingScreen';

const Onboarding2: FC = () => (
  <>
    <StatusBar barStyle="dark-content" />
    <OnboardingScreen
      title="Find your voice"
      heading="Whether you just want to talk, or find a away out"
      subheading="There are women who you can trust and can help you"
    />
  </>
);

export default Onboarding2;
