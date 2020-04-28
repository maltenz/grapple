import React, { FC } from 'react';
import Panel from './Panel';
import Text from './Text';

export interface PostContentProps {
  title: string;
  content: string;
}

const PostContent: FC<PostContentProps> = ({ title, content }) => {
  return (
    <Panel paddingTop={0.5}>
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