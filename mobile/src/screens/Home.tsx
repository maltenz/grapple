import React, { FC, useEffect } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeArea } from 'react-native-safe-area-context';

import { useQuery } from '@apollo/react-hooks';
import { GET_POSTS } from '../queries/post';

import {
  Post,
  Color,
  AssetStyles,
  Navigation,
  NavigationIcon,
  SvgTabbarBackgroundHeight,
} from '../assets';

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
        {
          // @ts-ignore
          data?.posts.map((post) => {
            return <Post key={post.id} gutter post={post} />;
          })
        }
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
