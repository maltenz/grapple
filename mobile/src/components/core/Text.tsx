/* eslint-disable global-require */
import React, { useState, FC, createRef } from 'react';
import { Text as RnText, StyleProp, TextStyle, TextInput } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { ColorType } from '../../types';
import { AssetStyles, minLineheight as AssetStylesMinLineHeight } from '../../assets/styles';
import { Color } from '../../assets/colors';
import { MarginProps, measure } from '../base/Panel';

export type TextType = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small' | 'mini';
export type TextAlignType = 'left' | 'right' | 'center';

export interface TextProps extends MarginProps {
  style?: StyleProp<TextStyle>;
  type: TextType;
  color?: ColorType;
  bold?: boolean;
  regular?: boolean;
  uppercase?: boolean;
  textAlign?: TextAlignType;
  onPress?: () => void;
  minLineHeight?: boolean;
  textInput?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  autoCorrect?: boolean;
}

const fetchFonts = (): Promise<void> => {
  return Font.loadAsync({
    'roboto-regular': require('../../assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('../../assets/fonts/Roboto-Bold.ttf'),
  });
};

const fontRegular = 'roboto-regular';
const fontBold = 'roboto-bold';

const Text: FC<TextProps> = ({
  children,
  style,
  type,
  color,
  bold,
  regular,
  uppercase,
  textAlign,
  onPress,
  minLineHeight,
  textInput,
  value,
  onChangeText,
  autoCorrect,
  margin,
  marginHorizontal,
  marginVertical,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
}) => {
  const inputRef = createRef<TextInput>();

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const textStyles = { fontFamily: fontRegular };

  Object.assign(textStyles, AssetStyles.text[type]);

  switch (type) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
      Object.assign(textStyles, { fontFamily: fontBold });
      break;
    default:
      Object.assign(textStyles, { fontFamily: fontRegular });
  }

  if (color) {
    Object.assign(textStyles, { color: Color[color] });
  }

  if (bold) {
    Object.assign(textStyles, { fontFamily: fontBold });
  }

  if (regular) {
    Object.assign(textStyles, { fontFamily: fontRegular });
  }

  if (uppercase) {
    Object.assign(textStyles, { textTransform: 'uppercase' });
  }

  if (textAlign) {
    Object.assign(textStyles, { textAlign });
  }

  if (minLineHeight || textInput) {
    Object.assign(textStyles, { lineHeight: AssetStylesMinLineHeight(type) });
  }

  if (margin) {
    Object.assign(textStyles, { margin: measure(margin) });
  }

  if (marginHorizontal) {
    Object.assign(textStyles, { marginHorizontal: measure(marginHorizontal) });
  }

  if (marginVertical) {
    Object.assign(textStyles, { marginVertical: measure(marginVertical) });
  }

  if (marginTop) {
    Object.assign(textStyles, { marginTop: measure(marginTop) });
  }

  if (marginRight) {
    Object.assign(textStyles, { marginRight: measure(marginRight) });
  }

  if (marginBottom) {
    Object.assign(textStyles, { marginBottom: measure(marginBottom) });
  }

  if (marginLeft) {
    Object.assign(textStyles, { marginLeft: measure(marginLeft) });
  }

  if (!fontsLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={(): void => setFontsLoaded(true)} />;
  }

  if (textInput) {
    return (
      <TextInput
        autoCorrect={autoCorrect}
        value={value}
        onChangeText={onChangeText}
        ref={inputRef}
        style={[textStyles, style]}
      />
    );
  }

  return (
    <RnText onPress={onPress} style={[textStyles, style]}>
      {children}
    </RnText>
  );
};

export { fontRegular, fontBold };

export default Text;
