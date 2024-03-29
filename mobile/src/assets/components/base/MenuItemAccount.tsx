import React, { FC } from 'react';
import { StyleSheet, ImageSourcePropType } from 'react-native';
import Panel from './Panel';
import CoreText from '../core/Text';
import SvgIconSmallRight from '../../svg/icons/small/SvgIconSmallRight';
import { AssetStyles } from '../../styles';
import Thumbnail, { ThumbnailDimension } from './Thumbnail';

interface MenuItemAccountProps {
  title: string;
  subTitle: string;
  onPress: () => void;
  src: ImageSourcePropType;
}

const HEIGHT = ThumbnailDimension + AssetStyles.measure.space;

const MenuItemAccountHeight = HEIGHT;

const MenuItemAccount: FC<MenuItemAccountProps> = ({ title, subTitle, onPress, src }) => {
  return (
    <Panel
      onPress={onPress}
      marginHorizontal
      row
      alignItems="center"
      justifyContent="space-between"
      style={styles.container}
    >
      <Panel row>
        <Thumbnail src={src} backgroundColor="grey4" />
        <Panel justifyContent="center">
          <CoreText type="p" minLineHeight>
            {title}
          </CoreText>
          <Panel style={{ height: 5 }} />
          <CoreText type="p" minLineHeight bold>
            {subTitle}
          </CoreText>
        </Panel>
      </Panel>
      <SvgIconSmallRight color="grey2" strokeWidth={1.5} />
    </Panel>
  );
};

export { MenuItemAccountHeight };

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    position: 'relative',
  },
});

export default MenuItemAccount;
