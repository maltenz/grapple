import React, { FC, useState, useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ColorType, ModeType } from '../../types';
import CoreButton, {
  ButtonType,
  ButtonOutline,
  ButtonLargeHeight,
  ButtonNormalHeight,
  ButtonSmallHeight,
} from '../core/Button';
import { MarginProps } from './Panel';

type AppearanceType = 'strong' | 'normal' | 'disabled' | 'warning' | 'dark' | 'light';

interface ButtonProps extends MarginProps {
  mode: ModeType;
  type: ButtonType;
  appearance: AppearanceType;
  outline?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    mode,
    type,
    outline: propOutline,
    appearance: propAppearance,
    onPress,
    style,
    ...rest
  } = props;

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
        myColor = 'grey2';
        if (propOutline) {
          myBackground = 'transparent';
          myColor = 'grey3';
          myOutline = 'grey3';
        }
        break;
      case 'light':
        myBackground = 'white';
        myColor = 'grey';
        if (propOutline) {
          myBackground = 'transparent';
          myColor = 'grey3';
          myOutline = 'grey3';
        }
        break;
      case 'dark':
        myBackground = 'grey';
        myColor = 'white';
        if (propOutline) {
          myBackground = 'transparent';
          myColor = 'grey';
          myOutline = 'grey';
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
  }, [props]);

  return (
    <CoreButton
      onPress={onPress}
      type={type}
      outline={outline}
      backgroundColor={backgroundColor}
      color={color}
      style={style}
      paddingHorizontal={type === 'small' ? 1 : 0.5}
      {...rest}
    >
      {children}
    </CoreButton>
  );
};

export { ButtonLargeHeight, ButtonNormalHeight, ButtonSmallHeight };

export default Button;
