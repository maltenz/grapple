import React, { FC, useState, useEffect } from 'react';
import { ColorType, ModeType } from '../../types';
import CoreButton, { ButtonType, ButtonOutline } from '../core/Button';
import { MarginProps } from './Panel';

type AppearanceType = 'strong' | 'normal' | 'disabled' | 'warning';

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
  const [backgroundColor, setBackgroundColor] = useState<ColorType>();
  const [color, setColor] = useState<ColorType>();
  const [outline, setOutline] = useState<ButtonOutline>();

  useEffect(() => {
    let myBackground: ColorType = 'transparent';
    let myColor: ColorType = 'transparent';
    let myOutline: ColorType = 'transparent';

    switch (propAppearance) {
      case 'strong':
        myBackground = 'red';
        myColor = 'white';
        if (propOutline) {
          myBackground = 'transparent';
          myColor = 'red';
          myOutline = 'red';
        }
        break;
      case 'normal':
        myBackground = 'blue';
        myColor = 'white';
        if (propOutline) {
          myBackground = 'transparent';
          myColor = 'blue';
          myOutline = 'blue';
        }
        break;
      case 'warning':
        myBackground = 'red';
        myColor = 'white';
        if (propOutline) {
          myBackground = 'transparent';
          myColor = 'red';
          myOutline = 'grey3';
        }
        break;
      case 'disabled':
        myBackground = 'grey3';
        myColor = 'white';
        if (propOutline) {
          myBackground = 'transparent';
          myColor = 'grey3';
          myOutline = 'grey3';
        }
        break;
      default:
    }

    if (mode === 'night') {
      switch (propAppearance) {
        case 'normal':
          if (!propOutline) {
            myColor = 'grey';
          }

          break;
        case 'warning':
          if (propOutline) {
            myBackground = 'transparent';
            myColor = 'white';
            myOutline = 'red';
          }
          break;
        case 'disabled':
          myBackground = 'grey';
          myColor = 'grey2';
          if (propOutline) {
            myBackground = 'transparent';
            myColor = 'grey';
            myOutline = 'grey';
          }
          break;
        default:
          break;
      }
    }

    setBackgroundColor(myBackground);
    setColor(myColor);
    setOutline(myOutline);
  }, []);

  return (
    <CoreButton
      onPress={onPress}
      type={type}
      outline={outline}
      backgroundColor={backgroundColor}
      color={color}
      {...rest}
    >
      {children}
    </CoreButton>
  );
};

export default Button;
