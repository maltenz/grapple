import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Panel from './Panel';
import SvgIconSmallHeart from '../../svg/icons/small/SvgIconSmallHeart';
import SvgIconSmallMessage from '../../svg/icons/small/SvgIconSmallMessage';
import SvgIconSmallShare from '../../svg/icons/small/SvgIconSmallShare';
import SvgIconSmallBookmark from '../../svg/icons/small/SvgIconSmallBookmark';
import { AssetStyles } from '../../styles';

interface PostNavbarItemProps {
  type: 'like' | 'comment' | 'share' | 'bookmark';
  onPress?: () => void;
  active: boolean;
  marginRight?: boolean;
}

export const PostNavbarItem: FC<PostNavbarItemProps> = ({ type, onPress, marginRight, active }) => {
  switch (type) {
    case 'like':
      return (
        <TouchableOpacity onPress={onPress}>
          <SvgIconSmallHeart scale={1.2} style={[marginRight && styles.icon]} active={active} />
        </TouchableOpacity>
      );
    case 'comment':
      return (
        <TouchableOpacity onPress={onPress}>
          <SvgIconSmallMessage scale={1.2} style={[marginRight && styles.icon]} active={active} />
        </TouchableOpacity>
      );
    case 'share':
      return (
        <TouchableOpacity onPress={onPress}>
          <SvgIconSmallShare scale={1.2} style={[marginRight && styles.icon]} />
        </TouchableOpacity>
      );

    case 'bookmark':
    default:
      return (
        <TouchableOpacity onPress={onPress}>
          <SvgIconSmallBookmark scale={1.2} style={[marginRight && styles.icon]} active={active} />
        </TouchableOpacity>
      );
  }
};

interface PostNavbarProps {
  Icons: JSX.Element;
}

const PostNavbar: FC<PostNavbarProps> = ({ Icons }) => {
  return (
    <Panel row alignItems="center" marginHorizontal={-0.3}>
      {Icons}
    </Panel>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: AssetStyles.measure.space / 2,
  },
});
export default PostNavbar;
