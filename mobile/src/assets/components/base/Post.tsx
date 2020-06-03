import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, StyleProp, ViewStyle } from 'react-native';

import PostNavbar from './PostNavbar';
import PostContent from './PostContent';
import { AssetStyles } from '../../styles';
import Panel from './Panel';
import PullBar from './PullBar';
import NavBarUser from './NavBarUser';
import { Post as PostType } from '../../../generated/graphql';

const POST_USER_IMAGE_SAMPLE = { uri: 'https://source.unsplash.com/philipegd' };

interface PostProps {
  gutter?: boolean;
  style?: StyleProp<ViewStyle>;
  post: PostType;
}

const Post: FC<PostProps> = ({ gutter, style, post }) => {
  const [image, setImage] = useState<string>();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const myImage = post.shots[0]?.image as string;
    const myTitle = post.shots[0]?.title as string;
    const myContent = post.shots[0]?.content as string;
    setImage(myImage);
    setTitle(myTitle);
    setContent(myContent);
  }, [post]);

  const WINDOW_SIZE = AssetStyles.measure.window.width;
  const FEATURE_SIZE = !gutter ? WINDOW_SIZE : WINDOW_SIZE - AssetStyles.measure.space * 2;

  const featureStyles = {
    width: FEATURE_SIZE,
    height: FEATURE_SIZE,
  };

  return (
    <Panel marginHorizontal={gutter} marginBottom backgroundColor="white" style={style}>
      <ImageBackground
        source={{ uri: image }}
        resizeMode="cover"
        style={[styles.image, featureStyles]}
      >
        <NavBarUser
          userType="approved"
          name="Malte Boeing"
          src={POST_USER_IMAGE_SAMPLE}
          mode="day"
        />
      </ImageBackground>
      <Panel marginVertical={0.5} marginRight={0.5} marginLeft={0.5}>
        <PostNavbar />
        <PostContent title={title} content={content} />
      </Panel>
      <PullBar mode="day" marginBottom />
    </Panel>
  );
};

const styles = StyleSheet.create({
  image: {
    padding: AssetStyles.measure.space / 2,
  },
});

export default Post;
