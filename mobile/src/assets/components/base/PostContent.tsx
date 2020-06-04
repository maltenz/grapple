import React, { FC } from 'react';
import Panel, { MarginProps } from './Panel';
import Text from './Text';
import { ColorType } from '../../../types';

export interface PostContentProps extends MarginProps {
  title: string;
  content: string;
  color?: ColorType;
}

const PostContent: FC<PostContentProps> = ({ title, content, color, ...rest }) => {
  return (
    <Panel marginVertical={0.5} {...rest}>
      <Text mode="day" appearance="normal" type="small" bold color={color}>
        {title}
        <Text mode="day" appearance="normal" type="small" color={color}>
          &nbsp;{content}
        </Text>
      </Text>
    </Panel>
  );
};

export default PostContent;
