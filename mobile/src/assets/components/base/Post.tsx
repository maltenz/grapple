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
  heroHeight: number;
  index: number;
}

const OFFSET_HEART = 60;

const Shot: FC<ShotProps> = ({
  image: propImage,
  title: propTitle,
  content: propContent,
  featureStyles,
  index,
  heroHeight,
}) => {
  const [image] = useState<string>(propImage as string);
  const [title] = useState<string>(propTitle as string);
  const [content] = useState<string>(propContent as string);
  const [animHeart] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animHeart, {
      toValue: 1,
      duration: 3000,
    }).start();
  }, []);

  const heartInter = animHeart.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -(heroHeight + OFFSET_HEART * 2)],
  });

  return (
    <>
      <ImageBackground
        source={{ uri: image }}
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
        <Animated.View style={[styles.heartAnim, { transform: [{ translateY: heartInter }] }]}>
          <Emoji name="heart" style={styles.heart} />
        </Animated.View>
      </ImageBackground>
      <Panel marginVertical={0.5} marginRight={0.5} marginLeft={0.5}>
        {index === 0 && <PostNavbar />}
        <PostContent title={title} content={content} />
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
      onPress={handleVisible}
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
        heroHeight={FEATURE_SIZE}
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
                  heroHeight={FEATURE_SIZE}
                />
              );
            }
            return null;
          })}
        </>
      )}
      {shots.length > 1 && <PullBar mode="day" marginBottom={0.5} />}
    </Panel>
  );
};

const styles = StyleSheet.create({
  image: {
    padding: AssetStyles.measure.space / 2,
    backgroundColor: Color.grey,
    overflow: 'hidden',
  },
  heartAnim: {
    position: 'absolute',
    bottom: -OFFSET_HEART,
  },
  heart: {
    fontSize: 50,
  },
});

export default Post;
