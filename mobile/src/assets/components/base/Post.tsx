import React, { FC } from 'react';
import { StyleProp, ViewStyle, LayoutAnimation, StyleSheet } from 'react-native';

import Panel from './Panel';
import PullBar from './PullBar';
import PostShot, { AnimIconConfig } from './PostShot';
import { Shot as ShotType, CommentInput, AwardsEnum } from '../../../generated/graphql';
import CommentLoader, { CommentLoaderType } from './CommentLoader';

export type View = 'comments' | 'shots';

interface PostProps {
  gutter?: boolean;
  style?: StyleProp<ViewStyle>;
  shots: ShotType[];
  view: View;
  onHeart: () => void;
  onReaction: (icon: AwardsEnum) => void;
  reactionsVisible: boolean;
  bookmarked: boolean;
  onBookmark: () => void;
  onComment: () => void;
  commentsVisible: boolean;
  comments: CommentLoaderType;
  onCreateComment: (value: CommentInput) => void;
  onResetComment: boolean;
  visible: boolean;
  onVisible: () => void;
  animIconConfig: AnimIconConfig;
}

const Post: FC<PostProps> = ({
  view,
  shots,
  onHeart,
  onReaction,
  reactionsVisible,
  bookmarked,
  onBookmark,
  onComment,
  commentsVisible,
  comments,
  onCreateComment,
  onResetComment,
  visible,
  onVisible,
  animIconConfig,
  gutter,
  style,
}) => {
  const handleVisible = (): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onVisible();
  };

  return (
    <Panel
      marginHorizontal={gutter}
      marginBottom
      backgroundColor="white"
      activeOpacity={1}
      style={[styles.container, style]}
    >
      <PostShot
        key={shots[0]?.id as string}
        index={0}
        image={shots[0]?.image as string}
        title={shots[0]?.title as string}
        content={shots[0]?.content as string}
        onHeart={onHeart}
        onReaction={onReaction}
        reactionsVisible={reactionsVisible}
        bookmarked={bookmarked}
        onBookmark={onBookmark}
        commented={commentsVisible}
        onComments={onComment}
        animIconConfig={animIconConfig}
        gutter={gutter}
      />
      {visible && view === 'shots' && shots.length > 1 && (
        <>
          {shots.map((shot, index) => {
            if (index > 0) {
              return (
                <PostShot
                  key={shot?.id as string}
                  index={index}
                  image={shot?.image as string}
                  title={shot?.title as string}
                  content={shot?.content as string}
                  gutter={gutter}
                />
              );
            }
            return null;
          })}
        </>
      )}
      {visible && view === 'comments' && commentsVisible && (
        <CommentLoader
          onCreateComment={onCreateComment}
          onResetComment={onResetComment}
          {...comments}
        />
      )}
      <PullBar mode="day" marginBottom={0.5} onPress={handleVisible} backgroundColor="white" />
    </Panel>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default Post;
