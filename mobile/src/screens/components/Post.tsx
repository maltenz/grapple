import React, { FC, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { useMutation } from '@apollo/react-hooks';

import { Post as BasePost } from '../../assets';

import { Post as PostType, Shot } from '../../generated/graphql';

import { LIKE_POST, UNLIKE_POST, BOOKMARK_POST, REMOVE_BOOKMARK_POST } from '../../mutations/post';

interface PostProps extends PostType {
  gutter?: boolean;
  style?: StyleProp<ViewStyle>;
}

const ANIM_ICON_DUR = 3000;
const ANIM_ICON_TOL = 2000;
const ANIM_ICON_DELAY = 1000;
const ANIM_ICON_WIDTH = 80;
const ANIM_ICON_SIZE = ANIM_ICON_WIDTH - 10;

const Post: FC<PostProps> = ({
  shots,
  id,
  liked: propLiked,
  bookmarked: propBookmarked,
  style,
  gutter,
}) => {
  const [likePost] = useMutation(LIKE_POST);
  const [unlikePost] = useMutation(UNLIKE_POST);
  const [bookmarkPost] = useMutation(BOOKMARK_POST);
  const [removeBookmarkPost] = useMutation(REMOVE_BOOKMARK_POST);
  const [liked, setLiked] = useState<boolean>(propLiked as boolean);
  const [bookmarked, setBookmarked] = useState<boolean>(propBookmarked as boolean);
  const [iconName, setIconName] = useState<'heart' | 'broken_heart'>(
    liked ? 'heart' : 'broken_heart'
  );
  const [iconAnimateActive, setIconAnimateActive] = useState<boolean>(false);

  const [visible, setVisible] = useState<boolean>(false);

  const handleLike = (): void => {
    if (liked) {
      unlikePost({ variables: { id } });
      setIconName('broken_heart');
      setLiked(false);
    } else {
      likePost({ variables: { id } });
      setIconName('heart');
      setLiked(true);
    }
    setIconAnimateActive(true);
    setTimeout(() => {
      setIconAnimateActive(false);
    }, ANIM_ICON_DUR + ANIM_ICON_DELAY);
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

  const handleVisible = (): void => {
    setVisible(!visible);
  };

  return (
    <BasePost
      shots={shots as Shot[]}
      liked={liked}
      onLike={handleLike}
      bookmarked={bookmarked}
      onBookmark={handleBookmark}
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
