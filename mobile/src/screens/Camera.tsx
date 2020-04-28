import React, { useEffect, useState, FC } from 'react';
import { StatusBar, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Panel,
  Navigation,
  NavigationIcon,
  TabbarBackground,
  TabbarCircleButton,
  SvgTabbarBackgroundHeight,
  SvgIconAccount,
} from '../components';

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

  if (hasPermission === null) {
    return <Panel flex={1} backgroundColor="black" />;
  }
  if (hasPermission === false) {
    return <Panel flex={1} backgroundColor="red" />;
  }

  return (
    <Camera style={{ flex: 1 }} type="front">
      <Navigation
        mode="night"
        Left={
          <NavigationIcon mode="night" type="search" onPress={(): void => Alert.alert('press')} />
        }
        Right={
          <NavigationIcon mode="night" type="chat" onPress={(): void => Alert.alert('press')} />
        }
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

export default CameraScreen;
