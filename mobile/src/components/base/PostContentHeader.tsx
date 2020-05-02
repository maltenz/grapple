import React, { FC, ReactNode } from 'react';
import moment from 'moment';
import Panel from './Panel';
import Text from '../core/Text';

interface PostContentHeaderProps {
  title: string;
  date: Date;
  Right: ReactNode;
}

const PostContentHeader: FC<PostContentHeaderProps> = ({ title, date, Right }) => {
  return (
    <Panel row justifyContent="space-between">
      <Text color="blue" type="small" bold style={{ marginLeft: 0 }}>
        {title}
        &nbsp; &nbsp; | &nbsp; &nbsp;
        {moment(date).calendar()}
      </Text>
      {Right}
    </Panel>
  );
};

export default PostContentHeader;
