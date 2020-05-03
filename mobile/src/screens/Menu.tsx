import React, { FC } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Panel, AssetStyles, SvgIconSmallRight } from '../components';
import Button from '../components/base/Button';
import Text from '../components/base/Text';
import { ParentNavigationProp } from './HomeRoot';
import Overlay, { OverlayItem } from './components/Overlay';

interface MenuItemProps {
  children: string;
  onPress: () => void;
}

const MAP_WIDTH = AssetStyles.measure.window.width - AssetStyles.measure.space * 4;
const MAP_HEIGHT = MAP_WIDTH * 0.63;

const MainMenu: FC = () => {
  const parentNavigation = useNavigation<ParentNavigationProp>();

  return (
    <Overlay>
      <Button
        mode="night"
        type="large"
        appearance="light"
        style={{ marginBottom: 0, ...AssetStyles.shadow.overlay }}
      >
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
              Creeper Beeper
            </Text>
            <SvgIconSmallRight color="white" strokeWidth={1.5} />
          </Panel>
          <MapView style={styles.map} />
        </BlurView>
      </Panel>
      <Panel flex={1} justifyContent="flex-end">
        <OverlayItem title="Create" onPress={(): void => Alert.alert('press')} />
        <OverlayItem title="My Stories" onPress={(): void => parentNavigation.navigate('Camera')} />
        <OverlayItem
          title="My Incidents"
          onPress={(): void => parentNavigation.navigate('Camera')}
        />
        <OverlayItem title="Back" onPress={(): void => parentNavigation.goBack()}>
          Back
        </OverlayItem>
      </Panel>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  mapShadow: {
    ...AssetStyles.shadow.overlay,
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
