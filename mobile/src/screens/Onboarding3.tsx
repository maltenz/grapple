import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useMutation } from '@apollo/react-hooks';

// import { UPDATE_PAGER } from '../mutations/pager';

import OnboardingScreen from './components/OnboardingScreen';
import { OnboardingRootNavigationProp } from './OnboardingRoot';

const Onboarding3: FC = () => {
  const navigation = useNavigation<OnboardingRootNavigationProp>();
  // const [updatePager] = useMutation(UPDATE_PAGER);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // updatePager({
      //   variables: {
      //     activeIndex: 1,
      //     count: 4,
      //     visible: true,
      //   },
      // });
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
