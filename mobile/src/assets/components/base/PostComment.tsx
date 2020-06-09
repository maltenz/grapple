import React, { FC } from 'react';
import { ActivityIndicator } from 'react-native';
import Comment, { CommentContainer } from './Comment';
import { Comment as CommentType } from '../../../generated/graphql';
import Panel from './Panel';
import { Color } from '../../colors';

export interface PostCommentProps {
  loading: boolean;
  data: CommentType[];
}

const PostComment: FC<PostCommentProps> = ({ loading, data }) => {
  if (loading) {
    return (
      <Panel marginBottom={0.5}>
        <ActivityIndicator size="large" color={Color.grey2} />
      </Panel>
    );
  }

  if (data.length) {
    return (
      <CommentContainer gutter title="Comments">
        <Comment />
        <Comment input />
      </CommentContainer>
    );
  }
  return (
    <CommentContainer gutter title="Comments">
      <Comment input />
    </CommentContainer>
  );
};

export default PostComment;
