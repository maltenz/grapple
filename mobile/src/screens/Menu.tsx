import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

import { Panel, AssetStyles, SvgIconSmallRight, Button, Text } from '../assets';
import Overlay, { OverlayItem, OverlayPanel } from './components/Overlay';

import { ParentNavigationProp, ChildNavigationProp } from './HomeRoot';

const MAP_WIDTH = AssetStyles.measure.window.width - AssetStyles.measure.space * 4;
const MAP_HEIGHT = MAP_WIDTH * 0.63;

const Menu: FC = () => {
  const parentNavigation = useNavigation<ParentNavigationProp>();
  const navigation = useNavigation<ChildNavigationProp>();

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
        <OverlayPanel
          paddingVertical={0.5}
          paddingHorizontal
          row
          alignItems="center"
          justifyContent="space-between"
          style={styles.mapContainer}
          Sibling={<MapView style={styles.map} />}
        >
          <Text mode="night" appearance="normal" type="p">
            Creeper Beeper
          </Text>
          <SvgIconSmallRight color="white" strokeWidth={1.5} />
        </OverlayPanel>
      </Panel>
      <Panel flex={1} justifyContent="flex-end">
        <OverlayItem title="Create" onPress={(): void => parentNavigation.navigate('Camera')} />
        <OverlayItem title="My Stories" onPress={(): void => navigation.navigate('MyProfile')} />
        <OverlayItem title="My Incidents" onPress={(): void => navigation.navigate('MyProfile')} />
        <OverlayItem title="Back" onPress={(): void => navigation.goBack()}>
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

export default Menu;
