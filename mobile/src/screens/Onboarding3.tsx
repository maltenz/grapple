import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import OnboardingScreen from './components/OnboardingScreen';
import { OnboardingRootNavigationProp } from './OnboardingRoot';
import { storeLayout } from '../store';

const Onboarding3: FC = () => {
  const navigation = useNavigation<OnboardingRootNavigationProp>();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(storeLayout.updatePager({ activeIndex: 1, count: 4, visible: true }));
      dispatch(storeLayout.setPullModalVisibilty(false));
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
