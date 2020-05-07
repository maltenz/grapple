import React, { FC } from 'react';
import { Alert, TextInput } from 'react-native';
import { useForm, Controller, FormContextValues } from 'react-hook-form';

import { Panel, Button, Text, AssetStyles, PlaceholderTextColor } from '../../components';

const LoginForm: FC = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: 'hello@malte.nz',
      password: '',
    },
  });

  const onSubmit = (data: FormContextValues): void =>
    Alert.alert('Form Data', JSON.stringify(data));

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
      <Controller
        as={TextInput}
        control={control}
        name="email"
        onChange={(args): void => args[0].nativeEvent.text}
        rules={{ required: true }}
        defaultValue=""
        placeholder="email"
        style={AssetStyles.form.input}
      />
      <Controller
        as={TextInput}
        control={control}
        name="password"
        onChange={(args): void => args[0].nativeEvent.text}
        rules={{ required: true }}
        defaultValue=""
        placeholder="Password"
        style={AssetStyles.form.input}
        placeholderTextColor={PlaceholderTextColor}
      />
      <Text
        mode="day"
        appearance="heavy"
        type="small"
        bold
        marginTop={0.5}
        textAlign="right"
        style={{ width: '100%' }}
        marginBottom={2}
      >
        Forgot password
      </Text>
      <Button mode="day" appearance="strong" type="large" onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </Panel>
  );
};

export default LoginForm;
