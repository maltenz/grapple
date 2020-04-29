import _ from 'lodash';
import React, { useEffect, useState, FC } from 'react';
import { StatusBar, Alert, View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { BlurView } from 'expo-blur';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Panel,
  Navigation,
  NavigationIcon,
  TabbarBackground,
  TabbarCircleButton,
  SvgTabbarBackgroundHeight,
  SvgIconAccount,
  Gallery,
  GalleryItemType,
  AssetStyles,
} from '../components';

const SQUARE_DIMENSION = AssetStyles.measure.window.width;
const TOP_OFFSET = 50;
const TOP_HEIGHT = (AssetStyles.measure.window.height - SQUARE_DIMENSION) / 2 - TOP_OFFSET;
const BOTTOM_HEIGHT = (AssetStyles.measure.window.height - SQUARE_DIMENSION) / 2 + TOP_OFFSET;

const GALERY_ITEM_SAMPLE = {
  src: {
    thumbnail: { uri: 'https://source.unsplash.com/random' },
    large: { uri: 'https://source.unsplash.com/random' },
  },
};

const GALLERY: GalleryItemType[] = [
  { ...GALERY_ITEM_SAMPLE, id: 'asd' },
  { ...GALERY_ITEM_SAMPLE, id: 'a3a' },
  { ...GALERY_ITEM_SAMPLE, id: 'ags' },
  { ...GALERY_ITEM_SAMPLE, id: '42v' },
  { ...GALERY_ITEM_SAMPLE, id: '525' },
  { ...GALERY_ITEM_SAMPLE, id: '6hj' },
];

interface CameraFrameProps {
  Top?: React.ReactNode;
  Bottom?: React.ReactNode;
}

const CameraFrame: FC<CameraFrameProps> = ({ Top, Bottom }) => {
  return (
    <View style={styles.frame}>
      <BlurView tint="dark" intensity={100} style={styles.frameTop}>
        {Top}
      </BlurView>
      <View style={styles.frameSquare} />
      <BlurView tint="dark" intensity={100} style={styles.frameBottom}>
        {Bottom}
      </BlurView>
    </View>
  );
};

const CameraScreen: FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean>();

  useEffect(() => {
    const checkMultiPermissions = async (): Promise<void> => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted');
    };
    checkMultiPermissions();
    StatusBar.setHidden(true);
  }, []);

  const [galleryHeroImg, setGalleryHeroImg] = useState({
    uri: 'https://source.unsplash.com/random',
  });
  const [galleryActiveIndex, setGalleryActiveIndex] = useState(0);

  const handleGalleryOnChange = (id: string, index: number): void => {
    const { large } = GALLERY[index].src;
    const uri = _.get(large, ['uri']);
    setGalleryHeroImg({ uri });
    setGalleryActiveIndex(index);
  };

  if (hasPermission === null) {
    return <Panel flex={1} backgroundColor="black" />;
  }
  if (hasPermission === false) {
    return <Panel flex={1} backgroundColor="red" />;
  }

  return (
    <Camera style={{ flex: 1 }} type="front">
      <CameraFrame
        Bottom={
          <Gallery
            onChange={handleGalleryOnChange}
            items={GALLERY}
            activeIndex={galleryActiveIndex}
            src={galleryHeroImg}
            utility="delete"
            mode="day"
            type="row"
            blurViewIntensity={0}
          />
        }
      />
      <Navigation
        mode="night"
        Left={
          <NavigationIcon mode="night" type="search" onPress={(): void => Alert.alert('press')} />
        }
        Right={
          <NavigationIcon mode="night" type="chat" onPress={(): void => Alert.alert('press')} />
        }
        style={{ backgroundColor: 'transparent' }}
      />
      <Panel
        row
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1,
        }}
      >
        <Panel flex={1}>
          <TouchableOpacity
            accessibilityRole="button"
            // accessibilityStates={isFocused ? ['selected'] : []}
            // accessibilityLabel={options.tabBarAccessibilityLabel}
            // onPress={onPress}
            // onLongPress={onLongPress}
            style={{
              flex: 1,
              height: SvgTabbarBackgroundHeight,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SvgIconAccount scale={0.9} color="white" />
          </TouchableOpacity>
        </Panel>
        <Panel flex={1} center>
          <TabbarCircleButton
            type="camera"
            onPress={(): void => Alert.alert('press')}
            onLongPress={(): void => Alert.alert('long press')}
          />
        </Panel>
        <Panel flex={1}>
          <TouchableOpacity
            accessibilityRole="button"
            // accessibilityStates={isFocused ? ['selected'] : []}
            // accessibilityLabel={options.tabBarAccessibilityLabel}
            // onPress={onPress}
            // onLongPress={onLongPress}
            style={{
              height: SvgTabbarBackgroundHeight,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SvgIconAccount scale={0.9} color="white" />
          </TouchableOpacity>
        </Panel>
      </Panel>
      <TabbarBackground color="black" />
    </Camera>
  );
};

const styles = StyleSheet.create({
  frame: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  frameTop: {
    height: TOP_HEIGHT,
  },
  frameSquare: {
    height: SQUARE_DIMENSION,
  },
  frameBottom: {
    paddingTop: AssetStyles.measure.space / 2,
    height: BOTTOM_HEIGHT,
  },
});

export default CameraScreen;
