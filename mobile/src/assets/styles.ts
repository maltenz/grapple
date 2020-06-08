import { Dimensions } from 'react-native';

import { Color } from './colors';
import { TextType } from './components/core/Text';

const myMinLineheight = 1.1;

const minLineheight = (type: TextType): number => AssetStyles.text[type].fontSize * myMinLineheight;

const fontRegular = 'roboto-regular';
const fontBold = 'roboto-bold';

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

const medium = {
  fontSize: 16,
  lineHeight: 25,
};

const small = {
  fontSize: 14,
  lineHeight: 22,
};

const mini = {
  fontSize: 13,
  lineHeight: 20,
};

const AssetStyles = {
  family: {
    regular: fontRegular,
    bold: fontBold,
  },
  text: {
    h1,
    h2,
    h3,
    h4,
    p,
    medium,
    small,
    mini,
  },
  form: {
    input: {
      fontSize: p.fontSize,
      height: 45,
      marginBottom: 20,
      borderBottomWidth: 2,
      color: Color.red,
      borderColor: Color.red,
      fontFamily: fontBold,
    },
    bubble: {
      title: {
        fontSize: p.fontSize,
        lineHeight: p.lineHeight - 5,
        marginBottom: 20,
        color: Color.grey,
        fontFamily: fontBold,
        backgroundColor: Color.grey4,
        padding: 10,
        paddingTop: 15,
        borderRadius: 11.25,
        borderWidth: 1,
        borderColor: Color.grey3,
      },
      content: {
        fontSize: medium.fontSize,
        lineHeight: medium.lineHeight,
        marginBottom: 20,
        color: Color.grey,
        fontFamily: fontRegular,
        backgroundColor: Color.grey4,
        padding: 10,
        paddingTop: 15,
        borderRadius: 11.25,
        borderWidth: 1,
        borderColor: Color.grey3,
      },
      comment: {
        fontSize: small.fontSize,
        lineHeight: small.lineHeight,
        marginBottom: 20,
        color: Color.grey,
        fontFamily: fontRegular,
        backgroundColor: Color.grey4,
        padding: 10,
        paddingTop: 10,
        borderRadius: 11.25,
        borderWidth: 1,
        borderColor: Color.grey3,
      },
    },
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

export { AssetStyles, minLineheight };
