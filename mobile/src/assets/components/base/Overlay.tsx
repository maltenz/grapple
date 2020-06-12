import React, { FC, ReactNode } from 'react';
import { StatusBar, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeArea } from 'react-native-safe-area-context';
import Panel, { PanelProps } from './Panel';
import Text from './Text';
import { AssetStyles } from '../../styles';

interface OverlayItemProps {
  title: string;
  onPress: () => void;
}

interface OverlayProps extends PanelProps {
  type?: 'page';
}

interface OverlayPanelProps extends PanelProps {
  style?: StyleProp<ViewStyle>;
  Sibling?: ReactNode;
}

export const OverlayItem: FC<OverlayItemProps> = ({ title, onPress }) => (
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

export const OverlayPanel: FC<OverlayPanelProps> = ({
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

const Overlay: FC<OverlayProps> = ({ paddingHorizontal = 1, children, style, type, ...rest }) => {
  const inset = useSafeArea();
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Panel flex={1} style={[type === 'page' && styles.page, style]}>
        <BlurView tint="dark" intensity={100} style={[StyleSheet.absoluteFill, { flex: 1 }]} />
        <Panel
          flex={1}
          style={{
            marginTop: inset.top + AssetStyles.measure.space,
            marginBottom: inset.bottom + AssetStyles.measure.space,
          }}
          paddingHorizontal={paddingHorizontal}
          {...rest}
        >
          {children}
        </Panel>
      </Panel>
    </>
  );
};

export const OverlayHeader: FC = () => (
  <Panel padding backgroundColor="grey4">
    <Text type="h2" mode="day" appearance="normal">
      Privacy
    </Text>
  </Panel>
);

const styles = StyleSheet.create({
  overlayPanelContainer: {
    borderRadius: AssetStyles.measure.radius.large,
  },
  page: {
    flex: 1,
    zIndex: 3,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

export default Overlay;
