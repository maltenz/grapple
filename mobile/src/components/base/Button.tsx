import React, { FC, useState, useEffect } from 'react';
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
  const [backgroundColor, setBackgroundColor] = useState<ColorType>();
  const [color, setColor] = useState<ColorType>();
  const [outline, setOutline] = useState<ButtonOutline>();

  useEffect(() => {
    if (mode === 'day') {
      switch (propAppearance) {
        case 'strong':
          setBackgroundColor('red');
          setColor('white');

          if (propOutline) {
            setOutline(backgroundColor);
            setColor(backgroundColor);
            setOutline('transparent');

            if (type === 'normal') {
              setOutline('grey3');
            }
          }

          break;
        case 'disabled':
          setBackgroundColor('grey3');
          setColor('grey2');
          break;
        case 'subtle':
        case 'normal':
        default:
          setBackgroundColor('blue');
          setColor('white');

          if (propOutline) {
            setOutline(backgroundColor);
            setColor(backgroundColor);
            setBackgroundColor('transparent');
          }
      }
    }

    if (mode === 'night') {
      switch (propAppearance) {
        case 'strong':
          setBackgroundColor('red');
          setColor('white');

          if (propOutline) {
            setOutline(backgroundColor);
            setColor(backgroundColor);
            setBackgroundColor('transparent');

            if (type === 'normal') {
              setOutline('grey3');
            }
          }

          break;
        case 'disabled':
          setBackgroundColor('grey3');
          setColor('grey2');
          break;
        case 'subtle':
          setBackgroundColor('white');
          setColor('grey');
          break;
        case 'normal':
        default:
          setBackgroundColor('blue');
          setColor('white');

          if (propOutline) {
            setOutline(backgroundColor);
            setColor(backgroundColor);
            setBackgroundColor('transparent');
          }
      }
    }
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
