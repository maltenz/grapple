import React, { FC } from 'react';
import Panel, { MarginProps } from './Panel';
import Text from './Text';

export interface PostContentProps extends MarginProps {
  title: string;
  content: string;
}

const PostContent: FC<PostContentProps> = ({ title, content, ...rest }) => {
  return (
    <Panel paddingTop={0.5} {...rest}>
      <Text mode="day" appearance="normal" type="small" bold>
        {title}
        <Text mode="day" appearance="normal" type="small">
          &nbsp;{content}
        </Text>
      </Text>
    </Panel>
  );
};

export default PostContent;
