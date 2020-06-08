import React, { FC, useEffect } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeArea } from 'react-native-safe-area-context';

import { useQuery } from '@apollo/react-hooks';

import { GET_POSTS } from '../queries/post';

import { Post as PostType } from '../generated/graphql';

import {
  Color,
  AssetStyles,
  Navigation,
  NavigationIcon,
  SvgTabbarBackgroundHeight,
} from '../assets';

import Post from './components/Post';

import { ParentNavigationProp } from './HomeRoot';
import { NavigationLogo } from '../assets/components/base/Navigation';

const Home: FC = () => {
  const parentNavigation = useNavigation<ParentNavigationProp>();
  const inset = useSafeArea();
  const { data, refetch } = useQuery(GET_POSTS);

  useEffect(() => {
    const unsubscribe = parentNavigation.addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, [parentNavigation]);

  return (
    <>
      <Navigation
        mode="day"
        Left={
          <NavigationIcon
            mode="day"
            type="search"
            onPress={(): void => parentNavigation.navigate('Search')}
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
        {data?.posts.map((post: PostType) => {
          return (
            <Post
              key={post.id as string}
              id={post.id as string}
              user={post.user}
              shots={post.shots}
              liked={post.liked}
              bookmarked={post.bookmarked}
              gutter
            />
          );
        })}
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
