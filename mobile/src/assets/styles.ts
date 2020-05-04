import { Dimensions } from 'react-native';

import { Color } from './colors';
import { TextType } from '../components/core/Text';

const genericStyles = {
  color: Color.grey,
  marginHorizontal: 10,
};

const h1 = {
  ...genericStyles,
  fontSize: 34,
  lineHeight: 40,
};

const h2 = {
  ...genericStyles,
  fontSize: 30,
  lineHeight: 40,
};

const h3 = {
  ...genericStyles,
  fontSize: 24,
  lineHeight: 40,
};

const h4 = {
  ...genericStyles,
  fontSize: 20,
  lineHeight: 36,
};

const p = {
  ...genericStyles,
  fontSize: 18,
  lineHeight: 32,
};

const small = {
  fontSize: 14,
  lineHeight: 23,
};

const mini = {
  fontSize: 13,
  lineHeight: 20,
};

const AssetStyles = {
  text: {
    h1,
    h2,
    h3,
    h4,
    p,
    small,
    mini,
  },
  shadow: {
    overlay: {
      shadowRadius: 50,
      shadowOpacity: 0.25,
      shadowColor: Color.black,
      shadowOffset: { width: 0, height: 10 },
    },
    deep: {
      shadowRadius: 50,
      shadowColor: Color.purple,
      shadowOpacity: 0.1,
    },
  },
  measure: {
    window: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    space: 20,
    radius: {
      large: 15,
      regular: 10,
    },
    border: {
      large: 4,
    },
    circle: {
      large: {
        size: 62,
      },
      small: {
        padding: 5,
        size: 36,
      },
    },
  },
};

const minLineheight = (type: TextType): number => AssetStyles.text[type].fontSize * 1.1;

export { AssetStyles, minLineheight };
