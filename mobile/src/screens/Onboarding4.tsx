import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';
import OnboardingScreen from './components/OnboardingScreen';
import { OnboardingRootNavigationProp } from './OnboardingRoot';

import { UPDATE_PULL_MODAL_VIS } from '../mutations/modal';
import { useUpdatePagerMutation } from '../generated/graphql';

const Onboarding4: FC = () => {
  const navigation = useNavigation<OnboardingRootNavigationProp>();
  const [updatePullModalVisibilty] = useMutation(UPDATE_PULL_MODAL_VIS);
  const [updatePager] = useUpdatePagerMutation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updatePullModalVisibilty({
        variables: {
          visible: false,
        },
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
