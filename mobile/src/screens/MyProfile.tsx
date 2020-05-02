import React, { FC } from 'react';
import { ScrollView, Alert, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeArea } from 'react-native-safe-area-context';
import { Text, Navigation, NavigationIcon, Button, AssetStyles, Container } from '../components';
import { AccountRootParamList } from './AccountRoot';
import { NavigationHeading, NavigationHeight } from '../components/base/Navigation';

type ScreenNavigationProp = StackNavigationProp<AccountRootParamList, 'MyProfile'>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type MyPostProps = NavProps;

const HERO_IMAGE = {
  src: {
    thumbnail: { uri: 'https://source.unsplash.com/random' },
    large: { uri: 'https://source.unsplash.com/random' },
  },
};

const MyProfile: FC<MyPostProps> = ({ navigation }) => {
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
            appearance="normal"
            outline
            type="normal"
            style={{ marginBottom: 0 }}
          >
            Edit
          </Button>
        }
      />
      <Image style={[styles.heroImage]} source={HERO_IMAGE.src.large} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: AssetStyles.measure.window.width - NavigationHeight - inset.top,
        }}
      >
        <Container paddingHorizontal paddingVertical={0.5}>
          <Text mode="day" appearance="normal" type="h3">
            My Profile
          </Text>
        </Container>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  heroImage: {
    width: AssetStyles.measure.window.width,
    height: AssetStyles.measure.window.width,
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
