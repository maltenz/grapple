import React, { FC } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ColorType } from '../../types';
import Panel, { PanelProps } from '../base/Panel';
import Text, { TextType } from './Text';
import { Color } from '../../assets/colors';

export type ButtonType = 'large' | 'normal' | 'small';
export type ButtonOutline = boolean | ColorType;

interface ButtonProps extends PanelProps {
  type?: ButtonType;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  color?: ColorType;
  outline?: ButtonOutline;
}

const ButtonLargeHeight = 72;
const ButtonNormalHeight = 36;
const ButtonSmallHeight = 28;

const Button: FC<ButtonProps> = ({ children, type, style, color, outline, ...rest }) => {
  const buttonStyles = {};
  let textType: TextType = 'small';
  let borderWidth = 0;

  const borderColor = (value: ColorType | boolean | undefined): string | ColorType | null => {
    switch (typeof value) {
      case 'string':
        return Color[value];
      case 'boolean':
        return color ? Color[color] : null;
      default: {
        return null;
      }
    }
  };

  switch (type) {
    case 'large':
      Object.assign(buttonStyles, {
        height: ButtonLargeHeight,
        borderRadius: ButtonLargeHeight / 2,
      });
      textType = 'h3';
      if (outline) {
        borderWidth = 4;
      }
      break;
    case 'small':
      Object.assign(buttonStyles, {
        height: ButtonSmallHeight,
        borderRadius: ButtonSmallHeight / 2,
      });
      if (outline) {
        borderWidth = 1;
      }
      break;
    case 'normal':
    default:
      Object.assign(buttonStyles, {
        height: ButtonNormalHeight,
        borderRadius: ButtonNormalHeight / 2,
      });
      textType = 'p';
      if (outline) {
        borderWidth = 2;
      }
  }

  if (outline) {
    Object.assign(buttonStyles, { borderWidth, borderColor: borderColor(outline) });
  }

  return (
    <Panel
      marginVertical={0.5}
      paddingHorizontal={0.5}
      justifyContent="center"
      style={[buttonStyles, style]}
      {...rest}
    >
      <Text type={textType} color={color} bold textAlign="center">
        {children}
      </Text>
    </Panel>
  );
};

export { ButtonLargeHeight, ButtonNormalHeight, ButtonSmallHeight };
export default Button;
