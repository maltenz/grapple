import React, { FC } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StatusBar, Alert, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeArea } from 'react-native-safe-area-context';
import { Panel, AssetStyles } from '../components';
import Button from '../components/base/Button';
import Text from '../components/base/Text';
import { MainMenuParamList } from './MainMenuRoot';

interface HomeMenuItemProps {
  children: string;
  onPress: () => void;
}

type ScreenNavigationProp = StackNavigationProp<MainMenuParamList, 'MainMenu'>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type MainMenuProps = NavProps;

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

const MainMenu: FC<MainMenuProps> = ({ navigation }) => {
  const inset = useSafeArea();
  return (
    <Panel flex={1}>
      <StatusBar barStyle="dark-content" />
      <BlurView tint="dark" intensity={100} style={[StyleSheet.absoluteFill, { flex: 1 }]} />
      <Panel
        flex={1}
        style={{ marginVertical: inset.top + AssetStyles.measure.space }}
        marginHorizontal={2}
      >
        <Button mode="night" type="large" appearance="strong">
          Get help now
        </Button>
        <Panel flex={1} justifyContent="flex-end">
          <HomeMenuItem onPress={(): void => Alert.alert('press')}>Create story</HomeMenuItem>
          <HomeMenuItem onPress={(): void => Alert.alert('press')}>Create incident</HomeMenuItem>
          <HomeMenuItem onPress={(): void => Alert.alert('press')}>My stories</HomeMenuItem>
          <HomeMenuItem onPress={(): void => navigation.goBack()}>Back</HomeMenuItem>
        </Panel>
      </Panel>
    </Panel>
  );
};

export default MainMenu;
