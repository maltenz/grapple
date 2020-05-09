import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import OnboardingScreen from './components/OnboardingScreen';
import { OnboardingRootNavigationProp } from './OnboardingRoot';
import { storeLayout } from '../store';

const Onboarding4: FC = () => {
  const navigation = useNavigation<OnboardingRootNavigationProp>();
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(storeLayout.updatePager({ activeIndex: 2, count: 4, visible: true }));
      dispatch(storeLayout.setPullModalVisibilty(false));
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
