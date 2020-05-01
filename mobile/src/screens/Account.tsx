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
} from '../components';

const SRC = { uri: 'https://source.unsplash.com/philipegd' };

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
