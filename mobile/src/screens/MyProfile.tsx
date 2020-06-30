import React, { FC, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import emojiFlags from 'emoji-flags';

import {
  Navigation,
  NavigationIcon,
  Button,
  AssetStyles,
  Panel,
  Text,
  Award,
  Excerpt,
} from '../assets';

import { NavigationHeading, NavigationHeight } from '../assets/components/base/Navigation';

import { ChildNavigationProp } from './HomeRoot';
import { AwardsEnum } from '../generated/graphql';
import ProfileBackground from './components/ProfileBackground';

const TITLE = 'Why read motivational sayings? ';
const CONTENT =
  'For motivation! You might need a bit, if you can use last year’s list of goals this year because it’s as good as new. All of us can benefit from inspirational thoughts, so here are ten great ones.';

const HERO_DIMENSIONS = AssetStyles.measure.window.width;

const MyProfile: FC = () => {
  const navigation = useNavigation<ChildNavigationProp>();
  const inset = useSafeArea();
  const [flag] = useState(emojiFlags.countryCode('NZ').emoji);

  return (
    <Panel flex={1} backgroundColor="white">
      <Navigation
        mode="day"
        Left={<NavigationIcon mode="day" type="back" onPress={(): void => navigation.goBack()} />}
        Center={<NavigationHeading mode="day" text="My profile" />}
        Right={
          <Button
            mode="day"
            onPress={(): void => navigation.navigate('MyProfileEdit')}
            appearance="dark"
            type="normal"
            style={{ marginBottom: 0 }}
          >
            Edit
          </Button>
        }
      />
      <ProfileBackground />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: AssetStyles.measure.window.width - NavigationHeight - inset.top,
          paddingBottom: inset.bottom + AssetStyles.measure.space,
        }}
      >
        <Panel backgroundColor="white" padding>
          {/* <Text mode="day" appearance="normal" type="h4" bold>
            Malte Boeing
          </Text> */}
          <Button
            type="normal"
            appearance="disabled"
            mode="day"
            style={{ alignSelf: 'flex-start' }}
            marginBottom
          >
            {`${flag} Wellington`}
          </Button>
          <Text mode="day" appearance="normal" type="small" marginBottom={1.5}>
            Many people has the notion that enlightenment is one state. Many also believe that when
            it is attained, a person is forever in that state.
          </Text>
          <Text mode="day" appearance="normal" type="h4" bold marginBottom={0.25}>
            Shared stories
          </Text>
          <ScrollView
            horizontal
            style={styles.excerptContainer}
            showsHorizontalScrollIndicator={false}
          >
            <Excerpt title={TITLE} content={CONTENT} />
            <Excerpt title={TITLE} content={CONTENT} />
            <Excerpt title={TITLE} content={CONTENT} />
          </ScrollView>
          <Button
            type="normal"
            appearance="normal"
            mode="day"
            style={{ alignSelf: 'flex-end' }}
            marginBottom
            outline
          >
            See all
          </Button>
          <Text mode="day" appearance="normal" type="h4" bold marginBottom={0.25}>
            Characteristic
          </Text>
          <Panel row marginHorizontal={-0.25} marginBottom={0.5} marginTop>
            <Award panel type={AwardsEnum.Angel} />
            <Award panel type={AwardsEnum.Brave} />
            <Award panel type={AwardsEnum.Calming} />
          </Panel>
          <Panel row marginHorizontal={-0.25} marginBottom={0.5}>
            <Award panel type={AwardsEnum.Chatty} />
            <Award panel type={AwardsEnum.Funny} />
            <Award panel type={AwardsEnum.Helpful} />
          </Panel>
          <Panel row marginHorizontal={-0.25} marginBottom={0.5}>
            <Award panel type={AwardsEnum.Honest} />
            <Award panel type={AwardsEnum.Smart} />
            <Award panel type={AwardsEnum.Survivor} />
          </Panel>
        </Panel>
      </ScrollView>
    </Panel>
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
  excerptContainer: {
    overflow: 'visible',
    marginTop: AssetStyles.measure.space / 2,
  },
});

export default MyProfile;
