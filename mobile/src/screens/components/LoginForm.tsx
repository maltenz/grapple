import React, { FC } from 'react';
import { Alert, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

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

const LoginForm: FC = () => {
  const { control, handleSubmit, errors } = useForm<FormData>();

  const onSubmit = (data: FormData): void => Alert.alert('Form Data', JSON.stringify(data));

  const SmallTextConfig: TextProps = {
    mode: 'day',
    appearance: 'heavy',
    type: 'small',
    bold: true,
  };

  return (
    <Panel marginHorizontal>
      <Panel row marginBottom={1.5}>
        <Button mode="day" appearance="strong" type="normal" marginRight={0.5} style={{ flex: 1 }}>
          Login
        </Button>
        <Button
          mode="day"
          appearance="strong"
          type="normal"
          outline
          marginLeft={0.5}
          style={{ flex: 1 }}
        >
          Register
        </Button>
      </Panel>
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

export default LoginForm;
