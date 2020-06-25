import React, { FC, useState, useRef, RefObject, useEffect, ReactNode } from 'react';
import {
  StyleSheet,
  NativeMethodsMixinStatic,
  ScrollView,
  View,
  ViewStyle,
  StyleProp,
  Switch,
  Alert,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BlurView } from 'expo-blur';
import { useSafeArea } from 'react-native-safe-area-context';
// import { useSelector } from 'react-redux';
import { ColorPicker, fromHsv } from 'react-native-color-picker';

// import { authUserSelector } from '../store';

import { useSelector, useDispatch } from 'react-redux';
import {
  Navigation,
  NavigationIcon,
  Panel,
  AssetStyles,
  Text,
  Comment,
  Color,
  Tag,
  SvgWiggleFill,
  CoreText,
  SvgIconAccount,
  Badge,
  Button,
  Overlay,
  OverlayHeader,
  MenuItem,
  Thumbnail,
} from '../assets';

import { NavigationHeading } from '../assets/components/base/Navigation';
import { ParentNavigationProp, MyProfileEditParams } from './HomeRoot';

import { User as UserType } from '../generated/graphql';
import { MarginProps } from '../assets/components/base/Panel';
import { authUserSelector, authShotSelector, authDeleteShot } from '../store';

const WIDTH = AssetStyles.measure.window.width;
const SPACE = AssetStyles.measure.space;
const DIMENSION = WIDTH - SPACE * 2;
const CIRCLE = 125;
const RADIUS = AssetStyles.measure.radius.large;

interface HeadingProps extends MarginProps {
  text: string;
  buttonText: string;
  onPress?: () => void;
}

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
  const shots = useSelector(authShotSelector);
  const [editBioActive, setEditBioActive] = useState<boolean>(false);
  const [infoViewVisible, setInfoViewVisisble] = useState<boolean>(false);
  const [selectProfilePicVisible, setSelectProfilePicVisible] = useState<boolean>(false);
  const [profilePicActiveIndex, setProfilePicActiveIndex] = useState<number>();
  const [bioValue, setBioValue] = useState(
    `Many people has the notion that enlightenment is one state. Many also believe that when it is attained, a person is forever in that state.`
  );
  const [primaryColor, setPrimaryColor] = useState<string>(Color.red);
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
        <MenuItem title="Strengths" last Right={<Switch />} />
        <ScrollView horizontal style={styles.tagScrollView} showsHorizontalScrollIndicator={false}>
          <Tag mode="day" text="Legal" marginLeft />
          <Tag mode="day" text="Helped 23" />
          <Tag mode="day" text="Accomodation" />
          <Tag mode="day" text="Survivor" />
          <Tag mode="day" text="Chat" />
          <Tag mode="day" text="Call" />
        </ScrollView>
        <MenuItem title="Experiences" last Right={<Switch />} />
        <ScrollView horizontal style={styles.tagScrollView} showsHorizontalScrollIndicator={false}>
          <Tag mode="day" text="Legal" marginLeft />
          <Tag mode="day" text="Helped 23" />
          <Tag mode="day" text="Accomodation" />
          <Tag mode="day" text="Survivor" />
          <Tag mode="day" text="Chat" />
          <Tag mode="day" text="Call" />
        </ScrollView>
      </KeyboardAwareScrollView>
      {infoViewVisible && (
        <Overlay type="page">
          <Panel flex={1} justifyContent="center">
            <OverlayHeader />
            <Panel backgroundColor="white" paddingHorizontal paddingBottom>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text marginTop type="small" mode="day" appearance="normal">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non sem nisi. Quisque
                  posuere sem quis venenatis aliquet. Integer placerat cursus enim, sed placerat
                  elit interdum vel. In eu leo fringilla, accumsan nibh nec, vulputate diam. Cras
                  aliquam placerat mauris, sit amet dictum nibh fringilla ac. Nullam nec mi at eros
                  pellentesque cursus. Sed id ultrices magna. Quisque cursus ut felis ut bibendum.
                  Nulla sit amet rhoncus nibh. Aliquam mattis consequat felis, quis feugiat erat
                  consequat sit amet. Vestibulum dictum elit nunc, a vehicula dui porttitor euismod.
                  Sed sed libero ante. Sed sed ullamcorper purus. Cras fermentum feugiat gravida.
                  Donec sed rutrum dui. Suspendisse maximus congue consectetur.
                </Text>
              </ScrollView>
            </Panel>
          </Panel>
          <Button
            mode="day"
            type="large"
            appearance="strong"
            onPress={(): void => setInfoViewVisisble(false)}
          >
            Close
          </Button>
        </Overlay>
      )}
      {colorPickerVisible && (
        <Overlay type="page">
          <Panel flex={1} center>
            {/* @ts-ignore */}
            <ColorPicker
              color={primaryColor}
              onColorSelected={(color): void => setPrimaryColor(color)}
              onColorChange={(color): void => setPrimaryColor(fromHsv(color))}
              defaultColor={primaryColor}
              hideSliders
              style={{
                width: WIDTH - SPACE * 2,
                height: WIDTH - SPACE * 2,
              }}
            />
          </Panel>
          <Button
            mode="day"
            type="large"
            appearance="strong"
            onPress={(): void => setColorPickerVisible(false)}
          >
            Close
          </Button>
        </Overlay>
      )}
      {selectProfilePicVisible && (
        <Overlay type="page" paddingHorizontal={0}>
          <Panel flex={1} center>
            <Text type="h3" mode="night" appearance="normal" textAlign="center">
              Select profile picture
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.picScrollView}
              contentContainerStyle={styles.picScrollViewContent}
            >
              {shots.map(
                (shot, index: number): ReactNode => {
                  if (shot?.image) {
                    return (
                      <Thumbnail
                        key={shot.id as string}
                        src={{ uri: `data:image/jpeg;base64,${shot.image}` }}
                        marginRight={index === (shots.length as number) - 1 ? 1 : 0.5}
                        marginLeft={index === 0 && 1}
                        outline={index === profilePicActiveIndex && 'blue'}
                        onPress={(): void => setProfilePicActiveIndex(index)}
                        backgroundColor="grey4"
                      />
                    );
                  }
                  return null;
                }
              )}
            </ScrollView>
          </Panel>
          <Button
            marginHorizontal
            mode="day"
            type="large"
            appearance="strong"
            onPress={(): void => setColorPickerVisible(false)}
          >
            Save
          </Button>
        </Overlay>
      )}
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
  picScrollView: {
    flexGrow: 0,
    paddingVertical: SPACE,
  },
  picScrollViewContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default MyProfileEdit;
