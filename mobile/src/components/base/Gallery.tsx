import React, { useState, useEffect } from 'react';
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { UtilityType, ModeType } from '../../types';
import { AssetStyles } from '../../assets/styles';

import Panel, { MarginProps } from './Panel';
import BaseBadge from './Badge';
import Thumbnail from '../core/Thumbnail';

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
  src: ImageSourcePropType;
  onChange: (id: string, index: number) => void;
  gutter?: boolean;
}

const Gallery = ({
  mode,
  activeIndex: propActiveIndex,
  type,
  src,
  onChange,
  items,
  utility,
  gutter,
}: GalleryProps) => {
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
    <Panel marginHorizontal={gutter}>
      {type === 'feature' && <Image source={src} resizeMode="cover" style={featureStyles} />}
      <BlurView tint="dark" intensity={100} style={styles.blurView}>
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
              onPress={() => onChange(id, index)}
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

const GalleryItem = ({ mode, src, active, utility, onPress, ...rest }: GalleryItemProps) => {
  let outline: ColorType = 'white';
  let Badge: JSX.Element = null;

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

  switch (utility) {
    case 'delete':
      Badge = <BaseBadge appearance="heavy" type="delete" onPress={() => Alert.alert('delete')} />;
      break;
    case 'edit':
      Badge = <BaseBadge appearance="heavy" type="edit" onPress={() => Alert.alert('edit')} />;
      break;
    default:
  }
  return (
    <Thumbnail
      src={src}
      outline={active ? outline : false}
      TopRight={Badge}
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
});

export { GalleryItem };
export default Gallery;
