import React, { FC, useState, useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';

import { Post as BasePost } from '../../assets';
import { Post as PostType, Shot, Comment, CommentInput, AwardsEnum } from '../../generated/graphql';
import { View } from '../../assets/components/base/Post';
import { CommentLoaderType } from '../../assets/components/base/CommentLoader';

import { BOOKMARK_POST, REMOVE_BOOKMARK_POST } from '../../mutations/post';
import { GET_COMMENTS } from '../../queries/comment';
import { CREATE_COMMENT } from '../../mutations/comment';

interface PostProps extends PostType {
  gutter?: boolean;
  style?: StyleProp<ViewStyle>;
}

const ANIM_ICON_DUR = 3000;
const ANIM_ICON_TOL = 2000;
const ANIM_ICON_DELAY = 1000;
const ANIM_ICON_WIDTH = 80;
const ANIM_ICON_SIZE = ANIM_ICON_WIDTH - 10;

const Post: FC<PostProps> = ({ shots, id, bookmarked: propBookmarked, style, gutter }) => {
  const [bookmarkPost] = useMutation(BOOKMARK_POST);
  const [removeBookmarkPost] = useMutation(REMOVE_BOOKMARK_POST);
  const [
    getComments,
    { data: commentsData, loading: loadingComments, refetch: refetchCommments },
  ] = useLazyQuery<{
    comments: Comment[];
  }>(GET_COMMENTS);
  const [createComment, { data: createCommentData }] = useMutation<{ createComment: Comment }>(
    CREATE_COMMENT
  );
  const [resetComment, setResetComment] = useState<boolean>(false);
  const [reactionsVisible, setReactionsVisible] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentLoaderType>({ loading: false, data: [] });
  const [bookmarked, setBookmarked] = useState<boolean>(propBookmarked as boolean);
  const [iconName, setIconName] = useState<AwardsEnum>(AwardsEnum.Angel);
  const [view, setView] = useState<View>('shots');
  const [iconAnimateActive, setIconAnimateActive] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [commentsVisible, setCommentsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (loadingComments === true) {
      handleLoadComments({ loading: true });
    } else {
      handleLoadComments({ loading: false });
    }
  }, [loadingComments]);

  useEffect(() => {
    if (commentsData?.comments) {
      handleLoadComments({ loading: false, data: commentsData.comments });
    }
  }, [commentsData]);

  useEffect(() => {
    if (createCommentData?.createComment) {
      refetchCommments();
      setResetComment(true);
      setTimeout(() => {
        setResetComment(false);
      });
    }
  }, [createCommentData]);

  const handleHeart = (): void => {
    setReactionsVisible(!reactionsVisible);
  };

  const handleReaction = (icon: AwardsEnum): void => {
    setIconName(icon);
    setTimeout(() => {
      setIconAnimateActive(false);
    }, ANIM_ICON_DUR + ANIM_ICON_DELAY);
  };

  const handleLoadComments = ({ loading, data }: CommentLoaderType): void => {
    const myComments = { ...comments };
    myComments.loading = loading;
    if (data) {
      myComments.data = data;
    }
    setComments(myComments);
  };

  const handleCreateComment = ({ text }: CommentInput): void => {
    createComment({ variables: { id, text } });
  };

  const handleBookmark = (): void => {
    if (bookmarked) {
      removeBookmarkPost({ variables: { id } });
      setBookmarked(false);
    } else {
      bookmarkPost({ variables: { id } });
      setBookmarked(true);
    }
  };

  const handleComment = (): void => {
    if (commentsVisible) {
      setCommentsVisible(false);
      setView('shots');
    } else {
      setCommentsVisible(true);
      getComments({ variables: { id } });
      setView('comments');
    }
    if (!visible) {
      setVisible(true);
    }
  };

  const handleVisible = (): void => {
    if (visible) {
      setCommentsVisible(false);
      setView('shots');
      setVisible(false);
    } else {
      setVisible(true);
      setCommentsVisible(shots.length <= 1);
      setView(shots.length <= 1 ? 'comments' : 'shots');
    }
  };

  return (
    <BasePost
      view={view}
      shots={shots as Shot[]}
      onHeart={handleHeart}
      bookmarked={bookmarked}
      onReaction={handleReaction}
      reactionsVisible={reactionsVisible}
      onBookmark={handleBookmark}
      onComment={handleComment}
      commentsVisible={commentsVisible}
      comments={comments}
      onCreateComment={handleCreateComment}
      onResetComment={resetComment}
      visible={visible}
      onVisible={handleVisible}
      animIconConfig={{
        duration: ANIM_ICON_DUR,
        delay: ANIM_ICON_DELAY,
        tolerance: ANIM_ICON_TOL,
        iconName,
        active: iconAnimateActive,
        width: ANIM_ICON_WIDTH,
        fontSize: ANIM_ICON_SIZE,
      }}
      gutter={gutter}
      style={style}
    />
  );
};

export default Post;
