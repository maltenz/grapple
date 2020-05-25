import React, { FC, useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Navigation, NavigationIcon } from '../assets';
import { ParentNavigationProp } from './HomeRoot';
import { NavigationHeading } from '../assets/components/base/Navigation';
import SegmentedController from '../assets/components/core/SegmentedControl';

const CreatePost: FC = ({ children }) => {
  const parentNavigation = useNavigation<ParentNavigationProp>();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <>
      <Navigation
        mode="day"
        Left={<NavigationIcon mode="day" type="image" onPress={(): void => Alert.alert('flash')} />}
        Center={<NavigationHeading mode="day" text="Create" />}
        Right={
          <NavigationIcon
            mode="day"
            type="close"
            onPress={(): void => parentNavigation.navigate('HomeRoot')}
          />
        }
      />
      <SegmentedController
        mode="day"
        onChange={(index): void => setActiveIndex(index)}
        margin
        activeIndex={activeIndex}
        items={[{ title: 'Story' }, { title: 'Incident' }]}
      />
      <ScrollView>{children}</ScrollView>
    </>
  );
};

export default CreatePost;
