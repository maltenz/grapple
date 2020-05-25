/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState, useEffect } from 'react';
import { Animated, Vibration, TextInput, AsyncStorage } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { useForm, EventFunction, Controller } from 'react-hook-form';

import { useUpdateSignUserMutation, UserQuery } from '../../generated/graphql';
import { LOGIN_USER } from '../../mutations/user';

import { Panel, AssetStyles, PlaceholderTextColor, Text, Button, VIBRATE_DUR } from '../../assets';

import {
  ErrorInputInterpolationConfig,
  ErrorTextStyles,
  REQUIRED_TEXT,
  SmallTextConfig,
} from '../../assets/components/base/Text';

type LoginFormData = {
  email: string;
  password: string;
};

const LoginForm: FC = () => {
  const [loginUser] = useMutation(LOGIN_USER);
  const { control, handleSubmit, errors } = useForm<LoginFormData>();
  const [updateSignUser] = useUpdateSignUserMutation();

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

  const errorEmailHeight = animEmailError.interpolate(ErrorInputInterpolationConfig);
  const errorPasswordHeight = animPasswordError.interpolate(ErrorInputInterpolationConfig);

  const onChange = (args: any[]): EventFunction => args[0].nativeEvent.text;

  const onSubmit = ({ email, password }: LoginFormData): void => {
    const auth = async (): Promise<void> => {
      const { data } = await loginUser({ variables: { email, password } });

      if (data?.loginUser) {
        const { id: myId, name: myName, email: myEmail }: UserQuery = data.loginUser;
        await AsyncStorage.setItem('token', data.loginUser.token);
        updateSignUser({
          variables: { input: { userId: myId || '', name: myName, email: myEmail } },
        });
      }
    };
    auth();
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
        autoCompleteType="email"
        keyboardType="email-address"
        autoCapitalize="none"
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
        autoCompleteType="password"
        autoCapitalize="none"
        secureTextEntry
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

export default LoginForm;
