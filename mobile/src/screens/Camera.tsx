/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useEffect, useState, FC, ReactNode, useRef } from 'react';
import { Alert, View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

import { useMutation, useQuery } from '@apollo/react-hooks';

import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
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
  SvgIconVideo,
  SvgIconVideoOff,
  ThumbnailDimension,
} from '../assets';

import { ChildNavigationProp } from './HomeRoot';

import { ADD_SHOT, GET_SHOTS, DELETE_SHOT } from '../resolvers/shots';
import { Shot } from '../generated/graphql';

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

interface CameraBackground {
  backgroundImage: string | null;
}

type Flash = 'flash' | 'flashAuto' | 'flashOff';

const CameraFrame: FC<CameraFrameProps> = ({ Top, Bottom, backgroundImage }) => {
  return (
    <>
      {backgroundImage && <Image style={styles.image} source={{ uri: backgroundImage }} />}
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

const CameraScreen: FC = () => {
  const camRef = useRef<Camera>();
  const navigation = useNavigation<ChildNavigationProp>();
  const [addShot] = useMutation<Shot>(ADD_SHOT);
  const [deleteShot] = useMutation<Shot>(DELETE_SHOT);
  const { data } = useQuery<{ shots: Shot[] }>(GET_SHOTS);
  const [hasCamPermission, setHasCamPermission] = useState<boolean>();
  const [hasCamRollPermission, setHasCamRollPermission] = useState<boolean>();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [deleteActive, setDeleteActive] = useState<boolean>(false);
  const [flashSettings, setFlashSettings] = useState<Flash>('flash');
  const [videoSettings, setVideoSettings] = useState<'on' | 'off'>('off');

  useEffect(() => {
    const checkMultiPermissions = async (): Promise<void> => {
      const { status: camStatus } = await Permissions.askAsync(Permissions.CAMERA);
      setHasCamPermission(camStatus === 'granted');
    };
    checkMultiPermissions();
  }, []);

  const onChange = (id: string, index: number): void => {
    setActiveIndex(index);
    const image = data?.shots[index].image;
    setBackgroundImage(image !== undefined ? image : null);

    if (activeIndex === index) {
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
            [
              { flip: ImageManipulator.FlipType.Horizontal },
              {
                resize: {
                  width: CROP_DIMENSION,
                },
              },
            ],
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
            { format: ImageManipulator.SaveFormat.JPEG }
          );

          addShot({
            variables: { id: CreateId(), title: '', content: '', image: crop.uri },
          });
        }
      }
    } catch (err) {
      throw Error(err);
    }
  };

  const handleFlash = (): void => {
    switch (flashSettings) {
      case 'flashAuto':
        setFlashSettings('flashOff');
        break;
      case 'flashOff':
        setFlashSettings('flash');
        break;
      case 'flash':
      default:
        setFlashSettings('flashAuto');
    }
  };

  const handleVideo = (): void => {
    if (videoSettings === 'off') {
      setVideoSettings('on');
    } else {
      setVideoSettings('off');
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
          [
            {
              resize: {
                width: CROP_DIMENSION,
              },
            },
          ],
          { format: ImageManipulator.SaveFormat.JPEG }
        );

        addShot({
          variables: { id: CreateId(), title: '', content: '', image: resize.uri },
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  if (hasCamPermission === null || hasCamPermission === false) {
    return <Panel flex={1} backgroundColor="grey4" />;
  }

  return (
    <>
      <Navigation
        mode="night"
        Left={
          <NavigationIcon mode="night" type={flashSettings} onPress={(): void => handleFlash()} />
        }
        Right={
          <NavigationIcon mode="night" type="close" onPress={(): void => navigation.goBack()} />
        }
        style={styles.navigation}
      />
      <Camera
        // @ts-ignore
        ref={camRef}
        style={{ flex: 1 }}
        type="front"
      />
      <CameraFrame
        backgroundImage={backgroundImage}
        Top={
          <Panel
            alignItems="flex-end"
            flex={1}
            justifyContent="flex-end"
            paddingHorizontal
            row
            paddingBottom={0.5}
          >
            <Button
              type="normal"
              mode="night"
              appearance="normal"
              onPress={(): void => {
                navigation.push('CreatePost');
                navigation.navigate('CreatePost');
              }}
            >
              Next
            </Button>
          </Panel>
        }
        Bottom={
          <Panel>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
              {data?.shots?.map(
                (shot, index: number): ReactNode => {
                  if (shot?.image) {
                    return (
                      <Thumbnail
                        TopRight={
                          deleteActive && (
                            <Badge
                              type="delete"
                              appearance="heavy"
                              onPress={(): void => {
                                setBackgroundImage(null);
                                setActiveIndex(null);
                                deleteShot({
                                  variables: { id: shot.id },
                                });
                              }}
                            />
                          )
                        }
                        key={shot.id}
                        src={{ uri: shot.image }}
                        marginRight={index === (data?.shots?.length as number) - 1 ? 1 : 0.5}
                        marginLeft={index === 0 && 1}
                        outline={index === activeIndex && 'blue'}
                        onPress={(): void => onChange(shot.id, index)}
                        backgroundColor="grey4"
                      />
                    );
                  }
                  return null;
                }
              )}
            </ScrollView>
            <Panel marginTop={0.5} paddingHorizontal row justifyContent="space-between">
              <Button type="normal" mode="night" appearance="normal" outline>
                Flip camera
              </Button>
              <Button
                type="normal"
                mode="night"
                appearance="warning"
                outline={!deleteActive}
                onPress={(): void => setDeleteActive(!deleteActive)}
              >
                Edit
              </Button>
            </Panel>
          </Panel>
        }
      />
      <Panel row style={styles.footer}>
        <Panel flex={1}>
          <TouchableOpacity
            accessibilityRole="button"
            style={styles.footerIcon}
            onPress={handleVideo}
          >
            {videoSettings === 'off' ? (
              <SvgIconVideoOff scale={0.9} color="white" />
            ) : (
              <SvgIconVideo scale={0.9} color="white" />
            )}
          </TouchableOpacity>
        </Panel>
        <Panel flex={1} center>
          <TabbarCircleButton
            type="camera"
            onPress={handleCapture}
            onLongPress={(): void => Alert.alert('long press')}
          />
        </Panel>
        <Panel flex={1}>
          <TouchableOpacity
            onPress={handleCamRoll}
            accessibilityRole="button"
            style={styles.footerIcon}
          >
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
