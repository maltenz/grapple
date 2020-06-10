import React, { FC, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useSafeArea } from 'react-native-safe-area-context';
import {
  Navigation,
  NavigationIcon,
  Panel,
  AssetStyles,
  Text,
  CommentBox,
  Color,
  Tag,
  SegmentedController,
} from '../assets';
import { NavigationHeading } from '../assets/components/base/Navigation';
import { ChildNavigationProp } from './HomeRoot';

const WIDTH = AssetStyles.measure.window.width;
const SPACE = AssetStyles.measure.space;

interface HeadingProps {
  text: string;
  buttonText: string;
  onPress?: () => void;
}
const Heading: FC<HeadingProps> = ({ text, buttonText }) => {
  return (
    <Panel row justifyContent="space-between">
      <Text mode="day" type="h3" appearance="normal">
        {text}
      </Text>
      <Text type="small" appearance="strong" mode="day" bold>
        {buttonText}
      </Text>
    </Panel>
  );
};

const MyProfileEdit: FC = () => {
  const navigation = useNavigation<ChildNavigationProp>();
  const inset = useSafeArea();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const PADDING_BOTTOM = inset.bottom + SPACE;

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
          <Panel style={styles.image} backgroundColor="red" />
          <Heading text="Bio" buttonText="Edit" />
          <CommentBox
            marginBottom={2}
            text="Many people has the notion that enlightenment is one state. Many also believe that when
            it is attained, a person is forever in that state."
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
  image: {
    width: WIDTH - SPACE * 2,
    height: WIDTH - SPACE * 2,
    marginBottom: SPACE * 2,
  },
  scrollView: {
    paddingBottom: SPACE,
  },
});

export default MyProfileEdit;
