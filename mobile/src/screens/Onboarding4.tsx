import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { useMutation } from '@apollo/react-hooks';
import { layoutActions } from '../store';

import OnboardingScreen from './components/OnboardingScreen';
import { OnboardingRootNavigationProp } from './OnboardingRoot';
import { UPDATE_PULL_MODAL_VIS } from '../mutations/modal';

const Onboarding4: FC = () => {
  const navigation = useNavigation<OnboardingRootNavigationProp>();
  const [updatePullModalVisibilty] = useMutation(UPDATE_PULL_MODAL_VIS);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(layoutActions.updatePager({ activeIndex: 2, count: 4, visible: true }));
      updatePullModalVisibilty({
        variables: {
          visible: false,
        },
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
