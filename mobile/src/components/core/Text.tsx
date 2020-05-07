import React, { FC } from 'react';
import { Text as RnText, StyleProp, TextStyle } from 'react-native';
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
  underline?: boolean;
  numberOfLines?: number;
}

const PlaceholderTextColor = Color.grey2;

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
  underline,
  numberOfLines,
  margin,
  marginHorizontal,
  marginVertical,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
}) => {
  const textStyles = { fontFamily: AssetStyles.family.regular };

  Object.assign(textStyles, AssetStyles.text[type]);

  switch (type) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
      Object.assign(textStyles, { fontFamily: AssetStyles.family.bold });
      break;
    default:
      Object.assign(textStyles, { fontFamily: AssetStyles.family.regular });
  }

  if (color) {
    Object.assign(textStyles, { color: Color[color] });
  }

  if (bold) {
    Object.assign(textStyles, { fontFamily: AssetStyles.family.bold });
  }

  if (regular) {
    Object.assign(textStyles, { fontFamily: AssetStyles.family.regular });
  }

  if (uppercase) {
    Object.assign(textStyles, { textTransform: 'uppercase' });
  }

  if (textAlign) {
    Object.assign(textStyles, { textAlign });
  }

  if (minLineHeight) {
    Object.assign(textStyles, { lineHeight: AssetStylesMinLineHeight(type) });
  }

  if (underline) {
    Object.assign(textStyles, { textDecorationLine: 'underline' });
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

  return (
    <RnText onPress={onPress} numberOfLines={numberOfLines} style={[textStyles, style]}>
      {children}
    </RnText>
  );
};

export { PlaceholderTextColor };

export default Text;
