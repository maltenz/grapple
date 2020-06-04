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

import Emoji from 'react-native-emoji';

import PostNavbar from './PostNavbar';
import PostContent from './PostContent';
import { AssetStyles } from '../../styles';
import Panel from './Panel';
import PullBar from './PullBar';
import NavBarUser from './NavBarUser';

import { Post as PostType, Shot as ShotType } from '../../../generated/graphql';
import { Color } from '../../colors';

const POST_USER_IMAGE_SAMPLE = { uri: 'https://source.unsplash.com/120x120' };

interface PostProps extends PostType {
  gutter?: boolean;
  style?: StyleProp<ViewStyle>;
}

interface ShotProps extends ShotType {
  featureStyles?: StyleProp<ImageStyle>;
  feautureHeight: number;
  index: number;
}

const HEART_WIDTH = 60;
const HEART_SIZE = HEART_WIDTH - 10;
const TOTAL = 9;

interface HeartProps {
  feautureHeight: number;
  active: boolean;
  index: number;
}

const randomDelay = (): number => Math.floor(Math.random() * 1000);
const randomDuration = (): number => Math.floor(Math.random() * (3000 - 2000 + 1) + 2000);
const randomX = (): number => Math.floor(Math.random() * 60) + 1 - 30;

const Heart: FC<HeartProps> = ({ feautureHeight, active, index }) => {
  const [anim] = useState<Animated.Value>(new Animated.Value(0));
  const [left, setLeft] = useState<number>(0);
  const [delay, setDelay] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    switch (index) {
      case 0:
      case 3:
      case 6:
        setLeft(randomX());
        setDuration(randomDuration());
        setDelay(randomDelay());
        break;
      case 1:
      case 4:
      case 7:
        setLeft(randomX() + feautureHeight / 2 - HEART_WIDTH / 2);
        setDuration(randomDuration());
        setDelay(randomDelay());
        break;
      case 2:
      case 5:
      case 8:
        setLeft(randomX() + feautureHeight - HEART_WIDTH * 1);
        setDuration(randomDuration);
        setDelay(randomDelay());
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
      }).start();
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
      <Emoji
        name="heart"
        style={{
          fontSize: Math.floor(Math.random() * (HEART_SIZE - HEART_SIZE / 3 + 1) + HEART_SIZE / 3),
        }}
      />
    </Animated.View>
  );
};

const Shot: FC<ShotProps> = ({ image, title, content, featureStyles, feautureHeight, index }) => {
  const [like, setLike] = useState<boolean>(false);
  const [animList] = useState<number[]>(_.times(TOTAL, (listIndex) => listIndex));

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
          <Heart key={item} index={item} feautureHeight={feautureHeight} active={like} />
        ))}
      </ImageBackground>
      <Panel marginVertical={0.5} marginRight={0.5} marginLeft={0.5}>
        {index === 0 && <PostNavbar onLike={(): void => setLike(!like)} />}
        <PostContent title={title as string} content={content as string} />
      </Panel>
    </>
  );
};

const Post: FC<PostProps> = ({ gutter, style, shots }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleVisible = (): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setVisible(!visible);
  };
  const BORDER_WIDTH = 2;
  const WINDOW_SIZE = AssetStyles.measure.window.width;
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
      style={[style, { borderWidth: 2, borderColor: 'transparent' }]}
    >
      <Shot
        key={shots[0]?.id as string}
        image={shots[0]?.image as string}
        title={shots[0]?.title as string}
        content={shots[0]?.content as string}
        featureStyles={featureStyles}
        index={0}
        feautureHeight={FEATURE_SIZE}
      />
      {visible && shots.length > 1 && (
        <>
          {shots.map((shot, index) => {
            if (index > 0) {
              return (
                <Shot
                  key={shot?.id as string}
                  image={shot?.image as string}
                  title={shot?.title as string}
                  content={shot?.content as string}
                  featureStyles={featureStyles}
                  index={index}
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
