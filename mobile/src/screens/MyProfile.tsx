import React, { FC } from 'react';
import { ScrollView, Alert, StyleSheet, Image } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import {
  Navigation,
  NavigationIcon,
  Button,
  AssetStyles,
  Container,
  Panel,
  Text,
  MenuItemThumbnail,
  SvgTabbarBackgroundHeight,
  CorePullBar,
} from '../assets';

import { NavigationHeading, NavigationHeight } from '../components/base/Navigation';

import { ChildNavigationProp } from './HomeRoot';

const HERO_IMAGE = {
  src: {
    thumbnail: { uri: 'https://source.unsplash.com/random' },
    large: { uri: 'https://source.unsplash.com/random' },
  },
};

const HERO_DIMENSIONS = AssetStyles.measure.window.width;

const MyProfile: FC = () => {
  const navigation = useNavigation<ChildNavigationProp>();

  const inset = useSafeArea();

  return (
    <>
      <Navigation
        blur
        mode="day"
        Left={<NavigationIcon mode="day" type="back" onPress={(): void => navigation.goBack()} />}
        Center={<NavigationHeading mode="day" text="My profile" />}
        Right={
          <Button
            mode="day"
            onPress={(): void => Alert.alert('Saved')}
            appearance="dark"
            outline
            type="normal"
            style={{ marginBottom: 0 }}
          >
            Edit
          </Button>
        }
      />
      <Image
        style={[styles.heroImage, { height: HERO_DIMENSIONS + NavigationHeight + inset.top }]}
        source={HERO_IMAGE.src.large}
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: AssetStyles.measure.window.width - NavigationHeight - inset.top,
          paddingBottom: SvgTabbarBackgroundHeight,
        }}
      >
        <Panel backgroundColor="grey4">
          <Container paddingHorizontal paddingVertical={0.5}>
            <Panel row alignItems="center">
              <Button
                type="small"
                appearance="normal"
                mode="day"
                style={{ alignSelf: 'flex-start' }}
                marginRight
              >
                Become a buddy
              </Button>
              <Text mode="day" appearance="normal" type="small" underline>
                Info
              </Text>
            </Panel>
            <Panel>
              <Text mode="day" appearance="normal" type="p" bold>
                Malte Boeing
              </Text>
              <Text mode="day" appearance="normal" type="small" marginBottom>
                Many people has the notion that enlightenment is one state. Many also believe that
                when it is attained, a person is forever in that state.
              </Text>
              <CorePullBar />
            </Panel>
          </Container>
          <MenuItemThumbnail
            title="Emergency Address"
            subTitle={`4 Penglington Place \n Wellington, New Zealand`}
            src={{ uri: HERO_IMAGE.src.thumbnail.uri }}
            onPress={(): void => Alert.alert('press')}
          />
          <MenuItemThumbnail
            title="Emergency Phone"
            subTitle="+64 4 21 144 26 24"
            src={{ uri: HERO_IMAGE.src.thumbnail.uri }}
            onPress={(): void => Alert.alert('press')}
          />
        </Panel>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  heroImage: {
    width: HERO_DIMENSIONS,
    height: HERO_DIMENSIONS,
    position: 'absolute',
    padding: AssetStyles.measure.space,
    flexDirection: 'row',
  },
  footer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  backgroundBug: {},
});

export default MyProfile;
