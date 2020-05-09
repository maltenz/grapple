import React, { FC, useState } from 'react';
import { ScrollView } from 'react-native';
import { Panel, Button } from '../../assets';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Authentication: FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <>
      <Panel row marginHorizontal marginBottom={1.5}>
        <Button
          mode="day"
          appearance="strong"
          outline={currentIndex !== 0}
          type="normal"
          marginRight={0.5}
          style={{ flex: 1 }}
          onPress={(): void => setCurrentIndex(0)}
        >
          Login
        </Button>
        <Button
          mode="day"
          appearance="strong"
          type="normal"
          outline={currentIndex !== 1}
          marginLeft={0.5}
          style={{ flex: 1 }}
          onPress={(): void => setCurrentIndex(1)}
        >
          Register
        </Button>
      </Panel>
      <ScrollView>{currentIndex === 0 ? <LoginForm /> : <RegisterForm />}</ScrollView>
    </>
  );
};

export default Authentication;
