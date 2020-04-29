/* eslint-disable global-require */
import React, { useState, FC } from 'react';
import { Text as RnText, StyleProp, TextStyle } from 'react-native';
import { AppLoading } from 'expo';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Font from 'expo-font';
import { ColorType } from '../../types';
import { AssetStyles } from '../../assets/styles';
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
}

const fetchFonts = (): Promise<void> => {
  return Font.loadAsync({
    'roboto-regular': require('../../assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('../../assets/fonts/Roboto-Bold.ttf'),
  });
};

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
  margin,
  marginHorizontal,
  marginVertical,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const textStyles = { fontFamily: 'roboto-regular' };

  Object.assign(textStyles, AssetStyles.text[type]);

  switch (type) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
      Object.assign(textStyles, { fontFamily: 'roboto-bold' });
      break;
    default:
      Object.assign(textStyles, { fontFamily: 'roboto-regular' });
  }

  if (color) {
    Object.assign(textStyles, { color: Color[color] });
  }

  if (bold) {
    Object.assign(textStyles, { fontFamily: 'roboto-bold' });
  }

  if (regular) {
    Object.assign(textStyles, { fontFamily: 'roboto-regular' });
  }

  if (uppercase) {
    Object.assign(textStyles, { textTransform: 'uppercase' });
  }

  if (textAlign) {
    Object.assign(textStyles, { textAlign });
  }

  if (minLineHeight) {
    Object.assign(textStyles, { lineHeight: AssetStyles.text[type].fontSize * 1.1 });
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
  return (
    <RnText onPress={onPress} style={[textStyles, style]}>
      {children}
    </RnText>
  );
};

export default Text;
