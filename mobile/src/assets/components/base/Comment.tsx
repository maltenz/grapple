import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, TextInputContentSizeChangeEventData } from 'react-native';
import { useForm, Controller, EventFunction } from 'react-hook-form';
import { TextInput } from 'react-native-gesture-handler';
import { AssetStyles } from '../../styles';
import { Color } from '../../colors';
import Panel from './Panel';
import CoreText from '../core/Text';
import Avatar from '../core/Avatar';
import { Comment as CommentType } from '../../../generated/graphql';

const POST_USER_IMAGE_SAMPLE = { uri: 'https://source.unsplash.com/120x120' };

interface CommentContainerProps {
  title: string;
  gutter: boolean;
}

interface CommentInputProps {
  placeholder?: string;
  onChange: (value: string) => void;
  handleReset: boolean;
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

export const Comment: FC<CommentType> = ({ text }) => {
  return (
    <Panel row alignItems="center" marginBottom>
      <Avatar marginRight={0.5} src={POST_USER_IMAGE_SAMPLE} />
      <Panel flex={1} backgroundColor="grey4" padding={0.5} style={styles.comment}>
        <CoreText type="small">{text}</CoreText>
      </Panel>
    </Panel>
  );
};

const CommentInput: FC<CommentInputProps> = ({
  placeholder,
  onChange: propOnChange,
  handleReset,
}) => {
  const { control, reset } = useForm();
  const [heightContent, setHeightContent] = useState<number>();

  useEffect(() => {
    if (handleReset) {
      reset({ comment: '' });
    }
  }, [handleReset]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (args: any[]): EventFunction => {
    const value = args[0].nativeEvent.text;
    propOnChange(value);
    return value;
  };

  const handleTitleContentSizeChange = (event: {
    nativeEvent: TextInputContentSizeChangeEventData;
  }): void => {
    setHeightContent(event.nativeEvent.contentSize.height);
  };

  return (
    <Controller
      as={TextInput}
      control={control}
      multiline
      name="comment"
      onChange={onChange}
      onContentSizeChange={handleTitleContentSizeChange}
      placeholder={placeholder || 'Leave a comment'}
      placeholderTextColor={Color.grey2}
      style={[
        AssetStyles.form.bubble.comment,
        {
          backgroundColor: Color.white,
          height: heightContent && Math.max(35, heightContent + 50),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  comment: {
    borderRadius: AssetStyles.measure.radius.regular,
  },
});

export default CommentInput;
