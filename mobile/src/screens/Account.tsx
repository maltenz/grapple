import React, { FC } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import {
  AssetStyles,
  MenuItem,
  Color,
  MenuContainer,
  MenuItemAccount,
  SvgTabbarBackgroundHeight,
  MenuItemBuddyFinder,
} from '../components';
import { ProfileItemProps } from './Profile';

const SRC = { uri: 'https://source.unsplash.com/random' };

const TITLE = 'Why read motivational sayings?';
const CONTENT =
  'For motivation! You might need a bit, if you can use last year’s list of goals this year because it’s as good as new. All of us can benefit from inspirational thoughts, so here are ten great ones.';

const BUDDY_ITEM = {
  src: {
    thumbnail: { uri: 'https://source.unsplash.com/random' },
    large: { uri: 'https://source.unsplash.com/random' },
  },
};

const BUDDY: ProfileItemProps[] = [
  {
    ...BUDDY_ITEM,
    name: TITLE,
    excerpt: CONTENT,
    id: '123',
  },
  {
    ...BUDDY_ITEM,
    name: TITLE,
    excerpt: CONTENT,
    id: '231',
  },
  {
    ...BUDDY_ITEM,
    name: TITLE,
    excerpt: CONTENT,
    id: '535',
  },
  {
    ...BUDDY_ITEM,
    name: TITLE,
    excerpt: CONTENT,
    id: '532',
  },
  {
    ...BUDDY_ITEM,
    name: TITLE,
    excerpt: CONTENT,
    id: '523',
  },
];

const Account: FC = () => {
  const inset = useSafeArea();
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={{
        paddingBottom: inset.bottom + SvgTabbarBackgroundHeight,
      }}
    >
      <MenuContainer>
        <MenuItemAccount
          title="My Account"
          subTitle="Malte Boeing"
          onPress={(): void => Alert.alert('press')}
          src={SRC}
        />
      </MenuContainer>
      <MenuContainer>
        <MenuItemBuddyFinder items={BUDDY} />
      </MenuContainer>
      <MenuContainer>
        <MenuItem title="Profile" last onPress={(): void => Alert.alert('press')} />
      </MenuContainer>
      <MenuContainer>
        <MenuItem title="Notifications" onPress={(): void => Alert.alert('press')} />
        <MenuItem title="Security" onPress={(): void => Alert.alert('press')} />
        <MenuItem title="Help" last onPress={(): void => Alert.alert('press')} />
      </MenuContainer>
      <MenuContainer>
        <MenuItem title="Community guidlines" onPress={(): void => Alert.alert('press')} />
        <MenuItem title="Privacy" onPress={(): void => Alert.alert('press')} />
        <MenuItem title="Terms" last onPress={(): void => Alert.alert('press')} />
      </MenuContainer>
    </ScrollView>
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
