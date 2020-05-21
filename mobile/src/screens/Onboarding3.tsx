import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import OnboardingScreen from './components/OnboardingScreen';
import { OnboardingRootNavigationProp } from './OnboardingRoot';
import { useUpdatePagerMutation } from '../generated/graphql';

const Onboarding3: FC = () => {
  const navigation = useNavigation<OnboardingRootNavigationProp>();
  const [updatePager] = useUpdatePagerMutation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updatePager({
        variables: { input: { activeIndex: 1, count: 4, visible: true } },
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <OnboardingScreen
      title="Share your story"
      heading="How have you experienced abuse or inequality?"
      subheading="Every women has a story"
      blobMirrored
    />
  );
};

export default Onboarding3;
