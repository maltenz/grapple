import React, { FC, useState, useRef, RefObject, useEffect } from 'react';
import {
  StyleSheet,
  NativeMethodsMixinStatic,
  View,
  ViewStyle,
  StyleProp,
  Switch,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BlurView } from 'expo-blur';
import { useSafeArea } from 'react-native-safe-area-context';

import {
  Navigation,
  NavigationIcon,
  Panel,
  AssetStyles,
  Comment,
  Color,
  SvgWiggleFill,
  CoreText,
  SvgIconAccount,
  Badge,
  MenuItem,
} from '../assets';

import { NavigationHeading } from '../assets/components/base/Navigation';
import { ParentNavigationProp, MyProfileEditParams } from './HomeRoot';

import { User as UserType } from '../generated/graphql';
import SelectProfilePicModal from './components/SelectProfilePicModal';
import ColorPickerModal from './components/ColorPickModal';

const WIDTH = AssetStyles.measure.window.width;
const SPACE = AssetStyles.measure.space;
const DIMENSION = WIDTH - SPACE * 2;
const CIRCLE = 125;
const RADIUS = AssetStyles.measure.radius.large;

type AuthType = 'public' | 'private';

interface UserProps extends UserType {
  type: AuthType;
}

interface ColorThumnailProps {
  style: StyleProp<ViewStyle>;
  color: string;
  onPress: () => void;
}

const ColorThumnail: FC<ColorThumnailProps> = ({ style, onPress, color }) => {
  return (
    <Panel row alignItems="center" style={style} onPress={onPress}>
      <CoreText type="small" bold marginRight={0.5} color="white">
        Pick color
      </CoreText>
      <View style={styles.colorContainer}>
        <View style={[styles.color, { backgroundColor: color }]} />
      </View>
    </Panel>
  );
};

const MyProfileEdit: FC = () => {
  const inputRef: RefObject<NativeMethodsMixinStatic> = useRef(null);
  const parentNavigation = useNavigation<ParentNavigationProp>();
  const { params }: { params?: MyProfileEditParams } = useRoute();
  const inset = useSafeArea();
  useEffect(() => {
    if (params?.newProfileImg) {
      setSelectProfilePicVisible(true);
    }
  }, [params]);
  const [editBioActive, setEditBioActive] = useState<boolean>(false);
  const [selectProfilePicVisible, setSelectProfilePicVisible] = useState<boolean>(false);
  const [bioValue, setBioValue] = useState(
    `Many people has the notion that enlightenment is one state. Many also believe that when it is attained, a person is forever in that state.`
  );
  const [primaryColor] = useState<string>(Color.red);
  const [secondaryColor] = useState<string>(Color.purple);
  const [colorPickerVisible, setColorPickerVisible] = useState<boolean>(false);
  const PADDING_BOTTOM = inset.bottom + SPACE;

  if (editBioActive && inputRef.current !== null) {
    inputRef.current.focus();
  }

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
          <Panel style={styles.profile} marginHorizontal marginBottom={2} center>
            <SvgWiggleFill
              dimension={DIMENSION}
              style={StyleSheet.absoluteFill}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
            />
            <ColorThumnail
              style={styles.colorOuter}
              color={primaryColor}
              onPress={(): void => setColorPickerVisible(!colorPickerVisible)}
            />
            <Panel onPress={(): void => parentNavigation.navigate('UserCamera')}>
              <BlurView tint="light" intensity={90} style={styles.blurviewCircle}>
                <SvgIconAccount strokeWidth={3} color="purple" scale={2} />
                <Badge type="add" appearance="strong" style={styles.badge} />
              </BlurView>
            </Panel>
            <BlurView tint="light" intensity={90} style={styles.blurviewText}>
              <CoreText type="p" color="purple" bold textAlign="center">
                Anonymous
              </CoreText>
            </BlurView>
          </Panel>
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
      />
    </>
  );
};

const styles = StyleSheet.create({
  keyboardScrollView: {
    flex: 1,
    backgroundColor: Color.white,
  },
  profile: {
    overflow: 'hidden',
    width: DIMENSION,
    height: DIMENSION,
  },
  blurviewCircle: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: AssetStyles.measure.space / 2,
    position: 'relative',
  },
  blurviewText: {
    borderRadius: RADIUS,
  },
  tagScrollViewAdd: {
    paddingVertical: SPACE,
    backgroundColor: Color.purple,
  },
  tagScrollView: {
    marginTop: AssetStyles.measure.space,
    paddingBottom: SPACE,
  },
  badge: {
    position: 'absolute',
    top: SPACE,
    right: SPACE,
  },
  colorOuter: {
    position: 'absolute',
    right: AssetStyles.measure.space,
    bottom: AssetStyles.measure.space,
  },
  colorContainer: {
    width: 40,
    height: 40,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: AssetStyles.measure.radius.regular,
  },
  color: {
    width: 30,
    height: 30,
    borderRadius: AssetStyles.measure.radius.regular - 2,
    backgroundColor: Color.red,
  },
});

export default MyProfileEdit;
