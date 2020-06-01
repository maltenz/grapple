/* eslint-disable no-param-reassign */
import React, { FC, useState, ReactNode } from 'react';

import { Image, StyleSheet, View, ActivityIndicator } from 'react-native';

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
  SvgLogoGrapple,
  UploadImage,
  Post,
  Text,
} from '../assets';

import { NavigationHeading } from '../assets/components/base/Navigation';

import { createShotsSelector, clearAllShot } from '../store';

import { ParentNavigationProp, ChildNavigationProp } from './HomeRoot';

import { Shot } from '../generated/graphql';
import { CREATE_POST } from '../mutations/post';

import CreatePostForm from './components/CreatePostForm';
import Overlay from './components/Overlay';

const CreatePost: FC = () => {
  const parentNavigation = useNavigation<ParentNavigationProp>();
  const navigation = useNavigation<ChildNavigationProp>();
  const dispatch = useDispatch();
  const [createPost] = useMutation(CREATE_POST);
  const inset = useSafeArea();
  const shots = useSelector(createShotsSelector);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean | 'complete'>(false);

  const handleCreatePost = async (): Promise<void> => {
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

    createPost({ variables: { shots: newShots } });
    setUploading(false);
    setUploading('complete');
  };

  const handleContinue = (): void => {
    dispatch(clearAllShot());
    setUploading(false);
    navigation.navigate('HomeStack');
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
            onPress={(): void => parentNavigation.navigate('Camera')}
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
              <Panel marginBottom key={id}>
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
          Preview
        </Button>
        <View style={{ height: inset.bottom + AssetStyles.measure.space }} />
      </KeyboardAwareScrollView>
      {uploading && (
        <Panel
          style={[StyleSheet.absoluteFill, styles.loaderContainer]}
          center
          backgroundColor="red"
        >
          <ActivityIndicator size="large" color={Color.white} style={styles.activityIndicator} />
          <SvgLogoGrapple color="white" scale={0.65} />
        </Panel>
      )}
      {uploading === 'complete' && (
        <Overlay paddingHorizontal={0} style={[StyleSheet.absoluteFill, styles.overlay]}>
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
            <Post gutter title="Hello world" content="Test one two three" />
          </KeyboardAwareScrollView>
          <Button
            onPress={handleContinue}
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
    width: AssetStyles.measure.window.width,
    height: AssetStyles.measure.window.width,
    marginBottom: AssetStyles.measure.space / 2,
  },
  loaderContainer: {
    zIndex: 10,
    opacity: 0.9,
  },
  activityIndicator: {
    marginBottom: AssetStyles.measure.space * 2,
  },
  overlay: {
    flex: 1,
    zIndex: 3,
  },
});

export default CreatePost;
