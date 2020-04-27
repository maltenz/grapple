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

const Button: FC<ButtonProps> = ({ children, type, style, color, outline, ...rest }) => {
  const buttonStyles = {};
  let textType: TextType = 'small';
  let borderWidth = 0;

  const borderColor = (value: ColorType | boolean | undefined): any => {
    switch (typeof value) {
      case 'string':
        return Color[value];
      case 'boolean':
        return color && Color[color];
      default: {
        return null;
      }
    }
  };

  switch (type) {
    case 'large':
      Object.assign(buttonStyles, { height: 72, borderRadius: 36 });
      textType = 'h3';
      if (outline) {
        borderWidth = 4;
      }
      break;
    case 'small':
      Object.assign(buttonStyles, { height: 28, borderRadius: 14, alignSelf: 'flex-start' });
      if (outline) {
        borderWidth = 1;
      }
      break;
    case 'normal':
    default:
      Object.assign(buttonStyles, { height: 36, borderRadius: 18, alignSelf: 'flex-start' });
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
      paddingHorizontal
      alignItems="center"
      justifyContent="center"
      style={[buttonStyles, style]}
      {...rest}
    >
      <Text type={textType} color={color} bold>
        {children}
      </Text>
    </Panel>
  );
};

export default Button;
