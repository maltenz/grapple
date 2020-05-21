import React, { FC, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useMutation } from '@apollo/react-hooks';

import OnboardingScreen from './components/OnboardingScreen';
import { OnboardingRootNavigationProp } from './OnboardingRoot';

import { UPDATE_PULL_MODAL_VIS } from '../mutations/modal';

import { useUpdatePagerMutation } from '../generated/graphql';

const Onboarding2: FC = () => {
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
        variables: { input: { activeIndex: 0, count: 4, visible: true } },
      });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <OnboardingScreen
        title="Find your voice"
        heading="Whether you just want to talk, or find a away out"
        subheading="There are women who you can trust and can help you"
      />
    </>
  );
};

export default Onboarding2;
