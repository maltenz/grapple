import React, { FC, useState, useEffect } from 'react';

import { View, LayoutAnimation, Alert, Keyboard, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Action } from 'typesafe-actions';

import { Panel, Button, Text, SvgIconMenu, Comment } from '../../assets';

import { deleteShot, updateShot, moveShot } from '../../store';
import { MoveShot } from '../../store/create/actions';

import { ChildNavigationProp } from '../HomeRoot';

import { Shot } from '../../generated/graphql';

interface CreatePostFormProps {
  shot: Shot;
  index: number;
  visible: boolean;
  expandable: boolean;
}

const CreatePostForm: FC<CreatePostFormProps> = ({
  shot,
  index,
  visible: propVisible,
  expandable,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<ChildNavigationProp>();
  const [title, setTitle] = useState<string>(shot.title || '');
  const [content, setContent] = useState<string>(shot.content || '');
  const [visible, setVisible] = useState<boolean>(propVisible);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      Keyboard.dismiss();
      dispatch(updateShot({ id: shot.id, title, content }));
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
            setTitle('');
            setContent('');
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

  const handleMoveShot = ({ direction }: Pick<MoveShot, 'direction'>): void => {
    dispatch(updateShot({ id: shot.id, title, content }));
    dispatch(moveShot({ index, direction }));
  };

  const handleUpdateShot = (): void => {
    dispatch(updateShot({ id: shot.id, title, content }));
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
          <Comment
            name="title"
            placeholder="Title"
            text={title}
            onChange={(text): void => setTitle(text)}
            type="input"
            marginBottom
            onBlur={handleUpdateShot}
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
          <Comment
            name="content"
            placeholder="Content"
            text={content}
            onChange={(text): void => setContent(text)}
            type="input"
            onBlur={handleUpdateShot}
          />
        </View>
      )}
    </>
  );
};

export default CreatePostForm;
