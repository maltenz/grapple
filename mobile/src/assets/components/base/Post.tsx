/* eslint-disable @typescript-eslint/no-empty-function */
import _ from 'lodash';
import React, { FC, useState, useEffect } from 'react';
import {
  StyleSheet,
  ImageBackground,
  StyleProp,
  ViewStyle,
  ImageStyle,
  LayoutAnimation,
  Animated,
} from 'react-native';

import { useMutation } from '@apollo/react-hooks';

import Emoji from 'react-native-emoji';

import PostNavbar, { PostNavbarItem } from './PostNavbar';
import PostContent from './PostContent';
import { AssetStyles } from '../../styles';
import Panel from './Panel';
import PullBar from './PullBar';
import NavBarUser from './NavBarUser';

import { Post as PostType, Shot as ShotType } from '../../../generated/graphql';
import { Color } from '../../colors';
import {
  LIKE_POST,
  UNLIKE_POST,
  BOOKMARK_POST,
  REMOVE_BOOKMARK_POST,
} from '../../../mutations/post';

const POST_USER_IMAGE_SAMPLE = { uri: 'https://source.unsplash.com/120x120' };

interface PostProps extends PostType {
  gutter?: boolean;
  style?: StyleProp<ViewStyle>;
}

interface ShotProps extends ShotType {
  featureStyles?: StyleProp<ImageStyle>;
  feautureHeight: number;
  postId?: string;
  liked?: boolean;
  bookmarked?: boolean;
  index: number;
}

interface IconProps {
  feautureHeight: number;
  active: boolean;
  index: number;
  name: string;
}

const HEART_WIDTH = 80;
const HEART_SIZE = HEART_WIDTH - 10;
const TOTAL = 9;
const BORDER_WIDTH = 2;
const WINDOW_SIZE = AssetStyles.measure.window.width;
const DUR = 3000;
const TOL = 2000;
const DELAY = 1000;

const randomDelay = (): number => Math.floor(Math.random() * DELAY);
const randomDuration = (): number => Math.floor(Math.random() * (DUR - TOL + 1) + TOL);
const randomX = (): number => Math.floor(Math.random() * 60) + 1 - 30;

const Icon: FC<IconProps> = ({ feautureHeight, active, index, name }) => {
  const [anim] = useState<Animated.Value>(new Animated.Value(0));
  const [left, setLeft] = useState<number>(0);
  const [fontSize] = useState(
    Math.floor(Math.random() * (HEART_SIZE - HEART_SIZE / 3 + 1) + HEART_SIZE / 3)
  );
  const [delay, setDelay] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    setDuration(randomDuration());
    setDelay(randomDelay());
    switch (index) {
      case 0:
      case 3:
      case 6:
        setLeft(randomX() + HEART_WIDTH / 2);
        break;
      case 1:
      case 4:
      case 7:
        setLeft(randomX() + feautureHeight / 2 - HEART_WIDTH / 2);
        break;
      case 2:
      case 5:
      case 8:
        setLeft(randomX() + feautureHeight - HEART_WIDTH);
        break;
      default:
    }
  }, []);

  useEffect(() => {
    if (active) {
      Animated.timing(anim, {
        toValue: 1,
        duration,
        delay,
      }).start(() => {
        anim.setValue(0);
      });
    }
  }, [active]);

  const interpolate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -(feautureHeight + HEART_WIDTH * 2)],
  });

  return (
    <Animated.View
      style={[
        styles.heartContainer,
        {
          left,
          transform: [{ translateY: interpolate }],
        },
      ]}
    >
      <Emoji name={name} style={{ fontSize }} />
    </Animated.View>
  );
};

const Shot: FC<ShotProps> = ({
  image,
  title,
  content,
  featureStyles,
  feautureHeight,
  postId,
  liked: propLiked,
  bookmarked: propBookmarked,
  index,
}) => {
  const [likePost] = useMutation(LIKE_POST);
  const [unlikePost] = useMutation(UNLIKE_POST);
  const [bookmarkPost] = useMutation(BOOKMARK_POST);
  const [removeBookmarkPost] = useMutation(REMOVE_BOOKMARK_POST);
  const [animList] = useState<number[]>(_.times(TOTAL, (listIndex) => listIndex));
  const [liked, setLiked] = useState<boolean>(propLiked as boolean);
  const [bookmarked, setBookmarked] = useState<boolean>(propBookmarked as boolean);
  const [name, setName] = useState<'heart' | 'broken_heart'>(liked ? 'heart' : 'broken_heart');
  const [animate, setAnimate] = useState<boolean>(false);

  const handleLike = (): void => {
    if (liked) {
      unlikePost({ variables: { id: postId } });
      setName('broken_heart');
      setLiked(false);
    } else {
      likePost({ variables: { id: postId } });
      setName('heart');
      setLiked(true);
    }
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 4000);
  };

  const handleBookmark = (): void => {
    if (bookmarked) {
      removeBookmarkPost({ variables: { id: postId } });
      setBookmarked(false);
    } else {
      bookmarkPost({ variables: { id: postId } });
      setBookmarked(true);
    }
  };

  return (
    <>
      <ImageBackground
        source={{ uri: image as string }}
        resizeMode="cover"
        style={[styles.image, featureStyles]}
      >
        {index === 0 && (
          <NavBarUser
            userType="approved"
            name="Malte Boeing"
            src={POST_USER_IMAGE_SAMPLE}
            mode="day"
          />
        )}
        {animList.map((item) => (
          <Icon
            key={item}
            index={item}
            name={name}
            feautureHeight={feautureHeight}
            active={animate}
          />
        ))}
      </ImageBackground>
      <Panel marginVertical={0.5} marginRight={0.5} marginLeft={0.5}>
        {index === 0 && (
          <PostNavbar
            Icons={
              <>
                <Panel flex={1} row>
                  <PostNavbarItem type="like" onPress={handleLike} marginRight active={liked} />
                  <PostNavbarItem
                    type="comment"
                    marginRight
                    onPress={(): void => {}}
                    active={false}
                  />
                  <PostNavbarItem
                    type="share"
                    marginRight
                    onPress={(): void => {}}
                    active={false}
                  />
                </Panel>
                <PostNavbarItem type="bookmark" onPress={handleBookmark} active={bookmarked} />
              </>
            }
          />
        )}
        <PostContent title={title as string} content={content as string} />
      </Panel>
    </>
  );
};

const Post: FC<PostProps> = ({ gutter, style, shots, id, liked, bookmarked }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleVisible = (): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setVisible(!visible);
  };

  const FEATURE_SIZE = !gutter
    ? WINDOW_SIZE
    : WINDOW_SIZE - AssetStyles.measure.space * 2 - BORDER_WIDTH * 2;

  const featureStyles = {
    width: FEATURE_SIZE,
    height: FEATURE_SIZE,
  };

  return (
    <Panel
      marginHorizontal={gutter}
      marginBottom
      backgroundColor="white"
      activeOpacity={1}
      style={[styles.container, style]}
    >
      <Shot
        key={shots[0]?.id as string}
        index={0}
        postId={id as string}
        image={shots[0]?.image as string}
        title={shots[0]?.title as string}
        content={shots[0]?.content as string}
        featureStyles={featureStyles}
        feautureHeight={FEATURE_SIZE}
        liked={liked}
        bookmarked={bookmarked}
      />
      {visible && shots.length > 1 && (
        <>
          {shots.map((shot, index) => {
            if (index > 0) {
              return (
                <Shot
                  key={shot?.id as string}
                  index={index}
                  image={shot?.image as string}
                  title={shot?.title as string}
                  content={shot?.content as string}
                  featureStyles={featureStyles}
                  feautureHeight={FEATURE_SIZE}
                />
              );
            }
            return null;
          })}
        </>
      )}
      {shots.length > 1 && <PullBar mode="day" marginBottom={0.5} onPress={handleVisible} />}
    </Panel>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'transparent',
  },
  image: {
    padding: AssetStyles.measure.space / 2,
    backgroundColor: Color.grey,
    overflow: 'hidden',
  },
  heartContainer: {
    position: 'absolute',
    bottom: -HEART_WIDTH,
  },
});

export default Post;
