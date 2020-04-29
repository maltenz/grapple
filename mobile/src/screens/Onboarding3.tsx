import React, { FC } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import OnboardingScreen from './components/OnboardingScreen';
import { OnboardingRootParamList } from './OnboardingRoot';

type ScreenNavigationProp = StackNavigationProp<OnboardingRootParamList>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type Onboarding3Props = NavProps;

const OnboardingScreen3: FC<Onboarding3Props> = () => (
  <OnboardingScreen
    title="Share your story"
    heading="How have you experienced abuse or inequality?"
    subheading="Every women has a story"
    blobMirrored
  />
);

export default OnboardingScreen3;
