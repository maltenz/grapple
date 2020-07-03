import React, { FC, useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import emojiFlags from 'emoji-flags';

import { useQuery } from '@apollo/react-hooks';

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
import { AwardsEnum, AwardMetrics } from '../generated/graphql';
import ProfileBackground from './components/ProfileBackground';
import { AWARD_METRICS } from '../queries/award';
// import { GET_PROFILE } from '../queries/profile';

const TITLE = 'Why read motivational sayings? ';
const CONTENT =
  'For motivation! You might need a bit, if you can use last year’s list of goals this year because it’s as good as new. All of us can benefit from inspirational thoughts, so here are ten great ones.';

const MyProfile: FC = () => {
  const navigation = useNavigation<ChildNavigationProp>();
  const inset = useSafeArea();
  // const { data } = useQuery(GET_PROFILE);
  const { data: metricsData, refetch } = useQuery<{ awardMetrics: AwardMetrics }>(AWARD_METRICS);
  const [awardMetrics, setAwardMetrics] = useState<AwardMetrics>({});
  const [flag] = useState(emojiFlags.countryCode('NZ').emoji);

  useEffect(() => {
    if (metricsData !== undefined) {
      setAwardMetrics(metricsData.awardMetrics);
    }
  }, [metricsData]);

  useEffect(() => {
    refetch();
  }, []);

  const { angel, brave, calming, chatty, funny, helpful, honest, smart, survivor } = awardMetrics;

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
            <Award panel type={AwardsEnum.Angel} count={angel?.count as number} />
            <Award panel type={AwardsEnum.Brave} count={brave?.count as number} />
            <Award panel type={AwardsEnum.Calming} count={calming?.count as number} />
          </Panel>
          <Panel row marginHorizontal={-0.25} marginBottom={0.5}>
            <Award panel type={AwardsEnum.Chatty} count={chatty?.count as number} />
            <Award panel type={AwardsEnum.Funny} count={funny?.count as number} />
            <Award panel type={AwardsEnum.Helpful} count={helpful?.count as number} />
          </Panel>
          <Panel row marginHorizontal={-0.25} marginBottom={0.5}>
            <Award panel type={AwardsEnum.Honest} count={honest?.count as number} />
            <Award panel type={AwardsEnum.Smart} count={smart?.count as number} />
            <Award panel type={AwardsEnum.Survivor} count={survivor?.count as number} />
          </Panel>
        </Panel>
      </ScrollView>
    </Panel>
  );
};

const styles = StyleSheet.create({
  excerptContainer: {
    overflow: 'visible',
    marginTop: AssetStyles.measure.space / 2,
  },
});

export default MyProfile;
