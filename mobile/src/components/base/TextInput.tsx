import React, { FC } from 'react';
import Text from '../core/Text';
import { ModeType, ColorType } from '..';
import { AssetStyles } from '../../assets/styles';
import { Color } from '../../assets/colors';
import { MarginProps } from './Panel';

interface TextInputProps extends MarginProps {
  mode: ModeType;
  value: string;
  placeholder?: string;
  placeholderTextColor?: ColorType;
  onChangeText: (text: string) => void;
  autoCorrect?: boolean;
}

const TextInput: FC<TextInputProps> = ({
  mode,
  value,
  placeholder,
  onChangeText,
  autoCorrect,
  ...rest
}) => {
  return (
    <Text
      textInput
      type="p"
      bold
      value={value}
      color={mode === 'day' ? 'red' : 'blue'}
      placeholder={placeholder}
      placeholderTextColor={mode === 'day' ? 'grey2' : 'red'}
      onChangeText={onChangeText}
      autoCorrect={autoCorrect}
      {...rest}
      style={[styles.input, { borderBottomColor: mode === 'day' ? Color.red : Color.blue }]}
    />
  );
};

const styles = {
  input: {
    paddingVertical: AssetStyles.measure.space / 2,
    borderBottomWidth: 2,
    marginLeft: 0,
    marginRight: 0,
  },
};

export default TextInput;
