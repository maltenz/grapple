import _ from 'lodash';
import React, { FC, useState } from 'react';
import { ScrollView, Alert, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Navigation,
  NavigationIcon,
  AssetStyles,
  PostsEditSlider,
  PostsEditItemType,
} from '../components';

import { CreateRootParamList } from './CreateRoot';

type ScreenNavigationProp = StackNavigationProp<CreateRootParamList, 'MyPost'>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type MyPostsProps = NavProps;

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

interface PostEditProps extends MyPostsProps {
  items: PostsEditItemType[];
}

const PostEdit: FC<PostEditProps> = ({ items, navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <PostsEditSlider
      onPressEdit={(): void => navigation.navigate('MyPost')}
      items={items}
      activeIndex={activeIndex}
      onChange={(index): void => setActiveIndex(index)}
    />
  );
};

const MyPosts: FC<MyPostsProps> = ({ navigation }) => {
  return (
    <>
      <Navigation
        mode="day"
        Left={<NavigationIcon mode="day" type="back" onPress={(): void => navigation.goBack()} />}
        Right={<NavigationIcon mode="day" type="chat" onPress={(): void => Alert.alert('test')} />}
      />
      <ScrollView style={styles.scrollView}>
        {_.times(5, () => (
          <PostEdit navigation={navigation} items={POSTS} key={_.uniqueId('id_')} />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: AssetStyles.measure.space,
  },
});

export default MyPosts;
