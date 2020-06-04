import React, { FC } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Panel from './Panel';
import SvgIconSmallHeart from '../../svg/icons/small/SvgIconSmallHeart';
import SvgIconSmallMessage from '../../svg/icons/small/SvgIconSmallMessage';
import SvgIconSmallShare from '../../svg/icons/small/SvgIconSmallShare';
import SvgIconSmallBookmark from '../../svg/icons/small/SvgIconSmallBookmark';
import { AssetStyles } from '../../styles';

interface PostNavbarItemProps {
  type: 'like' | 'comment' | 'share' | 'bookmark';
  onPress: () => void;
  marginRight?: boolean;
}

const PostNavbarItem: FC<PostNavbarItemProps> = ({ type, onPress, marginRight }) => {
  switch (type) {
    case 'like':
      return (
        <TouchableOpacity onPress={onPress}>
          <SvgIconSmallHeart scale={1} style={[marginRight && styles.icon]} />
        </TouchableOpacity>
      );
    case 'comment':
      return (
        <TouchableOpacity onPress={onPress}>
          <SvgIconSmallMessage scale={1} style={[marginRight && styles.icon]} />
        </TouchableOpacity>
      );
    case 'share':
      return (
        <TouchableOpacity onPress={onPress}>
          <SvgIconSmallShare scale={1} style={[marginRight && styles.icon]} />
        </TouchableOpacity>
      );

    case 'bookmark':
    default:
      return (
        <TouchableOpacity onPress={onPress}>
          <SvgIconSmallBookmark scale={1} style={[marginRight && styles.icon]} />
        </TouchableOpacity>
      );
  }
};

interface PostNavbarProps {
  onLike: () => void;
}

const PostNavbar: FC<PostNavbarProps> = ({ onLike }) => {
  const onPress = (): void => Alert.alert('press');
  return (
    <Panel row alignItems="center">
      <Panel flex={1} row>
        <PostNavbarItem type="like" onPress={onLike} marginRight />
        <PostNavbarItem type="comment" onPress={onPress} marginRight />
        <PostNavbarItem type="share" onPress={onPress} marginRight />
      </Panel>
      <PostNavbarItem type="bookmark" onPress={onPress} />
    </Panel>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: AssetStyles.measure.space / 2,
  },
});
export default PostNavbar;
