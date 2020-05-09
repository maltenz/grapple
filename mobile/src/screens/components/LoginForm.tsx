/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState, useEffect } from 'react';
import { Animated, Vibration, TextInput } from 'react-native';
import { useLazyQuery } from '@apollo/react-hooks';
import { useForm, EventFunction, Controller } from 'react-hook-form';

import {
  Panel,
  AssetStyles,
  PlaceholderTextColor,
  Text,
  Button,
  VIBRATE_DUR,
} from '../../components';

import { GET_USER_BY_EMAIL } from '../../api';

import {
  ErrorInputInterpolationConfig,
  ErrorTextStyles,
  REQUIRED_TEXT,
  SmallTextConfig,
} from '../../components/base/Text';

type LoginFormData = {
  email: string;
  password: string;
};

const LoginForm: FC = () => {
  const [getUserByEmail] = useLazyQuery(GET_USER_BY_EMAIL);
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

  const errorEmailHeight = animEmailError.interpolate(ErrorInputInterpolationConfig);
  const errorPasswordHeight = animPasswordError.interpolate(ErrorInputInterpolationConfig);

  const onChange = (args: any[]): EventFunction => args[0].nativeEvent.text;

  const onSubmit = ({ email }: LoginFormData): void => {
    getUserByEmail({ variables: { email } });
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
