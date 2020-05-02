import React, { FC } from 'react';
import { StyleSheet, ImageSourcePropType } from 'react-native';
import Panel from './Panel';
import Text from './Text';
import SvgIconSmallRight from '../../assets/svg/icons/small/SvgIconSmallRight';
import Thumbnail from './Thumbnail';

interface MenuItemThumbnailProps {
  title: string;
  subTitle: string;
  onPress: () => void;
  src: ImageSourcePropType;
}

const MenuItemThumbnail: FC<MenuItemThumbnailProps> = ({ title, subTitle, onPress, src }) => {
  return (
    <Panel
      backgroundColor="white"
      onPress={onPress}
      paddingHorizontal
      paddingVertical={0.5}
      marginBottom
      row
      alignItems="center"
      justifyContent="space-between"
      style={styles.container}
    >
      <Thumbnail src={src} marginRight />
      <Panel flex={1}>
        <Text mode="day" appearance="normal" type="p" bold>
          {title}
        </Text>
        <Text mode="day" appearance="normal" type="small">
          {subTitle}
        </Text>
      </Panel>
      <SvgIconSmallRight color="grey2" strokeWidth={1.5} style={styles.icon} />
    </Panel>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  border: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  icon: {
    marginRight: 5,
  },
});

export default MenuItemThumbnail;
