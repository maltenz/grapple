import React, { FC, ReactNode } from 'react';
import { StatusBar, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeArea } from 'react-native-safe-area-context';

import { Panel, AssetStyles, Text } from '../../assets';

import { PanelProps } from '../../assets/components/base/Panel';

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

interface OverlayPanelProps extends PanelProps {
  style?: StyleProp<ViewStyle>;
  Sibling?: ReactNode;
}

const OverlayPanel: FC<OverlayPanelProps> = ({
  paddingHorizontal = 1,
  paddingVertical = 0.5,
  children,
  Sibling,
  style,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  marginHorizontal,
  marginVertical,
  ...rest
}) => {
  return (
    <Panel
      marginTop={marginTop}
      marginRight={marginRight}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginHorizontal={marginHorizontal}
      marginVertical={marginVertical}
    >
      <BlurView tint="dark" intensity={50} style={[styles.overlayPanelContainer, style]}>
        <Panel paddingVertical={paddingVertical} paddingHorizontal={paddingHorizontal} {...rest}>
          {children}
        </Panel>
        {Sibling}
      </BlurView>
    </Panel>
  );
};

type OverlayProps = PanelProps;

const Overlay: FC<OverlayProps> = ({ paddingHorizontal = 2, children }) => {
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
          paddingHorizontal={paddingHorizontal}
        >
          {children}
        </Panel>
      </Panel>
    </>
  );
};

const styles = StyleSheet.create({
  overlayPanelContainer: {
    borderRadius: AssetStyles.measure.radius.large,
  },
});

export { OverlayItem, OverlayPanel };

export default Overlay;
