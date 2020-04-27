/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { FC } from 'react';
import { ColorType, ModeType } from '../../types';
import CoreButton, { ButtonType, ButtonOutline } from '../core/Button';
import { MarginProps } from './Panel';

type AppearanceType = 'strong' | 'normal' | 'subtle' | 'disabled';

interface ButtonProps extends MarginProps {
  mode: ModeType;
  type: ButtonType;
  appearance: AppearanceType;
  outline?: boolean;
  onPress?: () => void;
}

const Button: FC<ButtonProps> = ({
  children,
  mode,
  type,
  outline: propOutline,
  appearance: propAppearance,
  onPress,
  ...rest
}) => {
  let backgroundColor: ColorType;
  let color: ColorType;
  let outline: ButtonOutline;

  if (mode === 'day') {
    switch (propAppearance) {
      case 'strong':
        backgroundColor = 'red';
        color = 'white';

        if (propOutline) {
          outline = backgroundColor;
          color = backgroundColor;
          backgroundColor = 'transparent';

          if (type === 'normal') {
            outline = 'grey3';
          }
        }

        break;
      case 'disabled':
        backgroundColor = 'grey3';
        color = 'grey2';
        break;
      case 'subtle':
      case 'normal':
      default:
        backgroundColor = 'blue';
        color = 'white';

        if (propOutline) {
          outline = backgroundColor;
          color = backgroundColor;
          backgroundColor = 'transparent';
        }
    }
  }

  if (mode === 'night') {
    switch (propAppearance) {
      case 'strong':
        backgroundColor = 'red';
        color = 'white';

        if (propOutline) {
          outline = backgroundColor;
          color = backgroundColor;
          backgroundColor = 'transparent';

          if (type === 'normal') {
            outline = 'grey3';
          }
        }

        break;
      case 'disabled':
        backgroundColor = 'grey3';
        color = 'grey2';
        break;
      case 'subtle':
        backgroundColor = 'white';
        color = 'grey';
        break;
      case 'normal':
      default:
        backgroundColor = 'blue';
        color = 'white';

        if (propOutline) {
          outline = backgroundColor;
          color = backgroundColor;
          backgroundColor = 'transparent';
        }
    }
  }

  return (
    <CoreButton
      onPress={onPress}
      type={type}
      // @ts-ignore
      outline={outline}
      // @ts-ignore
      backgroundColor={backgroundColor}
      // @ts-ignore
      color={color}
      {...rest}
    >
      {children}
    </CoreButton>
  );
};

export default Button;
