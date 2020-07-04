/* eslint-disable no-param-reassign */
import React, { FC, useState, ReactNode } from 'react';

import { Image, StyleSheet, View, Keyboard } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { useMutation } from '@apollo/react-hooks';

import {
  Navigation,
  NavigationIcon,
  AssetStyles,
  Panel,
  Color,
  SegmentedController,
  Button,
  UploadImage,
  Text,
  Overlay,
} from '../assets';

import { NavigationHeading } from '../assets/components/base/Navigation';

import Post from './components/Post';

import { createShotsSelector, clearAllShot } from '../store';

import { ParentNavigationProp, ChildNavigationProp } from './HomeRoot';

import { Shot, Post as PostType } from '../generated/graphql';
import { CREATE_POST } from '../mutations/post';

import CreatePostForm from './components/CreatePostForm';
import LoadingScreen from './components/LoadingScreen';

const WIDTH = AssetStyles.measure.window.width;
const SPACE = AssetStyles.measure.space;

const CreatePost: FC = () => {
  const parentNavigation = useNavigation<ParentNavigationProp>();
  const navigation = useNavigation<ChildNavigationProp>();
  const dispatch = useDispatch();
  const [createPost] = useMutation<{ createPost: PostType }>(CREATE_POST);
  const inset = useSafeArea();
  const shots = useSelector(createShotsSelector);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean | 'complete'>(false);
  const [result, setResult] = useState<PostType>();

  const handleCreatePost = async (): Promise<void> => {
    Keyboard.dismiss();
    setUploading(true);
    const newShots: Shot[] = [...shots];

    await Promise.all(
      shots.map(async ({ image }, index) => {
        return new Promise((resolve) => {
          if (image) {
            UploadImage({
              image,
              onComplete: (res) => {
                newShots[index].image = res;
                resolve();
              },
            });
          } else {
            resolve();
          }
        });
      })
    );

    await newShots.forEach((shot) => {
      delete shot.id;
    });

    try {
      const res = await createPost({ variables: { shots: newShots } });
      const myPost = res?.data?.createPost as PostType;

      if (myPost) {
        setResult(myPost);
      }
    } catch (error) {
      throw new Error();
    }
    setUploading('complete');
  };

  const localShots = [...shots];

  return (
    <>
      <Navigation
        mode="day"
        Left={
          <NavigationIcon
            mode="day"
            type="image"
            onPress={(): void => parentNavigation.navigate('CreateCamera')}
          />
        }
        Center={<NavigationHeading mode="day" text="Create" />}
        Right={
          <NavigationIcon
            mode="day"
            type="close"
            onPress={(): void => navigation.navigate('HomeStack')}
          />
        }
      />
      <KeyboardAwareScrollView extraHeight={150} style={[styles.scrollview]}>
        <SegmentedController
          mode="day"
          onChange={(index): void => setActiveIndex(index)}
          margin
          activeIndex={activeIndex}
          items={[{ title: 'Story' }, { title: 'Incident' }]}
        />
        {localShots.map(
          (shot: Shot, index: number): ReactNode => {
            const { id, content, image } = shot;

            return (
              <Panel marginBottom key={id || index}>
                {image && (
                  <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${image}` }} />
                )}
                <Panel marginHorizontal>
                  <CreatePostForm
                    shot={shot}
                    index={index}
                    visible={index === 0 || !!content}
                    expandable={index !== 0}
                  />
                </Panel>
              </Panel>
            );
          }
        )}
        <Button
          onPress={handleCreatePost}
          marginHorizontal
          type="large"
          mode="day"
          appearance="strong"
        >
          Submit
        </Button>
        <View style={{ height: inset.bottom + AssetStyles.measure.space }} />
      </KeyboardAwareScrollView>
      {uploading === true && <LoadingScreen />}
      {uploading === 'complete' && (
        <Overlay paddingHorizontal={0} type="page">
          <KeyboardAwareScrollView extraHeight={150}>
            <Text
              type="h2"
              appearance="normal"
              mode="night"
              regular
              textAlign="center"
              marginBottom={2}
              marginTop
            >
              Thanks for sharing!
            </Text>
            {result && (
              <Post
                key={result.id as string}
                id={result.id as string}
                user={result.user}
                shots={result.shots}
                liked={result.liked}
                bookmarked={result.bookmarked}
                gutter
              />
            )}
          </KeyboardAwareScrollView>
          <Button
            onPress={(): void => {
              dispatch(clearAllShot());
              navigation.navigate('HomeStack');
            }}
            marginTop
            marginHorizontal
            type="large"
            mode="day"
            appearance="strong"
          >
            Continue
          </Button>
        </Overlay>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    backgroundColor: Color.white,
  },
  image: {
    width: WIDTH,
    height: WIDTH,
    marginBottom: SPACE / 2,
  },
});

export default CreatePost;
