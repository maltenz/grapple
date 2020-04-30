import React, { useState, useEffect, FC } from 'react';
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Alert,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { UtilityType, ModeType, ColorType } from '../../types';
import { AssetStyles } from '../../assets/styles';

import Panel, { MarginProps } from './Panel';
import BaseBadge from './Badge';
import Thumbnail, { ThumbnailDimension } from '../core/Thumbnail';

export interface GalleryItemType {
  id: string;
  src: {
    thumbnail: ImageSourcePropType;
    large: ImageSourcePropType;
  };
  onPress?: () => void;
}

interface GalleryProps {
  mode: ModeType;
  type?: 'feature' | 'row';
  items: GalleryItemType[];
  activeIndex: number;
  utility: UtilityType;
  src?: ImageSourcePropType;
  onChange: (id: string, index: number) => void;
  gutter?: boolean;
  style?: StyleProp<ViewStyle>;
  blurViewIntensity?: number;
  Nav?: React.ReactNode;
}

const Gallery: FC<GalleryProps> = ({
  mode,
  activeIndex: propActiveIndex,
  type,
  src,
  onChange,
  items,
  utility,
  gutter,
  style,
  blurViewIntensity = 100,
  Nav,
}) => {
  const [activeIndex, setActiveIndex] = useState(propActiveIndex);
  useEffect(() => {
    setActiveIndex(propActiveIndex);
  }, [propActiveIndex]);

  const WINDOW_SIZE = AssetStyles.measure.window.width;
  const FEATURE_SIZE = !gutter ? WINDOW_SIZE : WINDOW_SIZE - AssetStyles.measure.space * 2;

  const featureStyles = {
    width: FEATURE_SIZE,
    height: FEATURE_SIZE,
  };

  return (
    <Panel
      marginHorizontal={gutter}
      style={[
        type === 'row' && {
          height: ThumbnailDimension + AssetStyles.measure.space,
        },
        { position: 'relative' },
        style,
      ]}
    >
      {type === 'feature' && src && (
        <Panel style={featureStyles}>
          <Image source={src} resizeMode="cover" style={styles.image} />
          {Nav && <Panel style={styles.navUserEdit}>{Nav}</Panel>}
        </Panel>
      )}
      <BlurView tint="dark" intensity={blurViewIntensity} style={styles.blurView}>
        <ScrollView horizontal style={styles.scrollView}>
          {items.map(({ id, src: { thumbnail } }, index) => (
            <GalleryItem
              key={id}
              src={thumbnail}
              mode={mode}
              active={activeIndex === index}
              utility={utility}
              marginLeft={index === 0 && 0.5}
              marginRight={0.5}
              onPress={(): void => onChange(id, index)}
            />
          ))}
        </ScrollView>
      </BlurView>
    </Panel>
  );
};

interface GalleryItemProps extends MarginProps {
  src?: ImageSourcePropType;
  mode: ModeType;
  active?: boolean;
  utility: UtilityType;
  onPress: () => void;
}

const GalleryItemBadge: FC<{ utility: UtilityType }> = ({ utility }) => {
  switch (utility) {
    case 'delete':
      return (
        <BaseBadge appearance="heavy" type="delete" onPress={(): void => Alert.alert('delete')} />
      );
    case 'edit':
      return <BaseBadge appearance="heavy" type="edit" onPress={(): void => Alert.alert('edit')} />;
    default:
      return null;
  }
};

const GalleryItem: FC<GalleryItemProps> = ({ mode, src, active, utility, onPress, ...rest }) => {
  let outline: ColorType = 'white';

  if (mode === 'day') {
    switch (utility) {
      case 'edit':
        outline = 'blue';
        break;
      case 'delete':
        outline = 'red';
        break;
      case 'view':
      default:
        outline = 'white';
    }
  }

  return (
    <Thumbnail
      src={src}
      outline={active ? outline : false}
      TopRight={<GalleryItemBadge utility={utility} />}
      onPress={onPress}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  scrollView: {
    flexDirection: 'row',
    paddingVertical: AssetStyles.measure.space / 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  navUserEdit: {
    position: 'absolute',
    top: AssetStyles.measure.space / 2,
    right: AssetStyles.measure.space / 2,
  },
});

export { GalleryItem };
export default Gallery;
