import React, { FC, useState } from 'react';
import { ScrollView, Alert, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeArea } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
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
  Color,
  ThumbnailDimension,
} from '../components';

import { CreateRootParamList } from './CreateRoot';
import Text from '../components/core/Text';
import { ButtonLargeHeight } from '../components/core/Button';
import { BulletDimension } from '../components/core/Bullet';

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

  const FOOTER_HEIGHT =
    ButtonLargeHeight + BulletDimension + AssetStyles.measure.space + inset.bottom;
  const FOOTER_PADDING_HEIGHT = FOOTER_HEIGHT + AssetStyles.measure.space;
  const THUMBNAIL_HEIGHT = ThumbnailDimension + AssetStyles.measure.space;

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
        style={{ backgroundColor: Color.white }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Image style={[styles.heroImage]} source={POSTS_ITEM.src.large} />
        <ScrollView
          contentContainerStyle={{
            paddingTop: AssetStyles.measure.window.width,
            paddingBottom: FOOTER_PADDING_HEIGHT + THUMBNAIL_HEIGHT,
          }}
        >
          <Gallery
            type="row"
            mode="day"
            utility="delete"
            src={POSTS[activeIndex].src.large}
            items={POSTS}
            onChange={(id, index): void => setActiveIndex(index)}
            activeIndex={activeIndex}
            style={{ marginTop: -THUMBNAIL_HEIGHT }}
          />
          <Panel paddingHorizontal paddingTop backgroundColor="white">
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
            <PostContentHeading title="Easter Holidays" autoCorrect={false} edit />
            <PostContent title={TITLE} content={CONTENT} />
          </Panel>
          <Panel
            backgroundColor="white"
            style={[
              styles.backgroundBug,
              {
                height: 500,
                marginBottom: -500,
              },
            ]}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <Panel
        style={[
          styles.footer,
          { height: FOOTER_HEIGHT, paddingBottom: AssetStyles.measure.space + inset.bottom },
        ]}
        paddingHorizontal
      >
        <LinearGradient
          colors={['rgba(255,255,255,0)', Color.white]}
          style={styles.linearGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.5 }}
        />
        <Button type="large" appearance="normal" mode="day" marginBottom style={{ marginTop: 0 }}>
          Publish
        </Button>
        <BulletPager count={POSTS.length} activeIndex={activeIndex} mode="day" center />
      </Panel>
    </>
  );
};

const styles = StyleSheet.create({
  heroImage: {
    width: AssetStyles.measure.window.width,
    height: AssetStyles.measure.window.width,
    position: 'absolute',
  },
  footer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  backgroundBug: {},
});

export default MyPost;
