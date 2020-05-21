import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import OnboardingScreen from './components/OnboardingScreen';
import { OnboardingRootNavigationProp } from './OnboardingRoot';

import { useUpdatePagerMutation, useUpdatePullModalMutation } from '../generated/graphql';

const Onboarding4: FC = () => {
  const navigation = useNavigation<OnboardingRootNavigationProp>();
  const [updatePullModal] = useUpdatePullModalMutation();
  const [updatePager] = useUpdatePagerMutation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updatePullModal({
        variables: { input: { visible: false } },
      });

      updatePager({
        variables: { input: { activeIndex: 2, count: 4, visible: true } },
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <OnboardingScreen
      title="Your secret is safe"
      heading="Grapple has spoof mode to stop your partner from finding out    "
      subheading="Your safety is important to us"
    />
  );
};

export default Onboarding4;
