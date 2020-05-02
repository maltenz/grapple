import React, { FC } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Panel, Text } from '../components';
import { AccountRootParamList } from './AccountRoot';

type ScreenNavigationProp = StackNavigationProp<AccountRootParamList, 'MyProfile'>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type MyPostProps = NavProps;

const MyProfile: FC<MyPostProps> = () => {
  return (
    <Panel center>
      <Text mode="day" appearance="normal" type="h3">
        My Profile
      </Text>
    </Panel>
  );
};

export default MyProfile;
