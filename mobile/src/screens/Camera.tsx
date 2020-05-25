/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useEffect, useState, FC, ReactNode, useRef } from 'react';
import { Alert, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

import { useMutation, useQuery } from '@apollo/react-hooks';

import {
  Panel,
  Navigation,
  NavigationIcon,
  TabbarBackground,
  TabbarCircleButton,
  SvgTabbarBackgroundHeight,
  AssetStyles,
  Button,
  SvgIconStory,
  Thumbnail,
  CreateId,
} from '../assets';

import { ChildNavigationProp } from './HomeRoot';

import { ADD_SHOT, GET_SHOTS } from '../resolvers/addShot';
import { Shot } from '../generated/graphql';

import SvgIconVideo from '../assets/svg/icons/large/SvgIconVideo';

const SQUARE_DIMENSION = AssetStyles.measure.window.width;
const TOP_OFFSET = 50;
const TOP_HEIGHT = (AssetStyles.measure.window.height - SQUARE_DIMENSION) / 2 - TOP_OFFSET;
const BOTTOM_HEIGHT = (AssetStyles.measure.window.height - SQUARE_DIMENSION) / 2 + TOP_OFFSET;

interface CameraFrameProps {
  Top?: ReactNode;
  Bottom?: ReactNode;
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
  const camRef = useRef<Camera>();
  const navigation = useNavigation<ChildNavigationProp>();
  const [addShot] = useMutation<Shot>(ADD_SHOT);
  const { data } = useQuery<{ shots: Shot[] }>(GET_SHOTS);

  const [hasPermission, setHasPermission] = useState<boolean>();
  const [activeIndex, setActiveIndex] = useState<number>();

  useEffect(() => {
    const checkMultiPermissions = async (): Promise<void> => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted');
    };
    checkMultiPermissions();
  }, []);

  const onChange = (index: number): void => {
    setActiveIndex(index);
  };

  const handleCapture = async (): Promise<void> => {
    try {
      if (camRef.current !== undefined) {
        const pic = await camRef.current.takePictureAsync();

        addShot({
          variables: { id: CreateId(), title: '', content: '', image: pic.uri },
        });
      }
    } catch (err) {
      throw Error(err);
    }
  };

  if (hasPermission === null) {
    return <Panel flex={1} backgroundColor="black" />;
  }
  if (hasPermission === false) {
    return <Panel flex={1} backgroundColor="red" />;
  }

  return (
    <Camera
      // @ts-ignore
      ref={camRef}
      style={{ flex: 1 }}
      type="front"
    >
      <CameraFrame
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
              onPress={(): void => navigation.navigate('MyPosts')}
            >
              Next
            </Button>
          </Panel>
        }
        Bottom={
          <Panel>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {data?.shots?.map(
                (shot, index: number): ReactNode => {
                  if (shot?.image) {
                    return (
                      <Thumbnail
                        key={shot.id}
                        src={{ uri: shot.image }}
                        marginRight={index === (data?.shots?.length as number) - 1 ? 1 : 0.5}
                        marginLeft={index === 0 && 1}
                        outline={index === activeIndex && 'blue'}
                        onPress={(): void => onChange(index)}
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
              <Button type="normal" mode="night" appearance="warning" outline>
                Edit
              </Button>
            </Panel>
          </Panel>
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
      <Panel row style={styles.footer}>
        <Panel flex={1}>
          <TouchableOpacity accessibilityRole="button" style={styles.footerIcon}>
            <SvgIconVideo scale={0.9} color="white" />
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
          <TouchableOpacity accessibilityRole="button" style={styles.footerIcon}>
            <SvgIconStory scale={0.9} color="white" />
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
});

export default CameraScreen;
