import _ from 'lodash';
import React, { FC, useState } from 'react';
import { ScrollView, Alert, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeArea } from 'react-native-safe-area-context';
import {
  Navigation,
  NavigationIcon,
  AssetStyles,
  PostsEditItemType,
  Button,
  BulletPager,
  Panel,
  Gallery,
  PostContentHeader,
  PostContent,
} from '../components';

import { CreateRootParamList } from './CreateRoot';

type ScreenNavigationProp = StackNavigationProp<CreateRootParamList, 'MyPost'>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type MyPostProps = NavProps;

const TITLE = 'Why read motivational sayings?';
const CONTENT =
  'For motivation! You might need a bit, if you can use last year’s list of goals this year because it’s as good as new. All of us can benefit from inspirational thoughts, so here are ten great ones.';

const POSTS_ITEM = {
  src: {
    thumbnail: { uri: 'https://source.unsplash.com/random' },
    large: { uri: 'https://source.unsplash.com/random' },
  },
};

const POSTS: PostsEditItemType[] = [
  {
    ...POSTS_ITEM,
    title: TITLE,
    content: CONTENT,
    id: '123',
  },
  {
    ...POSTS_ITEM,
    title: TITLE,
    content: CONTENT,
    id: '231',
  },
  {
    ...POSTS_ITEM,
    title: TITLE,
    content: CONTENT,
    id: '535',
  },
  {
    ...POSTS_ITEM,
    title: TITLE,
    content: CONTENT,
    id: '532',
  },
  {
    ...POSTS_ITEM,
    title: TITLE,
    content: CONTENT,
    id: '523',
  },
];

const MyPost: FC<MyPostProps> = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const inset = useSafeArea();

  return (
    <>
      <Navigation
        mode="day"
        Left={
          <NavigationIcon
            mode="day"
            type="search"
            onPress={(): void => navigation.navigate('Camera')}
          />
        }
        Right={<NavigationIcon mode="day" type="chat" onPress={(): void => Alert.alert('test')} />}
      />
      <ScrollView style={styles.scrollView}>
        <Gallery
          type="feature"
          mode="day"
          utility="delete"
          src={POSTS[activeIndex].src.large}
          items={POSTS}
          key={_.uniqueId('id_')}
          onChange={(id, index): void => setActiveIndex(index)}
          activeIndex={activeIndex}
          gutter
        />
      </ScrollView>
      <Panel
        paddingTop
        paddingHorizontal
        style={{ paddingBottom: AssetStyles.measure.space + inset.bottom }}
        backgroundColor="white"
      >
        <PostContentHeader title="Story" date={new Date()} />
        <PostContent title={TITLE} content={CONTENT} />
        <Button type="large" appearance="normal" mode="day" marginVertical>
          Publish
        </Button>
        <BulletPager count={POSTS.length} activeIndex={activeIndex} mode="day" center />
      </Panel>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: AssetStyles.measure.space,
  },
});

export default MyPost;
