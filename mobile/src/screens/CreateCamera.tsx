import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import Camera from './components/Camera';
import { ChildNavigationProp } from './HomeRoot';

const CameraCreate: FC = () => {
  const navigation = useNavigation<ChildNavigationProp>();

  return <Camera next={(): void => navigation.navigate('CreatePost')} />;
};

export default CameraCreate;
