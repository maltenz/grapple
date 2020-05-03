import _ from 'lodash';
import React, { FC } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeArea } from 'react-native-safe-area-context';

import {
  Post,
  Color,
  AssetStyles,
  Navigation,
  NavigationIcon,
  SvgTabbarBackgroundHeight,
} from '../components';

import { ParentNavigationProp } from './HomeRoot';

import { NavigationLogo } from '../components/base/Navigation';

const TITLE = 'Why read motivational sayings?';
const CONTENT =
  'For motivation! You might need a bit, if you can use last year’s list of goals this year because it’s as good as new. All of us can benefit from inspirational thoughts, so here are ten great ones.';

const Home: FC = () => {
  const parentNavigation = useNavigation<ParentNavigationProp>();
  const inset = useSafeArea();

  return (
    <>
      <Navigation
        mode="day"
        Left={
          <NavigationIcon
            mode="day"
            type="search"
            onPress={(): void => parentNavigation.navigate('Camera')}
          />
        }
        Center={<NavigationLogo mode="day" />}
        Right={<NavigationIcon mode="day" type="chat" onPress={(): void => Alert.alert('test')} />}
      />
      <ScrollView
        style={[styles.scrollView]}
        contentContainerStyle={{
          paddingBottom: inset.bottom + SvgTabbarBackgroundHeight,
        }}
      >
        {_.times(10, () => (
          <Post key={_.uniqueId('id_')} gutter title={TITLE} content={CONTENT} />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Color.grey4,
    paddingTop: AssetStyles.measure.space,
  },
});

export default Home;
