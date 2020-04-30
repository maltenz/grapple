import React, { FC } from 'react';
import moment from 'moment';
import Panel from './Panel';
import Text from '../core/Text';

interface PostContentHeaderProps {
  title: string;
  date: Date;
}

const PostContentHeader: FC<PostContentHeaderProps> = ({ title, date }) => {
  return (
    <Panel row>
      <Text color="blue" type="p" bold style={{ marginLeft: 0 }}>
        {title}
        &nbsp; &nbsp; | &nbsp; &nbsp;
        {moment(date).calendar()}
      </Text>
    </Panel>
  );
};

export default PostContentHeader;
