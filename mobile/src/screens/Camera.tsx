import React, { useEffect, useState, FC } from 'react';
import { StatusBar, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Panel, Navigation, NavigationIcon } from '../components';

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
    </Camera>
  );
};

export default CameraScreen;
