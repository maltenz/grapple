import React, { FC } from 'react';
import { StyleSheet, Alert } from 'react-native';
import Panel from './Panel';
import SvgIconSmallHeart from '../../assets/svg/icons/small/SvgIconSmallHeart';
import SvgIconSmallMessage from '../../assets/svg/icons/small/SvgIconSmallMessage';
import SvgIconSmallShare from '../../assets/svg/icons/small/SvgIconSmallShare';
import SvgIconSmallBookmark from '../../assets/svg/icons/small/SvgIconSmallBookmark';
import { AssetStyles } from '../../assets/styles';

interface PostNavbarItemProps {
  type: 'like' | 'comment' | 'share' | 'bookmark';
  onPress: () => void;
  marginRight?: boolean;
}

const PostNavbarItem: FC<PostNavbarItemProps> = ({ type, onPress, marginRight }) => {
  switch (type) {
    case 'like':
      return <SvgIconSmallHeart onPress={onPress} scale={1} style={[marginRight && styles.icon]} />;
    case 'comment':
      return (
        <SvgIconSmallMessage onPress={onPress} scale={1} style={[marginRight && styles.icon]} />
      );
    case 'share':
      return <SvgIconSmallShare onPress={onPress} scale={1} style={[marginRight && styles.icon]} />;
    case 'bookmark':
    default:
      return (
        <SvgIconSmallBookmark onPress={onPress} scale={1} style={[marginRight && styles.icon]} />
      );
  }
};

const PostNavbar: FC = () => {
  const onPress = (): void => Alert.alert('press');
  return (
    <Panel row alignItems="center">
      <Panel flex={1} row>
        <PostNavbarItem type="like" onPress={onPress} marginRight />
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
