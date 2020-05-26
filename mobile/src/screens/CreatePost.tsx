/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState, ReactNode } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TextInputContentSizeChangeEventData,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/react-hooks';
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
} from '../assets';
import { ParentNavigationProp, ChildNavigationProp } from './HomeRoot';
import { NavigationHeading } from '../assets/components/base/Navigation';
import { GET_SHOTS } from '../resolvers/shots';
import { Shot } from '../generated/graphql';

type FormData = {
  title: string;
  content: string;
};

const Form: FC = () => {
  const { control } = useForm<FormData>();

  const [height, setHeight] = useState<number>();
  const onChange = (args: any[]): EventFunction => {
    return args[0].nativeEvent.text;
  };
  const onContentSizeChange = (event: {
    nativeEvent: TextInputContentSizeChangeEventData;
  }): void => {
    setHeight(event.nativeEvent.contentSize.height);
  };

  return (
    <>
      <Controller
        multiline
        as={TextInput}
        control={control}
        name="Title"
        onChange={onChange}
        onContentSizeChange={onContentSizeChange}
        rules={{ required: true }}
        placeholder="Title"
        style={[AssetStyles.form.bubble, { height: height && Math.max(35, height + 50) }]}
      />
      <Controller
        multiline
        as={TextInput}
        control={control}
        name="Content"
        onChange={onChange}
        onContentSizeChange={onContentSizeChange}
        placeholder="Content"
        style={[
          AssetStyles.form.bubble,
          { fontFamily: AssetStyles.family.regular, height: height && Math.max(35, height + 50) },
        ]}
      />
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
          (shot: Shot): ReactNode => {
            const { id } = shot;
            const image = shot.image as string;

            return (
              <Panel marginBottom key={id}>
                {image && <Image style={styles.image} source={{ uri: image }} />}
                <Panel marginHorizontal>
                  <Button
                    mode="day"
                    type="normal"
                    appearance="normal"
                    style={{ alignSelf: 'flex-end' }}
                    marginBottom
                  >
                    Add
                  </Button>
                  <Form />
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
  },
});

export default CreatePost;
