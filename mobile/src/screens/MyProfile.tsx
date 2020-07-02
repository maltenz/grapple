import React, { FC, useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import emojiFlags from 'emoji-flags';

import { useLazyQuery } from '@apollo/react-hooks';
import { useSelector } from 'react-redux';

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
import { AwardsEnum, Award as AwardType } from '../generated/graphql';
import ProfileBackground from './components/ProfileBackground';
import { AWARDS } from '../queries/award';
import { authUserSelector } from '../store';

const TITLE = 'Why read motivational sayings? ';
const CONTENT =
  'For motivation! You might need a bit, if you can use last year’s list of goals this year because it’s as good as new. All of us can benefit from inspirational thoughts, so here are ten great ones.';

const HERO_DIMENSIONS = AssetStyles.measure.window.width;

const MyProfile: FC = () => {
  const navigation = useNavigation<ChildNavigationProp>();
  const inset = useSafeArea();
  const [getAwards, { data }] = useLazyQuery(AWARDS);
  const authUser = useSelector(authUserSelector);
  const [flag] = useState(emojiFlags.countryCode('NZ').emoji);
  const [angelCount, setAngelCount] = useState<number>(0);
  const [braveCount, setBraveCount] = useState<number>(0);
  const [calmingCount, setCalmingCount] = useState<number>(0);
  const [chattyCount, setChattyCount] = useState<number>(0);
  const [funnyCount, setFunnyCount] = useState<number>(0);
  const [helpfulCount, setHelpfulCount] = useState<number>(0);
  const [honestCount, setHonestCount] = useState<number>(0);
  const [smartCount, setSmartCount] = useState<number>(0);
  const [survivorCount, setSurvivorCount] = useState<number>(0);

  useEffect(() => {
    getAwards({ variables: { owner: authUser.id } });
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      data.awards.forEach((award: AwardType): void => {
        const myAward = award.award;

        switch (myAward) {
          case AwardsEnum.Angel:
            setAngelCount(angelCount + 1);
            break;
          case AwardsEnum.Brave:
            setBraveCount(braveCount + 1);
            break;
          case AwardsEnum.Calming:
            setCalmingCount(calmingCount + 1);
            break;
          case AwardsEnum.Chatty:
            setChattyCount(chattyCount + 1);
            break;
          case AwardsEnum.Funny:
            setFunnyCount(funnyCount + 1);
            break;
          case AwardsEnum.Helpful:
            setHelpfulCount(helpfulCount + 1);
            break;
          case AwardsEnum.Honest:
            setHonestCount(honestCount + 1);
            break;
          case AwardsEnum.Smart:
            setSmartCount(smartCount + 1);
            break;
          case AwardsEnum.Survivor:
            setSurvivorCount(survivorCount + 1);
            break;
          default:
        }
      });
    }
  }, [data]);

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
            <Award panel type={AwardsEnum.Angel} count={angelCount} />
            <Award panel type={AwardsEnum.Brave} count={braveCount} />
            <Award panel type={AwardsEnum.Calming} count={calmingCount} />
          </Panel>
          <Panel row marginHorizontal={-0.25} marginBottom={0.5}>
            <Award panel type={AwardsEnum.Chatty} count={chattyCount} />
            <Award panel type={AwardsEnum.Funny} count={funnyCount} />
            <Award panel type={AwardsEnum.Helpful} count={helpfulCount} />
          </Panel>
          <Panel row marginHorizontal={-0.25} marginBottom={0.5}>
            <Award panel type={AwardsEnum.Honest} count={honestCount} />
            <Award panel type={AwardsEnum.Smart} count={smartCount} />
            <Award panel type={AwardsEnum.Survivor} count={survivorCount} />
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
