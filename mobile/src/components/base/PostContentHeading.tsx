import React, { FC } from 'react';
import { MarginProps } from './Panel';
import Text from '../core/Text';

interface PostContentHeadingProps extends MarginProps {
  title: string;
}

const PostContentHeading: FC<PostContentHeadingProps> = ({ title, ...rest }) => {
  return (
    <Text type="h4" style={{ marginLeft: 0 }} marginTop={0.5} {...rest}>
      {title}
    </Text>
  );
};

export default PostContentHeading;
