import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Camera from './Camera';

const Stack = createStackNavigator();

const CreateRoot: FC = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Create" component={Camera} />
    </Stack.Navigator>
  );
};

export default CreateRoot;
