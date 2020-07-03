import React, { FC, useState } from 'react';
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

import { AWARD_METRICS } from '../queries/award';
import { AUTH_PROFILE } from '../queries/profile';

import { NavigationHeading, NavigationHeight } from '../assets/components/base/Navigation';

import { ChildNavigationProp } from './HomeRoot';
import { AwardsEnum, AwardMetrics, Profile, Post } from '../generated/graphql';
import ProfileBackground from './components/ProfileBackground';

const MyProfile: FC = () => {
  const navigation = useNavigation<ChildNavigationProp>();
  const inset = useSafeArea();
  const { data } = useQuery<{ authProfile: Profile }>(AUTH_PROFILE);
  const { data: metricsData } = useQuery<{ awardMetrics: AwardMetrics }>(AWARD_METRICS);
  const [flag] = useState(emojiFlags.countryCode('NZ').emoji);

  let profile = {} as Profile;
  let metrics = {} as AwardMetrics;

  if (data?.authProfile) {
    profile = data.authProfile;
  }

  if (metricsData?.awardMetrics) {
    metrics = metricsData.awardMetrics;
  }

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
          {profile.bio && (
            <Text mode="day" appearance="normal" type="small" marginBottom={1.5}>
              {profile.bio}
            </Text>
          )}
          {profile.posts && (
            <>
              <Text mode="day" appearance="normal" type="h4" bold marginBottom={0.25}>
                Public stories
              </Text>
              <ScrollView
                horizontal
                style={styles.excerptContainer}
                showsHorizontalScrollIndicator={false}
              >
                {profile.posts.map(({ id, shots }: Post) => (
                  <Excerpt
                    key={id}
                    title={shots[0]?.title as string}
                    content={shots[0]?.content as string}
                    src={{ uri: shots[0]?.image as string }}
                  />
                ))}
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
            </>
          )}
          <Text mode="day" appearance="normal" type="h4" bold marginBottom={0.25}>
            Characteristic
          </Text>
          <Panel row marginHorizontal={-0.25} marginBottom={0.5} marginTop>
            <Award panel type={AwardsEnum.Angel} count={metrics.angel?.count as number} />
            <Award panel type={AwardsEnum.Brave} count={metrics.brave?.count as number} />
            <Award panel type={AwardsEnum.Calming} count={metrics.calming?.count as number} />
          </Panel>
          <Panel row marginHorizontal={-0.25} marginBottom={0.5}>
            <Award panel type={AwardsEnum.Chatty} count={metrics.chatty?.count as number} />
            <Award panel type={AwardsEnum.Funny} count={metrics.funny?.count as number} />
            <Award panel type={AwardsEnum.Helpful} count={metrics.helpful?.count as number} />
          </Panel>
          <Panel row marginHorizontal={-0.25} marginBottom={0.5}>
            <Award panel type={AwardsEnum.Honest} count={metrics.honest?.count as number} />
            <Award panel type={AwardsEnum.Smart} count={metrics.smart?.count as number} />
            <Award panel type={AwardsEnum.Survivor} count={metrics.survivor?.count as number} />
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
