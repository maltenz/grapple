import React, { FC } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  AssetStyles,
  MenuItem,
  Color,
  MenuContainer,
  MenuItemAccount,
  SvgTabbarBackgroundHeight,
  Navigation,
  NavigationIcon,
} from '../components';
import MenuItemBuddyFinder from './components/MenuItemBuddyFinder';
import { AccountRootNavigationProp } from './AccountRoot';
import { NavigationHeading } from '../components/base/Navigation';

const SRC = { uri: 'https://source.unsplash.com/random' };

const Account: FC = () => {
  const inset = useSafeArea();
  const navigation = useNavigation<AccountRootNavigationProp>();

  return (
    <>
      <Navigation
        mode="day"
        Left={
          <NavigationIcon
            mode="day"
            type="search"
            onPress={(): void => navigation.navigate('CreateRoot')}
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
        <MenuContainer>
          <MenuItemAccount
            title="My Account"
            subTitle="Malte Boeing"
            onPress={(): void => Alert.alert('press')}
            src={SRC}
          />
        </MenuContainer>
        <MenuContainer>
          <MenuItemBuddyFinder />
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
