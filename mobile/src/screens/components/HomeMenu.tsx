import React, { FC } from 'react';
import { StyleSheet, Modal, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeArea } from 'react-native-safe-area-context';

import { NavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, Panel, AssetStyles, Button } from '../../components';

interface HomeMenuProps {
  onOpenClose: (isOpen: boolean) => void;
  isOpen: boolean;
}

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type Props = {
  route: ProfileScreenRouteProp;
};

interface HomeMenuItemProps {
  children: string;
  onPress: () => void;
  navigation: NavigationProp<RouteProp>;
}
const HomeMenuItem: FC<HomeMenuItemProps> = ({ children, onPress }) => (
  <Text
    type="h3"
    mode="night"
    appearance="normal"
    onPress={onPress}
    regular
    textAlign="center"
    marginVertical={0.5}
  >
    {children}
  </Text>
);

const HomeMenu: FC<HomeMenuProps> = ({ onOpenClose, isOpen }) => {
  const insets = useSafeArea();

  return (
    <Modal
      hardwareAccelerated
      animationType="slide"
      transparent
      visible={isOpen}
      onRequestClose={(): void => {
        onOpenClose(!isOpen);
      }}
    >
      <BlurView tint="dark" intensity={100} style={[StyleSheet.absoluteFill, { flex: 1 }]} />
      <Panel
        flex={1}
        style={{ marginVertical: insets.top + AssetStyles.measure.space }}
        marginHorizontal={2}
      >
        <Button mode="night" type="large" appearance="subtle">
          Get help now
        </Button>
        <Panel flex={1} justifyContent="flex-end">
          <HomeMenuItem onPress={(): void => Alert.alert('press')}>Create story</HomeMenuItem>
          <HomeMenuItem onPress={(): void => Alert.alert('press')}>Create incident</HomeMenuItem>
          <HomeMenuItem onPress={(): void => Alert.alert('press')}>My stories</HomeMenuItem>
          <HomeMenuItem onPress={(): void => onOpenClose(!isOpen)}>Back</HomeMenuItem>
        </Panel>
      </Panel>
    </Modal>
  );
};

export default HomeMenu;
