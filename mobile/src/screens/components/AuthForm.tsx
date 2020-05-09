/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState, useEffect } from 'react';
import { TextInput, Animated, Vibration, ScrollView, Alert } from 'react-native';
import { useForm, Controller, EventFunction } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';

import {
  Panel,
  Button,
  Text,
  TextProps,
  AssetStyles,
  PlaceholderTextColor,
  Color,
} from '../../components';
import { CREATE_USER } from '../../api';

type LoginFormData = {
  email: string;
  password: string;
};

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const SmallTextConfig: TextProps = {
  mode: 'day',
  appearance: 'heavy',
  type: 'small',
  bold: true,
};

const ErrorTextStyles = {
  overflow: 'hidden',
  ...AssetStyles.text.small,
  color: Color.red,
  fontFamily: AssetStyles.family.regular,
};

const REQUIRED_TEXT = 'This is required';

const VIBRATE_DUR = 500;

const InputInterpolationConfig = {
  inputRange: [0, 1],
  outputRange: [0, 20],
};

const Login: FC = () => {
  const { control, handleSubmit, errors } = useForm<LoginFormData>();
  const [animEmailError] = useState(new Animated.Value(0));
  const [animPasswordError] = useState(new Animated.Value(0));

  useEffect(() => {
    ErrorAnim(animEmailError, errors.email);
    ErrorAnim(animPasswordError, errors.password);

    if (Object.keys(errors).length) {
      Vibration.vibrate(VIBRATE_DUR);
    }
  }, [errors]);

  const ErrorAnim = (animValue: Animated.Value, errorSelector: any): void => {
    Animated.timing(animValue, {
      toValue: errorSelector ? 1 : 0,
      duration: 600,
    }).start();
  };

  const errorEmailHeight = animEmailError.interpolate(InputInterpolationConfig);
  const errorPasswordHeight = animPasswordError.interpolate(InputInterpolationConfig);

  const onChange = (args: any[]): EventFunction => args[0].nativeEvent.text;

  const onSubmit = (data: LoginFormData): void => {
    Alert.alert(JSON.stringify(data));
  };

  return (
    <Panel marginHorizontal>
      <Animated.Text style={[ErrorTextStyles, { height: errorEmailHeight }]}>
        {REQUIRED_TEXT}
      </Animated.Text>
      <Controller
        as={TextInput}
        control={control}
        name="email"
        onChange={onChange}
        rules={{ required: true }}
        placeholder="Email"
        style={AssetStyles.form.input}
      />
      <Animated.Text style={[ErrorTextStyles, { height: errorPasswordHeight }]}>
        {REQUIRED_TEXT}
      </Animated.Text>
      <Controller
        as={TextInput}
        control={control}
        name="password"
        onChange={onChange}
        rules={{ required: true }}
        placeholder="Password"
        style={AssetStyles.form.input}
        placeholderTextColor={PlaceholderTextColor}
      />
      <Text {...SmallTextConfig} textAlign="right" marginTop={0.5} style={{ width: '100%' }}>
        Forgot password
      </Text>
      <Button
        marginVertical={2}
        mode="day"
        title="Submit"
        appearance="strong"
        type="large"
        onPress={handleSubmit(onSubmit)}
      />
    </Panel>
  );
};

const Register: FC = () => {
  const [createUser] = useMutation(CREATE_USER);
  const { control, handleSubmit, errors } = useForm<RegisterFormData>();
  const [animUsernameError] = useState(new Animated.Value(0));
  const [animEmailError] = useState(new Animated.Value(0));
  const [animPasswordError] = useState(new Animated.Value(0));
  const [animPasswordConfirmError] = useState(new Animated.Value(0));

  useEffect(() => {
    ErrorAnim(animUsernameError, errors.username);
    ErrorAnim(animEmailError, errors.email);
    ErrorAnim(animPasswordError, errors.password);
    ErrorAnim(animPasswordConfirmError, errors.passwordConfirm);

    if (Object.keys(errors).length) {
      Vibration.vibrate(VIBRATE_DUR);
    }
  }, [errors]);

  const ErrorAnim = (animValue: Animated.Value, errorSelector: any): void => {
    Animated.timing(animValue, {
      toValue: errorSelector ? 1 : 0,
      duration: 600,
    }).start();
  };

  const errorUsernameHeight = animUsernameError.interpolate(InputInterpolationConfig);
  const errorEmailHeight = animEmailError.interpolate(InputInterpolationConfig);
  const errorPasswordHeight = animPasswordError.interpolate(InputInterpolationConfig);
  const errorPasswordConfirmHeight = animPasswordConfirmError.interpolate(InputInterpolationConfig);

  const onChange = (args: any[]): EventFunction => args[0].nativeEvent.text;

  const onSubmit = ({ username, email, password }: RegisterFormData): void => {
    createUser({ variables: { name: username, email, password } });
  };

  return (
    <Panel marginHorizontal>
      <Animated.Text style={[ErrorTextStyles, { height: errorUsernameHeight }]}>
        {REQUIRED_TEXT}
      </Animated.Text>
      <Controller
        as={TextInput}
        control={control}
        name="username"
        onChange={onChange}
        rules={{ required: true }}
        placeholder="Username"
        style={AssetStyles.form.input}
      />
      <Animated.Text style={[ErrorTextStyles, { height: errorEmailHeight }]}>
        {REQUIRED_TEXT}
      </Animated.Text>
      <Controller
        as={TextInput}
        control={control}
        name="email"
        onChange={onChange}
        rules={{ required: true }}
        placeholder="Email"
        style={AssetStyles.form.input}
      />
      <Animated.Text style={[ErrorTextStyles, { height: errorPasswordHeight }]}>
        {REQUIRED_TEXT}
      </Animated.Text>
      <Controller
        as={TextInput}
        control={control}
        name="password"
        onChange={onChange}
        rules={{ required: true }}
        placeholder="Password"
        style={AssetStyles.form.input}
        placeholderTextColor={PlaceholderTextColor}
      />
      <Animated.Text style={[ErrorTextStyles, { height: errorPasswordConfirmHeight }]}>
        {REQUIRED_TEXT}
      </Animated.Text>
      <Controller
        as={TextInput}
        control={control}
        name="passwordConfirm"
        onChange={onChange}
        rules={{ required: true }}
        placeholder="Confirm password"
        style={AssetStyles.form.input}
        placeholderTextColor={PlaceholderTextColor}
      />
      <Button
        marginVertical={2}
        mode="day"
        title="Submit"
        appearance="strong"
        type="large"
        onPress={handleSubmit(onSubmit)}
      />
    </Panel>
  );
};

const AuthForm: FC = () => {
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
      <ScrollView>{currentIndex === 0 ? <Login /> : <Register />}</ScrollView>
    </>
  );
};

export default AuthForm;
