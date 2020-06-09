import React, { FC, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import CommentInput, { CommentContainer, Comment } from './Comment';
import { Comment as CommentType } from '../../../generated/graphql';
import Panel from './Panel';
import Button from './Button';
import { Color } from '../../colors';

export interface CommentLoaderProps {
  loading: boolean;
  data?: CommentType[];
}

const CommentLoader: FC<CommentLoaderProps> = ({ loading, data }) => {
  const [text, setText] = useState<string>();
  if (loading) {
    return (
      <Panel marginBottom={0.5}>
        <ActivityIndicator size="large" color={Color.grey2} />
      </Panel>
    );
  }

  return (
    <CommentContainer gutter title="Comments">
      {data?.map(({ id, ...rest }) => (
        <Comment key={id as string} {...rest} />
      ))}
      <CommentInput onChange={(value): void => setText(value)} />
      <Panel alignItems="flex-end">
        <Button
          type="small"
          appearance={text?.length ? 'normal' : 'disabled'}
          mode="day"
          marginBottom={0}
          outline={!text?.length}
        >
          Submit
        </Button>
      </Panel>
    </CommentContainer>
  );
};

export default CommentLoader;
