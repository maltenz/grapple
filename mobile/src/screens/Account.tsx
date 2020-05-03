import React, { FC } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import {
  AssetStyles,
  MenuItem,
  Color,
  Container,
  MenuItemAccount,
  SvgTabbarBackgroundHeight,
  Navigation,
  NavigationIcon,
} from '../components';

import { HomeParentRootNavigationProp, HomeChildRootNavigationProp } from './HomeRoot';

import MenuItemBuddyFinder from './components/MenuItemBuddyFinder';
import { NavigationHeading } from '../components/base/Navigation';

const SRC = { uri: 'https://source.unsplash.com/random' };

const Account: FC = () => {
  const inset = useSafeArea();
  const homeRootNavigation = useNavigation<HomeParentRootNavigationProp>();
  const homeChildNavigation = useNavigation<HomeChildRootNavigationProp>();

  return (
    <>
      <Navigation
        mode="day"
        Left={
          <NavigationIcon
            mode="day"
            type="search"
            onPress={(): void => homeRootNavigation.navigate('CreateRoot')}
          />
        }
        Center={<NavigationHeading mode="day" text="Settings" />}
        Right={<NavigationIcon mode="day" type="chat" onPress={(): void => Alert.alert('test')} />}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingBottom: inset.bottom + SvgTabbarBackgroundHeight,
        }}
      >
        <Container>
          <MenuItemAccount
            title="My Account"
            subTitle="Malte Boeing"
            onPress={(): void => homeChildNavigation.navigate('MyProfile')}
            src={SRC}
          />
        </Container>
        <Container>
          <MenuItemBuddyFinder />
        </Container>
        <Container>
          <MenuItem title="Notifications" onPress={(): void => Alert.alert('press')} />
          <MenuItem title="Security" onPress={(): void => Alert.alert('press')} />
          <MenuItem title="Help" last onPress={(): void => Alert.alert('press')} />
        </Container>
        <Container>
          <MenuItem title="Community guidelines" onPress={(): void => Alert.alert('press')} />
          <MenuItem title="Privacy" onPress={(): void => Alert.alert('press')} />
          <MenuItem title="Terms" last onPress={(): void => Alert.alert('press')} />
        </Container>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop: AssetStyles.measure.space,
    backgroundColor: Color.grey4,
  },
});

export default Account;
