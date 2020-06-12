import React, { FC, useState, useRef, RefObject } from 'react';
import { StyleSheet, ScrollView, NativeMethodsMixinStatic } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BlurView } from 'expo-blur';

import { useSafeArea } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

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
} from '../assets';

import { NavigationHeading } from '../assets/components/base/Navigation';
import { ChildNavigationProp } from './HomeRoot';
import { authUserSelector } from '../store';
import { User as UserType } from '../generated/graphql';

const WIDTH = AssetStyles.measure.window.width;
const SPACE = AssetStyles.measure.space;
const DIMENSION = WIDTH - SPACE * 2;
const CIRCLE = 125;
const RADIUS = AssetStyles.measure.radius.large;

interface HeadingProps {
  text: string;
  buttonText: string;
  onPress?: () => void;
}

type AuthType = 'public' | 'private';

interface UserProps extends UserType {
  type: AuthType;
}

const Heading: FC<HeadingProps> = ({ text, buttonText, onPress }) => {
  return (
    <Panel row justifyContent="space-between">
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

const MyProfileEdit: FC = () => {
  const inputRef: RefObject<NativeMethodsMixinStatic> = useRef(null);
  const navigation = useNavigation<ChildNavigationProp>();
  const inset = useSafeArea();
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const user = useSelector(authUserSelector);
  const [editBioActive, setEditBioActive] = useState<boolean>(false);
  const [bioValue, setBioValue] = useState(
    `Many people has the notion that enlightenment is one state. Many also believe that when it is attained, a person is forever in that state.`
  );

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
        <Panel margin>
          <Heading text="Privacy" buttonText="Info" />
          <SegmentedController
            mode="day"
            activeIndex={activeIndex}
            onChange={(index): void => setActiveIndex(index)}
            items={[{ title: 'Public' }, { title: 'Private' }]}
            marginTop
            marginBottom={2}
          />
          <Panel style={styles.profile} marginBottom={2} center>
            <SvgWiggleFill dimension={DIMENSION} style={StyleSheet.absoluteFill} />
            <User type={activeIndex === 0 ? 'public' : 'private'} {...user} />
          </Panel>
          <Heading
            text="Bio"
            buttonText="Edit"
            onPress={(): void => setEditBioActive(!editBioActive)}
          />
          <Comment
            ref={inputRef}
            marginBottom={2}
            text={bioValue}
            type={editBioActive ? 'input' : 'comment'}
            name="bio"
            placeholder="Something about you"
            onChange={(text): void => setBioValue(text)}
            onBlur={(): void => setEditBioActive(false)}
          />
          <Heading text="Talent" buttonText="Add" />
        </Panel>
        <ScrollView horizontal style={styles.scrollView} showsHorizontalScrollIndicator={false}>
          <Tag text="Legal" marginLeft />
          <Tag text="Helped 23" />
          <Tag text="Accomodation" />
          <Tag text="Survivor" />
          <Tag text="Chat" />
          <Tag text="Call" />
        </ScrollView>
      </KeyboardAwareScrollView>
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
  scrollView: {
    paddingBottom: SPACE,
  },
  icon: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: 0,
  },
});

export default MyProfileEdit;
