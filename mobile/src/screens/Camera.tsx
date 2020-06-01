import React, { useEffect, useState, FC, ReactNode, useRef } from 'react';
import { Alert, View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import { useDispatch, useSelector } from 'react-redux';

import {
  Panel,
  Navigation,
  NavigationIcon,
  TabbarBackground,
  TabbarCircleButton,
  SvgTabbarBackgroundHeight,
  AssetStyles,
  Button,
  Thumbnail,
  CreateId,
  Badge,
  SvgIconImage,
  ThumbnailDimension,
  SvgIconFlashAuto,
  SvgIconFlash,
  SvgIconFlashOff,
} from '../assets';

import { ChildNavigationProp } from './HomeRoot';

import { addShot, deleteShot, createShotsSelector, clearAllShot } from '../store';

const SQUARE_DIMENSION = AssetStyles.measure.window.width;
const TOP_OFFSET = 50;
const TOP_HEIGHT = (AssetStyles.measure.window.height - SQUARE_DIMENSION) / 2 - TOP_OFFSET;
const BOTTOM_HEIGHT = (AssetStyles.measure.window.height - SQUARE_DIMENSION) / 2 + TOP_OFFSET;
const OFFSET_PERCENT = AssetStyles.measure.window.height / TOP_OFFSET;
const CROP_DIMENSION = 1080;

interface CameraFrameProps {
  backgroundImage: string | null;
  Top?: ReactNode;
  Bottom?: ReactNode;
}

type Flash = 'on' | 'off' | 'auto';

const CameraFrame: FC<CameraFrameProps> = ({ Top, Bottom, backgroundImage }) => {
  return (
    <>
      {backgroundImage && (
        <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${backgroundImage}` }} />
      )}
      <View style={styles.frame}>
        <BlurView tint="dark" intensity={100} style={styles.frameTop}>
          {Top}
        </BlurView>
        <View style={styles.frameSquare} />
        <BlurView tint="dark" intensity={100} style={styles.frameBottom}>
          {Bottom}
        </BlurView>
      </View>
    </>
  );
};

interface FlashIconProps {
  settings: Flash;
}

const FlashIcon: FC<FlashIconProps> = ({ settings }): JSX.Element => {
  switch (settings) {
    case 'auto':
      return <SvgIconFlashAuto color="white" scale={0.9} />;
    case 'off':
      return <SvgIconFlashOff color="white" scale={0.9} />;
    case 'on':
    default:
      return <SvgIconFlash color="white" scale={0.9} />;
  }
};

const CameraScreen: FC = () => {
  const camRef = useRef<Camera>();
  const navigation = useNavigation<ChildNavigationProp>();
  const dispatch = useDispatch();
  const shots = useSelector(createShotsSelector);
  const [hasCamPermission, setHasCamPermission] = useState<boolean>();
  const [hasCamRollPermission, setHasCamRollPermission] = useState<boolean>();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [flashSettings, setFlashSettings] = useState<Flash>('auto');

  useEffect(() => {
    const checkMultiPermissions = async (): Promise<void> => {
      const { status: camStatus } = await Permissions.askAsync(Permissions.CAMERA);
      setHasCamPermission(camStatus === 'granted');
    };
    checkMultiPermissions();
  }, []);

  const handlePreview = (active: boolean, index?: number): void => {
    if (active && index) {
      setActiveIndex(index);
      const { image } = shots[index];
      setBackgroundImage(image !== undefined ? image : null);
    } else {
      setBackgroundImage(null);
      setActiveIndex(null);
    }
  };

  const handleCapture = async (): Promise<void> => {
    try {
      if (hasCamPermission) {
        if (camRef.current !== undefined) {
          const pic = await camRef.current.takePictureAsync();

          const resize = await ImageManipulator.manipulateAsync(
            pic.uri,
            [{ flip: ImageManipulator.FlipType.Horizontal }, { resize: { width: CROP_DIMENSION } }],
            { format: ImageManipulator.SaveFormat.JPEG }
          );

          const WIDTH = resize.width;
          const HEIGHT = resize.height;

          const crop = await ImageManipulator.manipulateAsync(
            resize.uri,
            [
              {
                crop: {
                  originX: WIDTH / 2 - CROP_DIMENSION / 2,
                  originY: HEIGHT / 2 - CROP_DIMENSION / 2 - HEIGHT / OFFSET_PERCENT,
                  width: CROP_DIMENSION,
                  height: CROP_DIMENSION,
                },
              },
            ],
            { format: ImageManipulator.SaveFormat.JPEG, base64: true }
          );
          dispatch(addShot({ id: CreateId(), title: '', content: '', image: crop.base64 }));
        }
      }
    } catch (err) {
      throw Error(err);
    }
  };

  const handleFlash = (): void => {
    switch (flashSettings) {
      case 'auto':
        setFlashSettings('on');
        break;
      case 'on':
        setFlashSettings('off');
        break;
      case 'off':
      default:
        setFlashSettings('auto');
    }
  };

  const handleCamRoll = async (): Promise<void> => {
    try {
      const { status: camRollStatus } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      setHasCamRollPermission(camRollStatus === 'granted');

      if (hasCamRollPermission) {
        const camRollPic = (await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        })) as ImageInfo;

        const resize = await ImageManipulator.manipulateAsync(
          camRollPic.uri,
          [{ resize: { width: CROP_DIMENSION } }],
          { format: ImageManipulator.SaveFormat.JPEG, base64: true }
        );

        dispatch(addShot({ id: CreateId(), title: '', content: '', image: resize.base64 }));
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleClearAllShot = (): void => {
    Alert.alert('Clear shots', 'Are you sure', [
      {
        text: 'Yes',
        style: 'default',
        onPress: (): void => {
          handlePreview(false);
          dispatch(clearAllShot());
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  if (hasCamPermission === null || hasCamPermission === false) {
    return <Panel flex={1} backgroundColor="grey4" />;
  }

  return (
    <>
      <Navigation
        mode="night"
        Left={
          <NavigationIcon
            mode="night"
            type="cameraFlip"
            onPress={(): void => navigation.goBack()}
          />
        }
        Right={
          <NavigationIcon mode="night" type="close" onPress={(): void => navigation.goBack()} />
        }
        style={styles.navigation}
      />
      <Camera
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        ref={camRef}
        style={{ flex: 1 }}
        type="front"
        flashMode={flashSettings}
      />
      <CameraFrame
        backgroundImage={backgroundImage}
        Top={
          <Panel
            alignItems="flex-end"
            flex={1}
            justifyContent="space-between"
            paddingHorizontal
            row
            paddingBottom={0.5}
          >
            <Button
              mode="night"
              onPress={
                shots.length
                  ? handleClearAllShot
                  : (): void => {
                      dispatch(clearAllShot());
                      handlePreview(false);
                    }
              }
              appearance="disabled"
              type="normal"
            >
              Clear
            </Button>
            <Button
              type="normal"
              mode="night"
              appearance={shots.length ? 'normal' : 'disabled'}
              outline={!shots.length}
              onPress={shots.length ? (): void => navigation.navigate('CreatePost') : false}
            >
              Next
            </Button>
          </Panel>
        }
        Bottom={
          <Panel>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
              {shots.map(
                (shot, index: number): ReactNode => {
                  if (shot?.image) {
                    return (
                      <Thumbnail
                        TopRight={
                          activeIndex === index && (
                            <Badge
                              type="delete"
                              appearance="heavy"
                              onPress={(): void => {
                                setBackgroundImage(null);
                                setActiveIndex(null);
                                dispatch(deleteShot({ id: shot.id }));
                              }}
                            />
                          )
                        }
                        key={shot.id}
                        src={{ uri: `data:image/jpeg;base64,${shot.image}` }}
                        marginRight={index === (shots.length as number) - 1 ? 1 : 0.5}
                        marginLeft={index === 0 && 1}
                        outline={index === activeIndex && 'blue'}
                        onPress={(): void => handlePreview(true, index)}
                        backgroundColor="grey4"
                      />
                    );
                  }
                  return null;
                }
              )}
            </ScrollView>
          </Panel>
        }
      />
      <Panel row style={styles.footer}>
        <Panel flex={1}>
          <TouchableOpacity style={styles.footerIcon} onPress={handleFlash}>
            <FlashIcon settings={flashSettings} />
          </TouchableOpacity>
        </Panel>
        <Panel flex={1} center>
          <TabbarCircleButton type="camera" onPress={handleCapture} />
        </Panel>
        <Panel flex={1}>
          <TouchableOpacity onPress={handleCamRoll} style={styles.footerIcon}>
            <SvgIconImage scale={0.9} color="white" />
          </TouchableOpacity>
        </Panel>
      </Panel>
      <TabbarBackground color="black" />
    </>
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
    top: 0,
    height: TOP_HEIGHT,
  },
  frameSquare: {
    height: SQUARE_DIMENSION,
  },
  frameBottom: {
    paddingTop: AssetStyles.measure.space / 2,
    height: BOTTOM_HEIGHT,
  },
  footer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  footerIcon: {
    flex: 1,
    height: SvgTabbarBackgroundHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigation: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
  },
  scrollView: {
    height: ThumbnailDimension + AssetStyles.measure.space,
    overflow: 'visible',
  },
  image: {
    width: SQUARE_DIMENSION,
    height: SQUARE_DIMENSION,
    top: AssetStyles.measure.window.height / 2 - SQUARE_DIMENSION / 2 - TOP_OFFSET,
    position: 'absolute',
  },
});

export default CameraScreen;
