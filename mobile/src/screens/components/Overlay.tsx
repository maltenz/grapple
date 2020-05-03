import React, { FC } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeArea } from 'react-native-safe-area-context';
import { Panel, AssetStyles, Text } from '../../components';

interface OverlayItemProps {
  title: string;
  onPress: () => void;
}

const OverlayItem: FC<OverlayItemProps> = ({ title, onPress }) => (
  <Text
    type="h3"
    mode="night"
    appearance="normal"
    onPress={onPress}
    regular
    textAlign="center"
    marginVertical={0.5}
  >
    {title}
  </Text>
);

const Overlay: FC = ({ children }) => {
  const inset = useSafeArea();
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Panel flex={1}>
        <BlurView tint="dark" intensity={100} style={[StyleSheet.absoluteFill, { flex: 1 }]} />
        <Panel
          flex={1}
          style={{
            marginTop: inset.top + AssetStyles.measure.space,
            marginBottom: inset.bottom + AssetStyles.measure.space,
          }}
          marginHorizontal={2}
        >
          {children}
        </Panel>
      </Panel>
    </>
  );
};

export { OverlayItem };

export default Overlay;
