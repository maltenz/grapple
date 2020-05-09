import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ModeType, ColorType } from '../../../types';
import CoreText, { TextProps as CoreTextProps, PlaceholderTextColor } from '../core/Text';
import { AssetStyles } from '../../styles';
import { Color } from '../../colors';

export interface TextProps extends CoreTextProps {
  mode: ModeType;
  appearance: 'heavy' | 'strong' | 'normal' | 'subtle';
  style?: StyleProp<ViewStyle>;
}

export const REQUIRED_TEXT = 'This is required';

export const SmallTextConfig: TextProps = {
  mode: 'day',
  appearance: 'heavy',
  type: 'small',
  bold: true,
};
export const ErrorTextStyles = {
  overflow: 'hidden',
  ...AssetStyles.text.small,
  color: Color.red,
  fontFamily: AssetStyles.family.regular,
};

export const ErrorInputInterpolationConfig = {
  inputRange: [0, 1],
  outputRange: [0, 20],
};

const Text: FC<TextProps> = ({ children, mode, appearance, type, style, ...rest }) => {
  let color: ColorType = 'grey';

  switch (mode) {
    case 'day':
      switch (appearance) {
        case 'heavy':
          color = 'red';
          break;
        case 'strong':
          color = 'blue';
          break;
        case 'subtle':
          color = 'grey2';
          break;
        case 'normal':
        default:
          color = 'grey';
      }
      break;
    case 'night':
      switch (appearance) {
        case 'heavy':
          color = 'red';
          break;
        case 'strong':
          color = 'blue';
          break;
        case 'subtle':
          color = 'grey2';
          break;
        case 'normal':
        default:
          color = 'white';
      }
      break;
    default:
  }

  return (
    <CoreText type={type} color={color} {...rest} style={[{ marginLeft: 0 }, style]}>
      {children}
    </CoreText>
  );
};

export { PlaceholderTextColor };
export default Text;
