import _ from 'lodash';
import React, { FC, useState } from 'react';
import { ScrollView, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
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
  PostContentHeading,
  SvgIconEdit,
} from '../components';

import { CreateRootParamList } from './CreateRoot';
import Text from '../components/core/Text';

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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
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
          style={{
            paddingBottom: AssetStyles.measure.space + inset.bottom,
            bottom: 0,
          }}
          backgroundColor="white"
        >
          <PostContentHeader
            title="Story"
            date={new Date()}
            Right={
              <Panel row alignItems="center">
                <Text type="small" marginRight={0.25}>
                  Edit
                </Text>
                <SvgIconEdit scale={0.9} />
              </Panel>
            }
          />
          <PostContentHeading title="Easter Holidays" edit />
          <PostContent title={TITLE} content={CONTENT} />
          <Button type="large" appearance="normal" mode="day" marginVertical>
            Publish
          </Button>
          <BulletPager count={POSTS.length} activeIndex={activeIndex} mode="day" center />
        </Panel>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: AssetStyles.measure.space,
  },
});

export default MyPost;
