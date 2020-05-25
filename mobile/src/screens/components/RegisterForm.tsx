/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, FC } from 'react';
import { Vibration, Animated, TextInput, AsyncStorage } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { useForm, EventFunction, Controller } from 'react-hook-form';

import { CREATE_USER } from '../../mutations/user';
import { useUpdateSignUserMutation, UserQuery } from '../../generated/graphql';

import { Panel, AssetStyles, PlaceholderTextColor, Button, VIBRATE_DUR } from '../../assets';

import {
  ErrorInputInterpolationConfig,
  ErrorTextStyles,
  REQUIRED_TEXT,
} from '../../assets/components/base/Text';

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const RegisterForm: FC = () => {
  const [createUser] = useMutation(CREATE_USER);
  const { control, handleSubmit, errors } = useForm<RegisterFormData>();
  const [updateSignUser] = useUpdateSignUserMutation();
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

  const errorUsernameHeight = animUsernameError.interpolate(ErrorInputInterpolationConfig);
  const errorEmailHeight = animEmailError.interpolate(ErrorInputInterpolationConfig);
  const errorPasswordHeight = animPasswordError.interpolate(ErrorInputInterpolationConfig);
  const errorPasswordConfirmHeight = animPasswordConfirmError.interpolate(
    ErrorInputInterpolationConfig
  );

  const onChange = (args: any[]): EventFunction => args[0].nativeEvent.text;

  const onSubmit = ({ username, email, password }: RegisterFormData): void => {
    createUser({ variables: { name: username, email, password } });

    const auth = async (): Promise<void> => {
      const { data } = await createUser({ variables: { name: username, email, password } });

      if (data?.createUser) {
        const { id: myId, name: myName, email: myEmail }: UserQuery = data.createUser;
        await AsyncStorage.setItem('token', data.createUser.token);
        updateSignUser({
          variables: { input: { userId: myId || '', name: myName, email: myEmail } },
        });
      }
    };
    auth();
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
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Animated.Text style={[ErrorTextStyles, { height: errorEmailHeight }]}>
        {REQUIRED_TEXT}
      </Animated.Text>
      <Controller
        as={TextInput}
        control={control}
        name="email"
        autoCompleteType="email"
        keyboardType="email-address"
        autoCapitalize="none"
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
        autoCompleteType="password"
        autoCapitalize="none"
        secureTextEntry
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
        autoCompleteType="password"
        autoCapitalize="none"
        secureTextEntry
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

export default RegisterForm;
