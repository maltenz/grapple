import React, { FC } from 'react';
import { ScrollView, StyleSheet, Alert, AsyncStorage } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { useDispatch } from 'react-redux';
import {
  AssetStyles,
  MenuItem,
  Color,
  Container,
  MenuItemAccount,
  SvgTabbarBackgroundHeight,
  Navigation,
  NavigationIcon,
} from '../assets';

import { ParentNavigationProp, ChildNavigationProp } from './HomeRoot';

import MenuItemBuddyFinder from './components/MenuItemBuddyFinder';
import { NavigationHeading } from '../assets/components/base/Navigation';
import { updateUser } from '../store';

const SRC = { uri: 'https://source.unsplash.com/random' };

const Account: FC = () => {
  const inset = useSafeArea();
  const dispatch = useDispatch();
  const parentNavigation = useNavigation<ParentNavigationProp>();
  const navigation = useNavigation<ChildNavigationProp>();

  return (
    <>
      <Navigation
        mode="day"
        Left={
          <NavigationIcon
            mode="day"
            type="search"
            onPress={(): void => parentNavigation.navigate('Search')}
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
            onPress={(): void => navigation.navigate('MyProfile')}
            src={SRC}
          />
        </Container>
        <Container>
          <MenuItemBuddyFinder />
        </Container>
        <Container>
          <MenuItem title="Notifications" onPress={(): void => Alert.alert('press')} />
          <MenuItem title="Security" onPress={(): void => Alert.alert('press')} />
          <MenuItem title="Help" onPress={(): void => Alert.alert('press')} />
          <MenuItem
            title="Logout"
            last
            onPress={async (): Promise<void> => {
              await AsyncStorage.removeItem('token');
              dispatch(updateUser({ id: '', name: '', email: '', password: '' }));
            }}
          />
        </Container>
        <Container>
          <MenuItem title="Community Guidelines" onPress={(): void => Alert.alert('press')} />
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
