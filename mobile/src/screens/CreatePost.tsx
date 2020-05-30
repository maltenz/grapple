import React, { FC, useState, ReactNode, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TextInputContentSizeChangeEventData,
  View,
  LayoutAnimation,
  Alert,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useForm, Controller, EventFunction } from 'react-hook-form';
import { useSafeArea } from 'react-native-safe-area-context';

import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Navigation,
  NavigationIcon,
  AssetStyles,
  Panel,
  Color,
  SegmentedController,
  Button,
  Text,
  SvgIconMenu,
  SvgLogoGrapple,
  HandleUploadImage,
} from '../assets';

import { NavigationHeading } from '../assets/components/base/Navigation';

import { ParentNavigationProp, ChildNavigationProp } from './HomeRoot';

import { GET_SHOTS, UPDATE_SHOT, DELETE_SHOT, MOVE_UP_SHOT } from '../resolvers/shots';
import { Shot } from '../generated/graphql';

type FormData = {
  title: string;
  content: string;
};

interface Form {
  shot: Shot;
  index: number;
  onUpload: (value: boolean) => void;
}

const Form: FC<Form> = ({ shot, index, onUpload: parentOnUpload }) => {
  const { control, getValues, reset } = useForm<FormData>();
  const [updateShot] = useMutation<Shot>(UPDATE_SHOT);
  const [deleteShot] = useMutation<Shot>(DELETE_SHOT);
  const [moveUpShot] = useMutation<Shot>(MOVE_UP_SHOT);
  const navigation = useNavigation<ChildNavigationProp>();
  const [heightTitle, setHeightTitle] = useState<number>();
  const [heightContent, setHeightContent] = useState<number>();
  const [visible, setVisible] = useState(index === 0 || !!shot.content);
  const [expandable] = useState(index !== 0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      const { title, content } = getValues();

      Keyboard.dismiss();
      updateShot({ variables: { id: shot.id, title, content } });
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
            reset({ content: '' });

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

  const handleOptions = (): void => {
    Alert.alert(
      'Shot',
      'Options',
      [
        {
          text: 'Move up',
          onPress: (): void => {
            moveUpShot({ variables: { id: shot.id } });
          },
        },
        {
          text: 'Move down',
        },
        {
          text: 'Delete shot',
          style: 'destructive',
          onPress: (): void => {
            deleteShot({ variables: { id: shot.id } });
          },
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
      <Button
        mode="day"
        type="normal"
        appearance="grey"
        onPress={(): void => {
          const image = `data:image/jpeg;base64,${shot.image}` as string;

          HandleUploadImage({
            image,
            onUpload: (value) => parentOnUpload(value),
            onComplete: (res) => updateShot({ variables: { id: shot.id, image: res } }),
          });
        }}
        marginRight={0.5}
        outline
      >
        Upload
      </Button>
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
            rules={{ required: true }}
            multiline
            name="title"
            onChange={(args): { value: EventFunction } => args[0].nativeEvent.text}
            onContentSizeChange={onTitleContentSizeChange}
            placeholder="Title"
            defaultValue={shot.title || ''}
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
            onChange={(args): { value: EventFunction } => args[0].nativeEvent.text}
            onContentSizeChange={onContentSizeChange}
            placeholder="Description"
            defaultValue={shot.content || ''}
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
  const { data } = useQuery<{ shots: Shot[] }>(GET_SHOTS, { returnPartialData: true });
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

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
        {data?.shots &&
          data?.shots.map(
            (shot: Shot, index: number): ReactNode => {
              const { id } = shot;
              const image = shot.image as string;

              return (
                <Panel marginBottom key={id}>
                  {image && (
                    <Image
                      style={styles.image}
                      source={{ uri: `data:image/jpeg;base64,${image}` }}
                    />
                  )}
                  <Panel marginHorizontal>
                    <Form
                      shot={shot}
                      index={index}
                      onUpload={(value: boolean): void => setUploading(value)}
                    />
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
      {uploading && (
        <Panel
          style={[StyleSheet.absoluteFill, styles.loaderContainer]}
          center
          backgroundColor="red"
        >
          <ActivityIndicator size="large" color={Color.white} style={styles.activityIndicator} />
          <SvgLogoGrapple color="white" scale={0.65} />
        </Panel>
      )}
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
  loaderContainer: {
    zIndex: 10,
    opacity: 0.9,
  },
  activityIndicator: {
    marginBottom: AssetStyles.measure.space * 2,
  },
});

export default CreatePost;
