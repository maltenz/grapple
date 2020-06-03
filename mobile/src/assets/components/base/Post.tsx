import React, { FC, useState } from 'react';
import { StyleSheet, ImageBackground, StyleProp, ViewStyle, ImageStyle } from 'react-native';

import PostNavbar from './PostNavbar';
import PostContent from './PostContent';
import { AssetStyles } from '../../styles';
import Panel from './Panel';
import PullBar from './PullBar';
import NavBarUser from './NavBarUser';
import { Post as PostType, Shot as ShotType } from '../../../generated/graphql';

const POST_USER_IMAGE_SAMPLE = { uri: 'https://source.unsplash.com/120x120' };

interface PostProps extends PostType {
  gutter?: boolean;
  style?: StyleProp<ViewStyle>;
}

interface ShotProps extends ShotType {
  featureStyles?: StyleProp<ImageStyle>;
  index: number;
}

const Shot: FC<ShotProps> = ({
  image: propImage,
  title: propTitle,
  content: propContent,
  featureStyles,
}) => {
  const [image] = useState<string>(propImage as string);
  const [title] = useState<string>(propTitle as string);
  const [content] = useState<string>(propContent as string);

  return (
    <>
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
    </>
  );
};

const Post: FC<PostProps> = ({ gutter, style, shots }) => {
  const WINDOW_SIZE = AssetStyles.measure.window.width;
  const FEATURE_SIZE = !gutter ? WINDOW_SIZE : WINDOW_SIZE - AssetStyles.measure.space * 2;

  const featureStyles = {
    width: FEATURE_SIZE,
    height: FEATURE_SIZE,
  };

  return (
    <Panel marginHorizontal={gutter} marginBottom backgroundColor="white" style={style}>
      {shots.map((shot, index) => (
        <Shot
          key={shot?.id as string}
          image={shot?.image as string}
          title={shot?.title as string}
          content={shot?.content as string}
          featureStyles={featureStyles}
          index={index}
        />
      ))}
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
