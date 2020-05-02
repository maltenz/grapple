import React, { FC } from 'react';
import { StatusBar, Alert, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BlurView } from 'expo-blur';
import { useSafeArea } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import { Panel, AssetStyles, Color, SvgIconSmallRight } from '../components';
import Button from '../components/base/Button';
import Text from '../components/base/Text';
import { HomeRootParamList } from './HomeRoot';

interface MenuItemProps {
  children: string;
  onPress: () => void;
}

type ScreenNavigationProp = StackNavigationProp<HomeRootParamList, 'MenuRoot'>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type MainMenuProps = NavProps;

const MenuItem: FC<MenuItemProps> = ({ children, onPress }) => (
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

const MAP_WIDTH = AssetStyles.measure.window.width - AssetStyles.measure.space * 4;
const MAP_HEIGHT = MAP_WIDTH * 0.63;

const SHADOW = {
  shadowRadius: 50,
  shadowOpacity: 0.5,
  shadowColor: Color.black,
  shadowOffset: { width: 0, height: 10 },
};

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
        <Button mode="night" type="large" appearance="light" style={{ marginBottom: 0, ...SHADOW }}>
          Get help now
        </Button>
        <Panel style={styles.mapShadow}>
          <BlurView tint="light" intensity={10} style={styles.mapContainer}>
            <Panel
              paddingVertical={0.5}
              paddingHorizontal
              row
              alignItems="center"
              justifyContent="space-between"
            >
              <Text mode="night" appearance="normal" type="p">
                Creeper beeper
              </Text>
              <SvgIconSmallRight color="white" strokeWidth={1.5} />
            </Panel>
            <MapView style={styles.map} />
          </BlurView>
        </Panel>
        <Panel flex={1} justifyContent="flex-end">
          <MenuItem onPress={(): void => Alert.alert('press')}>Create</MenuItem>
          <MenuItem
            onPress={(): void => {
              navigation.goBack();
              navigation.navigate('CreateRoot');
            }}
          >
            My Stories
          </MenuItem>
          <MenuItem
            onPress={(): void => {
              navigation.goBack();
              navigation.navigate('CreateRoot');
            }}
          >
            My Incidents
          </MenuItem>
          <MenuItem onPress={(): void => navigation.goBack()}>Back</MenuItem>
        </Panel>
      </Panel>
    </Panel>
  );
};

const styles = StyleSheet.create({
  mapShadow: {
    ...SHADOW,
    borderRadius: AssetStyles.measure.radius.large,
  },
  mapContainer: {
    width: MAP_WIDTH,
    marginTop: AssetStyles.measure.space * 2,
    borderRadius: AssetStyles.measure.radius.large,
    overflow: 'hidden',
  },
  map: {
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
  },
});

export default MainMenu;
