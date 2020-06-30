import React, { FC, useState, forwardRef, useRef, useImperativeHandle, RefObject } from 'react';
import {
  StyleSheet,
  TextInputContentSizeChangeEventData,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  NativeMethodsMixinStatic,
  TextInput,
} from 'react-native';

import { AssetStyles } from '../../styles';
import { Color } from '../../colors';
import Panel, { MarginProps } from './Panel';
import CoreText from '../core/Text';
import Avatar from '../core/Avatar';
import { Comment as CommentType } from '../../../generated/graphql';

const POST_USER_IMAGE_SAMPLE = { uri: 'https://source.unsplash.com/120x120' };

interface CommentContainerProps {
  title: string;
  gutter?: boolean;
}

interface CommentProps extends MarginProps {
  placeholder: string;
  onChange?: (value: string) => void;
  text?: string;
  name: string;
  type: 'comment' | 'input';
  onBlur?: () => void;
}

interface CommentBoxProps extends MarginProps {
  text: string;
}

export const CommentContainer: FC<CommentContainerProps> = ({ children, gutter }) => {
  return (
    <Panel backgroundColor="white" paddingHorizontal={gutter ? 1 : 0}>
      <CoreText type="small" bold marginBottom={1} style={{ marginLeft: 0 }}>
        Comments
      </CoreText>
      {children}
    </Panel>
  );
};

export const CommentUser: FC<CommentType> = ({ text }) => {
  return (
    <Panel row alignItems="center" marginBottom>
      <Avatar marginRight={0.5} src={POST_USER_IMAGE_SAMPLE} />
      <CommentBox text={text} />
    </Panel>
  );
};

const CommentBox: FC<CommentBoxProps> = ({ text, ...rest }) => {
  return (
    <Panel flex={1} backgroundColor="grey4" padding={0.5} style={styles.commentStatic} {...rest}>
      <CoreText type="small">{text}</CoreText>
    </Panel>
  );
};

const Comment = forwardRef(
  (
    {
      placeholder,
      onChange: propOnChange,
      text,
      name,
      type,
      onBlur,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
    }: CommentProps,
    ref
  ) => {
    const [heightContent, setHeightContent] = useState<number>();
    const inputRef: RefObject<NativeMethodsMixinStatic> = useRef(null);

    useImperativeHandle(ref, () => ({
      focus: (): void => {
        if (inputRef.current !== null) {
          inputRef.current.focus();
        }
      },
    }));

    const onChange = (args: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      const value = args.nativeEvent.text;
      if (type === 'input' && propOnChange) {
        propOnChange(value);
      }
    };

    const handleTitleContentSizeChange = (event: {
      nativeEvent: TextInputContentSizeChangeEventData;
    }): void => {
      if (type === 'input') {
        setHeightContent(event.nativeEvent.contentSize.height);
      }
    };

    return (
      <Panel
        marginTop={marginTop}
        marginRight={marginRight}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
      >
        <TextInput
          // @ts-ignore
          ref={inputRef}
          multiline
          name={name}
          onChange={onChange}
          onContentSizeChange={handleTitleContentSizeChange}
          placeholder={placeholder}
          placeholderTextColor={Color.grey2}
          value={text}
          onBlur={onBlur}
          style={[
            styles.commentInput,
            type === 'comment' && { display: 'none' },
            {
              height: heightContent && Math.max(35, heightContent + 50),
            },
          ]}
        />
        {type === 'comment' && (
          <CommentBox
            text={text as string}
            marginTop={marginTop}
            marginRight={marginRight}
            marginBottom={marginBottom}
            marginLeft={marginLeft}
          />
        )}
      </Panel>
    );
    //
  }
);

Comment.displayName = 'Comment';

const styles = StyleSheet.create({
  commentStatic: {
    borderRadius: AssetStyles.measure.radius.regular,
  },
  commentInput: {
    ...AssetStyles.text.small,
    backgroundColor: Color.white,
    color: Color.grey,
    fontFamily: AssetStyles.family.regular,
    padding: AssetStyles.measure.space / 2 - AssetStyles.measure.border.regular,
    borderRadius: AssetStyles.measure.radius.regular,
    borderWidth: AssetStyles.measure.border.regular,
    borderColor: Color.grey3,
  },
});

export default Comment;
