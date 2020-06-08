import React, { FC, useState } from 'react';
import { StyleSheet, TextInputContentSizeChangeEventData } from 'react-native';
import { useForm, Controller, EventFunction } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';
import { AssetStyles } from '../../styles';
import { Color } from '../../colors';
import Panel from './Panel';
import CoreText from '../core/Text';
import Avatar from '../core/Avatar';

interface CommentProps {
  input?: boolean;
}

const POST_USER_IMAGE_SAMPLE = { uri: 'https://source.unsplash.com/120x120' };

interface CommentContainerProps {
  title: string;
  gutter: boolean;
}
export const CommentContainer: FC<CommentContainerProps> = ({ children, gutter }) => {
  return (
    <Panel backgroundColor="white" paddingHorizontal={gutter ? 0.5 : 0}>
      <CoreText type="small" bold marginBottom={1} style={{ marginLeft: 0 }}>
        Comments
      </CoreText>
      {children}
    </Panel>
  );
};

interface CommentItemProps {
  comment: string;
}

const CommentItem: FC<CommentItemProps> = ({ comment }) => {
  return (
    <Panel row alignItems="center" marginBottom>
      <Avatar marginRight={0.5} src={POST_USER_IMAGE_SAMPLE} />
      <Panel flex={1} backgroundColor="grey4" padding={0.5} style={styles.comment}>
        <CoreText type="small">{comment}</CoreText>
      </Panel>
    </Panel>
  );
};

const Comment: FC<CommentProps> = ({ input }) => {
  const { control } = useForm();
  const [heightContent, setHeightContent] = useState<number>();

  const handleTitleContentSizeChange = (event: {
    nativeEvent: TextInputContentSizeChangeEventData;
  }): void => {
    setHeightContent(event.nativeEvent.contentSize.height);
  };

  if (input) {
    return (
      <Controller
        as={TextInput}
        control={control}
        multiline
        name="comment"
        onChange={(args): EventFunction => args[0].nativeEvent.text}
        onContentSizeChange={handleTitleContentSizeChange}
        placeholder="Leave a comment"
        // defaultValue={shot.title || ''}
        // onBlur={(): void => storeText()}
        style={[
          AssetStyles.form.bubble.comment,
          {
            backgroundColor: Color.white,
            height: heightContent && Math.max(35, heightContent + 50),
          },
        ]}
      />
    );
  }
  return (
    <Panel>
      <CommentItem comment="Well done, this is a completely new comment. And I hope I get it this time!" />
      <CommentItem comment="Well done, this is a completely" />
    </Panel>
  );
};

const styles = StyleSheet.create({
  comment: {
    borderRadius: AssetStyles.measure.radius.regular,
  },
});

export default Comment;
