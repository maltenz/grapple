import React, { FC, useState } from 'react';
import { MarginProps } from './Panel';
import Text from '../core/Text';

interface PostContentHeadingProps extends MarginProps {
  title: string;
  edit?: boolean;
  autoCorrect?: boolean;
}

const PostContentHeading: FC<PostContentHeadingProps> = ({ title, edit, autoCorrect, ...rest }) => {
  const [value, onChangeText] = useState(title);
  return (
    <Text
      autoCorrect={autoCorrect}
      textInput={edit}
      onChangeText={(text): void => onChangeText(text)}
      value={value}
      type="h4"
      style={{ marginLeft: 0 }}
      marginTop={0.5}
      {...rest}
    >
      {title}
    </Text>
  );
};

export default PostContentHeading;
