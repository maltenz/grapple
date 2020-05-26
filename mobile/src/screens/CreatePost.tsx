/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState, ReactNode } from 'react';
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
  visible: boolean;
  expandable: boolean;
  index: number;
}

type OnChangeType = 'title' | 'content';

const Form: FC<Form> = ({ id, visible: propVisible, expandable, index }) => {
  const { control } = useForm<FormData>();
  const [updateShot] = useMutation<Shot>(UPDATE_SHOT);
  const [heightTitle, setHeightTitle] = useState<number>();
  const [heightContent, setHeightContent] = useState<number>();
  const [visible, setVisible] = useState(propVisible);

  const handleVisible = (): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setVisible(!visible);
  };

  const onChange = (args: any[], type: OnChangeType): EventFunction => {
    const { text } = args[0].nativeEvent;
    if (type === 'title') {
      updateShot({ variables: { id, title: text } });
    } else {
      updateShot({ variables: { id, content: text } });
    }
    return args[0].nativeEvent.text;
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
              multiline
              as={TextInput}
              control={control}
              name="Title"
              onChange={(args): EventFunction => onChange(args, 'title')}
              onContentSizeChange={onTitleContentSizeChange}
              rules={{ required: true }}
              placeholder="Title"
              style={[
                AssetStyles.form.bubble.title,
                { height: heightTitle && Math.max(35, heightTitle + 50) },
              ]}
            />
          )}
          <Controller
            multiline
            as={TextInput}
            control={control}
            name="Content"
            onChange={(args): EventFunction => onChange(args, 'content')}
            onContentSizeChange={onContentSizeChange}
            placeholder="Content"
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
        {data?.shots?.map(
          (shot: Shot, index: number): ReactNode => {
            const { id } = shot;
            const image = shot.image as string;

            return (
              <Panel marginBottom key={id}>
                {image && <Image style={styles.image} source={{ uri: image }} />}
                <Panel marginHorizontal>
                  <Form visible={index === 0} expandable={index !== 0} index={index} id={id} />
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
