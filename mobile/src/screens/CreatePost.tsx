import React, { FC, useState, ReactNode, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TextInputContentSizeChangeEventData,
  View,
  LayoutAnimation,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useNavigation } from '@react-navigation/native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useForm, Controller, EventFunction } from 'react-hook-form';
import { useSafeArea } from 'react-native-safe-area-context';

import {
  Navigation,
  NavigationIcon,
  AssetStyles,
  Panel,
  Color,
  SegmentedController,
  Button,
  Text,
} from '../assets';

import { NavigationHeading } from '../assets/components/base/Navigation';

import { ParentNavigationProp, ChildNavigationProp } from './HomeRoot';

import { GET_SHOTS, UPDATE_SHOT } from '../resolvers/shots';
import { Shot } from '../generated/graphql';

type FormData = {
  title: string;
  content: string;
};

interface Form {
  id: string;
  index: number;
}

type OnChangeType = 'title' | 'content';

const Form: FC<Form> = ({ id, index }) => {
  const { control } = useForm<FormData>();
  const { data } = useQuery<{ shots: Shot[] }>(GET_SHOTS);
  const [updateShot] = useMutation<Shot>(UPDATE_SHOT);
  const [heightTitle, setHeightTitle] = useState<number>();
  const [heightContent, setHeightContent] = useState<number>();
  const [visible, setVisible] = useState(index === 0);
  const [expandable] = useState(index !== 0);
  const [shot, setShot] = useState<Shot>();

  useEffect(() => {
    if (data?.shots) {
      data.shots.find((myShot): null => {
        if (myShot.id === id) {
          setShot(myShot);
        }
        return null;
      });
    }
  });

  if (!shot) {
    return null;
  }

  const handleVisible = (): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setVisible(!visible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any[], type: OnChangeType): EventFunction => {
    const { text } = e[0].nativeEvent;
    if (type === 'title') {
      updateShot({ variables: { id, title: text } });
    }
    if (type === 'content') {
      updateShot({ variables: { id, content: text } });
    }

    return text;
  };

  const onTitleContentSizeChange = (event: {
    nativeEvent: TextInputContentSizeChangeEventData;
  }): void => {
    setHeightTitle(event.nativeEvent.contentSize.height);
  };

  const onContentSizeChange = (event: {
    nativeEvent: TextInputContentSizeChangeEventData;
  }): void => {
    setHeightContent(event.nativeEvent.contentSize.height);
  };

  if (data === undefined) {
    return null;
  }

  return (
    <>
      {expandable && (
        <Button
          mode="day"
          type="normal"
          appearance="normal"
          style={{ alignSelf: 'flex-end' }}
          onPress={handleVisible}
        >
          Add
        </Button>
      )}
      {index === 0 && (
        <Text type="h4" mode="day" appearance="subtle" marginVertical>
          Write up your story
        </Text>
      )}
      {visible && (
        <View>
          {index !== 0 && (
            <Text type="h4" mode="day" appearance="subtle" marginBottom>
              Add a description
            </Text>
          )}
          {index === 0 && (
            <Controller
              as={TextInput}
              control={control}
              rules={{ required: true }}
              multiline
              name="title"
              onChange={(e): EventFunction => onChange(e, 'title')}
              onContentSizeChange={onTitleContentSizeChange}
              placeholder="Title"
              value={shot?.title || ''}
              defaultValue={shot?.title}
              style={[
                AssetStyles.form.bubble.title,
                { height: heightTitle && Math.max(35, heightTitle + 50) },
              ]}
            />
          )}
          <Controller
            as={TextInput}
            control={control}
            multiline
            name="content"
            onChange={(e): EventFunction => onChange(e, 'content')}
            onContentSizeChange={onContentSizeChange}
            placeholder="Content"
            value={shot?.content || ''}
            defaultValue={shot?.content}
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

const CreatePost: FC = () => {
  const parentNavigation = useNavigation<ParentNavigationProp>();
  const navigation = useNavigation<ChildNavigationProp>();
  const inset = useSafeArea();
  const { data } = useQuery<{ shots: Shot[] }>(GET_SHOTS);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [shots, setShot] = useState<Shot[]>();

  useEffect(() => {
    navigation.addListener('focus', () => {
      if (data?.shots) {
        setShot(data.shots);
      }
    });
  }, [navigation]);

  return (
    <>
      <Navigation
        mode="day"
        Left={
          <NavigationIcon
            mode="day"
            type="image"
            onPress={(): void => parentNavigation.navigate('Camera')}
          />
        }
        Center={<NavigationHeading mode="day" text="Create" />}
        Right={
          <NavigationIcon
            mode="day"
            type="close"
            onPress={(): void => navigation.navigate('HomeStack')}
          />
        }
      />

      <KeyboardAwareScrollView extraHeight={150} style={[styles.scrollview]}>
        <SegmentedController
          mode="day"
          onChange={(index): void => setActiveIndex(index)}
          margin
          activeIndex={activeIndex}
          items={[{ title: 'Story' }, { title: 'Incident' }]}
        />
        {shots &&
          shots.map(
            (shot: Shot, index: number): ReactNode => {
              const { id } = shot;
              const image = shot.image as string;

              return (
                <Panel marginBottom key={id}>
                  {image && <Image style={styles.image} source={{ uri: image }} />}
                  <Panel marginHorizontal>
                    <Form id={shot.id} index={index} />
                  </Panel>
                </Panel>
              );
            }
          )}
        <Button marginHorizontal type="large" mode="day" appearance="strong">
          Preview
        </Button>
        <View style={{ height: inset.bottom + AssetStyles.measure.space }} />
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    backgroundColor: Color.white,
  },
  image: {
    width: AssetStyles.measure.window.width,
    height: AssetStyles.measure.window.width,
    marginBottom: AssetStyles.measure.space / 2,
  },
});

export default CreatePost;
