import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import OnboardingScreen from './components/OnboardingScreen';
import { OnboardingRootNavigationProp } from './OnboardingRoot';
import { storeTheme } from '../store';

const Onboarding3: FC = () => {
  const navigation = useNavigation<OnboardingRootNavigationProp>();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(storeTheme.updatePager({ activeIndex: 1, count: 3, visible: true }));
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
