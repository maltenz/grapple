import React, { FC, useState, useEffect } from 'react';

import {
  TextInput,
  TextInputContentSizeChangeEventData,
  View,
  LayoutAnimation,
  Alert,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useForm, Controller, EventFunction } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Action } from 'typesafe-actions';

import { AssetStyles, Panel, Button, Text, SvgIconMenu } from '../../assets';

import { deleteShot, updateShot, moveShot } from '../../store';
import { MoveShot } from '../../store/create/actions';

import { ChildNavigationProp } from '../HomeRoot';

import { Shot } from '../../generated/graphql';

type FormData = {
  title: string;
  content: string;
};

interface Form {
  shot: Shot;
  index: number;
  visible: boolean;
  expandable: boolean;
}

const CreatePostForm: FC<Form> = ({ shot, index, visible: propVisible, expandable }) => {
  const { control, getValues, reset } = useForm<FormData>();
  const dispatch = useDispatch();
  const navigation = useNavigation<ChildNavigationProp>();
  const [heightTitle, setHeightTitle] = useState<number>();
  const [heightContent, setHeightContent] = useState<number>();
  const [visible, setVisible] = useState<boolean>(propVisible);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      Keyboard.dismiss();
      storeText();
    });

    return unsubscribe;
  }, [navigation]);

  const handleVisible = (): void => {
    if (visible) {
      Alert.alert('Delete content', 'Are you sure', [
        {
          text: 'Delete',
          style: 'destructive',
          onPress: (): void => {
            reset({ title: '', content: '' });
            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            setVisible(false);
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]);
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
      setVisible(!visible);
    }
  };

  const handleTitleContentSizeChange = (event: {
    nativeEvent: TextInputContentSizeChangeEventData;
  }): void => {
    setHeightTitle(event.nativeEvent.contentSize.height);
  };

  const handleContentSizeChange = (event: {
    nativeEvent: TextInputContentSizeChangeEventData;
  }): void => {
    setHeightContent(event.nativeEvent.contentSize.height);
  };

  const handleMoveShot = ({ direction }: Pick<MoveShot, 'direction'>): void => {
    const { title, content } = getValues();

    dispatch(updateShot({ id: shot.id, title, content }));
    dispatch(moveShot({ index, direction }));
  };

  const handleOptions = (): void => {
    Alert.alert(
      'Shot',
      'Options',
      [
        {
          text: 'Move up',
          onPress: (): void => handleMoveShot({ direction: 'up' }),
        },
        {
          text: 'Move down',
          onPress: (): void => handleMoveShot({ direction: 'down' }),
        },
        {
          text: 'Delete shot',
          style: 'destructive',
          onPress: (): Action => dispatch(deleteShot({ id: shot.id })),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  const storeText = (): void => {
    const { title, content } = getValues();

    dispatch(updateShot({ id: shot.id, title, content }));
  };

  return (
    <>
      {expandable && (
        <Panel row justifyContent="flex-end" alignItems="center">
          <Button
            mode="day"
            type="normal"
            appearance="grey"
            style={{ alignSelf: 'flex-end' }}
            onPress={handleVisible}
            marginRight={0.5}
            outline
          >
            {visible ? 'Delete' : 'Content'}
          </Button>
          <TouchableOpacity onPress={handleOptions}>
            <SvgIconMenu color="grey2" />
          </TouchableOpacity>
        </Panel>
      )}
      {index === 0 && (
        <>
          <Text type="h4" mode="day" appearance="subtle" marginVertical>
            Write up your story
          </Text>
          <Controller
            as={TextInput}
            control={control}
            rules={{ required: index === 0 }}
            multiline
            name="title"
            onChange={(args): EventFunction => args[0].nativeEvent.text}
            onContentSizeChange={handleTitleContentSizeChange}
            placeholder="Title"
            defaultValue={shot.title || ''}
            onBlur={(): void => storeText()}
            style={[
              AssetStyles.form.bubble.title,
              { height: heightTitle && Math.max(35, heightTitle + 50) },
            ]}
          />
        </>
      )}
      {visible && (
        <View>
          {index !== 0 && (
            <Text type="h4" mode="day" appearance="subtle" marginBottom>
              Shot description
            </Text>
          )}
          <Controller
            as={TextInput}
            control={control}
            multiline
            name="content"
            onChange={(args): EventFunction => args[0].nativeEvent.text}
            onContentSizeChange={handleContentSizeChange}
            placeholder="Description"
            defaultValue={shot.content || ''}
            onBlur={(): void => storeText()}
            style={[
              AssetStyles.form.bubble.content,
              {
                fontFamily: AssetStyles.family.regular,
                height: heightContent && Math.max(35, heightContent + 50),
              },
            ]}
          />
        </View>
      )}
    </>
  );
};

export default CreatePostForm;
