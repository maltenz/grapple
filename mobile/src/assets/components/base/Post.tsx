import React, { FC } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

import PostNavbar from './PostNavbar';
import PostContent, { PostContentProps } from './PostContent';
import { AssetStyles } from '../../styles';
import Panel from './Panel';
import PullBar from './PullBar';
import NavBarUser from './NavBarUser';

const POST_IMAGE_SAMPLE = { uri: 'https://source.unsplash.com/random' };
const POST_USER_IMAGE_SAMPLE = { uri: 'https://source.unsplash.com/philipegd' };

interface PostProps extends PostContentProps {
  gutter?: boolean;
}

const Post: FC<PostProps> = ({ gutter, title, content }) => {
  const WINDOW_SIZE = AssetStyles.measure.window.width;
  const FEATURE_SIZE = !gutter ? WINDOW_SIZE : WINDOW_SIZE - AssetStyles.measure.space * 2;

  const featureStyles = {
    width: FEATURE_SIZE,
    height: FEATURE_SIZE,
  };

  return (
    <Panel marginHorizontal={gutter} marginBottom backgroundColor="white">
      <ImageBackground
        source={POST_IMAGE_SAMPLE}
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