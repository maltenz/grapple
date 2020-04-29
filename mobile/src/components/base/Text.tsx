import React, { FC } from 'react';
import { ModeType, ColorType } from '../../types';
import CoreText, { TextProps as CoreTextProps } from '../core/Text';

interface TextProps extends CoreTextProps {
  mode: ModeType;
  appearance: 'heavy' | 'strong' | 'normal' | 'subtle';
}

const Text: FC<TextProps> = ({ children, mode, appearance, type, ...rest }) => {
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
    <CoreText type={type} color={color} {...rest} style={{ marginLeft: 0 }}>
      {children}
    </CoreText>
  );
};

export default Text;
