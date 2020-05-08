import React, { FC, useState, ReactNode } from 'react';
import { Alert, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import SideSwipe from 'react-native-sideswipe';

import {
  Panel,
  Button,
  Text,
  TextProps,
  AssetStyles,
  PlaceholderTextColor,
} from '../../components';

type FormData = {
  email: string;
  password: string;
};

const SmallTextConfig: TextProps = {
  mode: 'day',
  appearance: 'heavy',
  type: 'small',
  bold: true,
};

const Login: FC = () => {
  const { control, handleSubmit, errors } = useForm<FormData>();

  const onSubmit = (data: FormData): void => Alert.alert('Form Data', JSON.stringify(data));
  return (
    <Panel
      marginHorizontal
      style={{ width: AssetStyles.measure.window.width - AssetStyles.measure.space * 2 }}
    >
      {errors.email && <Text {...SmallTextConfig}>This is required.</Text>}
      <Controller
        as={TextInput}
        control={control}
        name="email"
        onChange={(args): void => args[0].nativeEvent.text}
        rules={{ required: true }}
        placeholder="email"
        style={AssetStyles.form.input}
      />
      {errors.password && <Text {...SmallTextConfig}>This is required.</Text>}
      <Controller
        as={TextInput}
        control={control}
        name="password"
        onChange={(args): void => args[0].nativeEvent.text}
        rules={{ required: true }}
        placeholder="Password"
        style={AssetStyles.form.input}
        placeholderTextColor={PlaceholderTextColor}
      />
      <Text
        {...SmallTextConfig}
        textAlign="right"
        marginBottom={2}
        marginTop={0.5}
        style={{ width: '100%' }}
      >
        Forgot password
      </Text>
      <Button
        mode="day"
        title="Submit"
        appearance="strong"
        type="large"
        onPress={handleSubmit(onSubmit)}
      />
    </Panel>
  );
};

const LoginForm: FC = () => {
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
      <SideSwipe
        index={currentIndex}
        itemWidth={AssetStyles.measure.window.width}
        style={{ width: AssetStyles.measure.window.width }}
        data={[{ title: 'test' }, { title: 'test2' }]}
        onIndexChange={(index): void => setCurrentIndex(index)}
        renderItem={(): ReactNode => <Login />}
      />
    </>
  );
};

export default LoginForm;
