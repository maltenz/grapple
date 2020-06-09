import React, { FC, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import CommentInput, { CommentContainer, Comment } from './Comment';
import {
  Comment as CommentType,
  CommentInput as CommentInputType,
} from '../../../generated/graphql';
import Panel from './Panel';
import Button from './Button';
import { Color } from '../../colors';

export interface CommentLoaderType {
  loading: boolean;
  data?: CommentType[];
}

interface CommentLoaderProps extends CommentLoaderType {
  handleCreateComment: (value: CommentInputType) => void;
  handleResetComment: boolean;
}

const CommentLoader: FC<CommentLoaderProps> = ({
  loading,
  data,
  handleCreateComment,
  handleResetComment,
}) => {
  const [text, setText] = useState<string>();
  const submit = (): void => {
    if (text?.length) {
      handleCreateComment({ text });
    }
  };

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
      <CommentInput onChange={(value): void => setText(value)} handleReset={handleResetComment} />
      <Panel alignItems="flex-end">
        <Button
          type="small"
          appearance={text?.length ? 'normal' : 'disabled'}
          mode="day"
          marginBottom={0}
          outline={!text?.length}
          onPress={text?.length ? submit : false}
        >
          Submit
        </Button>
      </Panel>
    </CommentContainer>
  );
};

export default CommentLoader;
