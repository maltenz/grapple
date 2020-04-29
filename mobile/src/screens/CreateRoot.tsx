import React, { FC } from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import Camera from './Camera';
import { AppStackParamList } from './AppRoot';

const Stack = createStackNavigator();

type ScreenNavigationProp = StackNavigationProp<AppStackParamList, 'CreateRoot'>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type CreateRootProps = NavProps;

export type CreateRootParamList = {
  Create: undefined;
};

const CreateRoot: FC<CreateRootProps> = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Create" component={Camera} />
    </Stack.Navigator>
  );
};

export default CreateRoot;
