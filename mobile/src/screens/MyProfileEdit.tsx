import React, { FC, useState, useRef, RefObject, useEffect } from 'react';

import { StyleSheet, NativeMethodsMixinType, Switch } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeArea } from 'react-native-safe-area-context';

import {
  Navigation,
  NavigationIcon,
  Panel,
  AssetStyles,
  Comment,
  Color,
  MenuItem,
  UploadImage,
} from '../assets';

import { NavigationHeading } from '../assets/components/base/Navigation';
import { ParentNavigationProp, MyProfileEditParams } from './HomeRoot';

import SelectProfilePicModal from './components/SelectProfilePicModal';
import ColorPickerModal from './components/ColorPickModal';
import ProfileCover from './components/ProfileCover';
import LoadingScreen from './components/LoadingScreen';

const SPACE = AssetStyles.measure.space;

const MyProfileEdit: FC = () => {
  const inputRef: RefObject<NativeMethodsMixinType> = useRef(null);
  const parentNavigation = useNavigation<ParentNavigationProp>();
  const { params }: { params?: MyProfileEditParams } = useRoute();
  const inset = useSafeArea();
  const [editBioActive, setEditBioActive] = useState<boolean>(false);
  const [uploadScreenVisible, setUploadScreenVisible] = useState<boolean>(false);
  const [selectProfilePicVisible, setSelectProfilePicVisible] = useState<boolean>(false);
  const [bioValue, setBioValue] = useState(
    `Many people has the notion that enlightenment is one state. Many also believe that when it is attained, a person is forever in that state.`
  );
  const [colorPickerVisible, setColorPickerVisible] = useState<boolean>(false);

  useEffect(() => {
    if (params?.newProfileImg) {
      setSelectProfilePicVisible(true);
    }
  }, [params]);

  const PADDING_BOTTOM = inset.bottom + SPACE;

  if (editBioActive && inputRef.current !== null) {
    inputRef.current.focus();
  }

  const handleUploadProfilePic = ({ image }: { image: string }): void => {
    UploadImage({
      type: 'profile',
      image,
      onUpload: () => {
        setSelectProfilePicVisible(false);
        setUploadScreenVisible(true);
      },
      onComplete: () => setUploadScreenVisible(false),
    });
  };

  return (
    <>
      <Navigation
        mode="day"
        Left={
          <NavigationIcon mode="day" type="back" onPress={(): void => parentNavigation.goBack()} />
        }
        Center={<NavigationHeading mode="day" text="Edit" />}
      />
      <KeyboardAwareScrollView
        style={styles.keyboardScrollView}
        contentContainerStyle={{
          paddingBottom: PADDING_BOTTOM,
          paddingTop: AssetStyles.measure.space,
        }}
      >
        <MenuItem
          title="Public profile"
          Right={
            <Switch value={editBioActive} onValueChange={(val): void => setEditBioActive(val)} />
          }
        />
        <Panel marginTop={2} marginBottom={2}>
          <ProfileCover onColorPicker={(): void => setColorPickerVisible(!colorPickerVisible)} />
          <MenuItem title="Bio" last Right={<Switch />} />
          <Panel marginHorizontal>
            <Comment
              ref={inputRef}
              text={bioValue}
              type={editBioActive ? 'input' : 'comment'}
              name="bio"
              placeholder="Something about you"
              onChange={(text): void => setBioValue(text)}
              onBlur={(): void => setEditBioActive(false)}
            />
          </Panel>
        </Panel>
      </KeyboardAwareScrollView>
      <ColorPickerModal
        visible={colorPickerVisible}
        onClose={(): void => setColorPickerVisible(false)}
      />
      <SelectProfilePicModal
        visible={selectProfilePicVisible}
        onClose={(): void => setSelectProfilePicVisible(false)}
        onImageSelect={handleUploadProfilePic}
      />
      <LoadingScreen visible={uploadScreenVisible} />
    </>
  );
};

const styles = StyleSheet.create({
  keyboardScrollView: {
    flex: 1,
    backgroundColor: Color.white,
  },
});

export default MyProfileEdit;
