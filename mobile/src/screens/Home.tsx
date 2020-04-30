import _ from 'lodash';
import React, { FC } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Post, Color, AssetStyles } from '../components';
import { HomeRootParamList } from './HomeRoot';

type ScreenNavigationProp = StackNavigationProp<HomeRootParamList, 'Home'>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type HomeProps = NavProps;

const TITLE = 'Why read motivational sayings?';
const CONTENT =
  'For motivation! You might need a bit, if you can use last year’s list of goals this year because it’s as good as new. All of us can benefit from inspirational thoughts, so here are ten great ones.';

const Home: FC<HomeProps> = () => {
  return (
    <ScrollView style={styles.scrollView}>
      {_.times(10, () => (
        <Post key={_.uniqueId('id_')} gutter title={TITLE} content={CONTENT} />
      ))}
    </ScrollView>
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
