import React, { FC, useState, useRef, RefObject } from 'react';
import {
  StyleSheet,
  NativeMethodsMixinStatic,
  ScrollView,
  LayoutAnimation,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BlurView } from 'expo-blur';
import { useSafeArea } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { ColorPicker, fromHsv } from 'react-native-color-picker';

import { authUserSelector } from '../store';

import {
  Navigation,
  NavigationIcon,
  Panel,
  AssetStyles,
  Text,
  Comment,
  Color,
  Tag,
  SegmentedController,
  SvgWiggleFill,
  CoreText,
  SvgIconAccount,
  SvgIconImage,
  Badge,
  Button,
  Overlay,
  OverlayHeader,
} from '../assets';

import { NavigationHeading } from '../assets/components/base/Navigation';
import { ChildNavigationProp } from './HomeRoot';

import { User as UserType } from '../generated/graphql';
import { MarginProps } from '../assets/components/base/Panel';

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

const Heading: FC<HeadingProps> = ({ text, buttonText, onPress, ...rest }) => {
  return (
    <Panel row justifyContent="space-between" {...rest}>
      <Text mode="day" type="h3" appearance="normal" marginBottom={0.5}>
        {text}
      </Text>
      <Text type="small" appearance="strong" mode="day" bold onPress={onPress}>
        {buttonText}
      </Text>
    </Panel>
  );
};

const User: FC<UserProps> = ({ type, name }) => {
  return (
    <Panel>
      <BlurView tint="light" intensity={90} style={styles.blurviewCircle}>
        {type === 'private' ? (
          <SvgIconAccount strokeWidth={3} color="purple" scale={2} />
        ) : (
          <Panel style={styles.icon}>
            <SvgIconImage strokeWidth={3} color="purple" scale={2} />
            <Badge type="add" appearance="strong" style={styles.badge} />
          </Panel>
        )}
      </BlurView>
      <BlurView tint="light" intensity={90} style={styles.blurviewText}>
        <CoreText type="p" color="purple" bold textAlign="center">
          {type === 'private' ? 'Anonymous' : name}
        </CoreText>
      </BlurView>
    </Panel>
  );
};

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
  const navigation = useNavigation<ChildNavigationProp>();
  const inset = useSafeArea();
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const user = useSelector(authUserSelector);
  const [editBioActive, setEditBioActive] = useState<boolean>(false);
  const [infoViewVisible, setInfoViewVisisble] = useState<boolean>(false);
  const [bioValue, setBioValue] = useState(
    `Many people has the notion that enlightenment is one state. Many also believe that when it is attained, a person is forever in that state.`
  );
  const [talentsVisible, setTalentsVisible] = useState<boolean>(false);

  const handleTatentsVisble = (): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTalentsVisible(!talentsVisible);
  };
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
        Left={<NavigationIcon mode="day" type="back" onPress={(): void => navigation.goBack()} />}
        Center={<NavigationHeading mode="day" text="Edit" />}
      />
      <KeyboardAwareScrollView
        style={styles.keyboardScrollView}
        contentContainerStyle={{ paddingBottom: PADDING_BOTTOM }}
      >
        <Panel marginHorizontal marginTop={2} marginBottom={2}>
          <Heading
            text="Privacy"
            buttonText="Info"
            onPress={(): void => setInfoViewVisisble(true)}
          />
          <SegmentedController
            mode="day"
            activeIndex={activeIndex}
            onChange={(index): void => setActiveIndex(index)}
            items={[{ title: 'Public' }, { title: 'Private' }]}
            marginTop
            marginBottom
            color="purple"
          />
          <Panel style={styles.profile} marginBottom={2} center>
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
            <User type={activeIndex === 0 ? 'public' : 'private'} {...user} />
          </Panel>
          <Heading
            text="Bio"
            buttonText={editBioActive ? 'Close' : 'Edit'}
            onPress={(): void => setEditBioActive(!editBioActive)}
          />
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
        <Heading
          text="Talent"
          buttonText={talentsVisible ? 'Close' : 'Add'}
          marginHorizontal
          onPress={handleTatentsVisble}
        />
        {talentsVisible && (
          <ScrollView
            horizontal
            style={styles.tagScrollViewAdd}
            showsHorizontalScrollIndicator={false}
          >
            <Tag mode="night" type="add" text="Legal" marginLeft />
            <Tag mode="night" type="add" text="Helped 23" />
            <Tag mode="night" type="add" text="Accomodation" />
            <Tag mode="night" type="add" text="Survivor" />
            <Tag mode="night" type="add" text="Chat" />
            <Tag mode="night" type="add" text="Call" />
          </ScrollView>
        )}
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
  icon: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: 0,
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
