import React, { FC, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useDispatch } from 'react-redux';
import OnboardingScreen from './components/OnboardingScreen';
import { OnboardingRootNavigationProp } from './OnboardingRoot';

import { updatePager, updateModal } from '../store';

const Onboarding2: FC = () => {
  const navigation = useNavigation<OnboardingRootNavigationProp>();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(updateModal({ visible: false }));
      dispatch(
        updatePager({
          activeIndex: 0,
          count: 4,
          visible: true,
        })
      );
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
