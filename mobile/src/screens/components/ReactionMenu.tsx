import React, { FC, useState, useEffect } from 'react';

import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { BlurView } from 'expo-blur';

import Panel from '../../assets/components/base/Panel';
import { AwardsEnum } from '../../generated/graphql';
import Award from '../../assets/components/base/Award';
import { AssetStyles } from '../../assets/styles';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const HEIGHT = 40;

type ReactionMenuProps = {
  onReaction: (icon: AwardsEnum) => void;
  visible: boolean;
};

interface IconProps {
  name: AwardsEnum;
  style?: StyleProp<ViewStyle> | unknown;
  onPress: (value: AwardsEnum) => void;
}

const duration = 200;
const interpolate = { inputRange: [0, 1], outputRange: [0, 1] };

const Icon: FC<IconProps> = ({ name, style, onPress }) => (
  <AnimatedTouchableOpacity
    // @ts-ignore
    style={style}
    onPress={(): void => onPress(name)}
  >
    <BlurView key={name} tint="light" intensity={100} style={styles.item}>
      <Award type={name} />
    </BlurView>
  </AnimatedTouchableOpacity>
);

const ReactionMenu: FC<ReactionMenuProps> = ({ onReaction, visible }) => {
  const [AnimAngelPos] = useState(new Animated.Value(-HEIGHT));
  const [AnimAngelOpacity] = useState(new Animated.Value(0));
  const [AnimBravePos] = useState(new Animated.Value(-HEIGHT));
  const [AnimBraveOpacity] = useState(new Animated.Value(0));
  const [AnimCalmingPos] = useState(new Animated.Value(-HEIGHT));
  const [AnimCalmingOpacity] = useState(new Animated.Value(0));
  const [AnimChattyPos] = useState(new Animated.Value(-HEIGHT));
  const [AnimChattyOpacity] = useState(new Animated.Value(0));
  const [AnimFunnyPos] = useState(new Animated.Value(-HEIGHT));
  const [AnimFunnyOpacity] = useState(new Animated.Value(0));
  const [AnimHelpfulPos] = useState(new Animated.Value(-HEIGHT));
  const [AnimHelpfulOpacity] = useState(new Animated.Value(0));
  const [AnimHonestPos] = useState(new Animated.Value(-HEIGHT));
  const [AnimHonestOpacity] = useState(new Animated.Value(0));
  const [AnimSmartPos] = useState(new Animated.Value(-HEIGHT));
  const [AnimSmartOpacity] = useState(new Animated.Value(0));
  const [AnimSurvivorPos] = useState(new Animated.Value(-HEIGHT));
  const [AnimSurvivorOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    const configPos = { toValue: visible ? 0 : -HEIGHT, duration, useNativeDriver: true };
    const configOpacity = { toValue: visible ? 1 : 0, duration, useNativeDriver: true };
    Animated.stagger(50, [
      Animated.timing(AnimAngelPos, configPos),
      Animated.timing(AnimBravePos, configPos),
      Animated.timing(AnimCalmingPos, configPos),
      Animated.timing(AnimChattyPos, configPos),
      Animated.timing(AnimFunnyPos, configPos),
      Animated.timing(AnimHelpfulPos, configPos),
      Animated.timing(AnimHonestPos, configPos),
      Animated.timing(AnimSmartPos, configPos),
      Animated.timing(AnimSurvivorPos, configPos),
    ]).start();
    Animated.stagger(50, [
      Animated.timing(AnimAngelOpacity, configOpacity),
      Animated.timing(AnimBraveOpacity, configOpacity),
      Animated.timing(AnimCalmingOpacity, configOpacity),
      Animated.timing(AnimChattyOpacity, configOpacity),
      Animated.timing(AnimFunnyOpacity, configOpacity),
      Animated.timing(AnimHelpfulOpacity, configOpacity),
      Animated.timing(AnimHonestOpacity, configOpacity),
      Animated.timing(AnimSmartOpacity, configOpacity),
      Animated.timing(AnimSurvivorOpacity, configOpacity),
    ]).start();
  }, [visible]);

  const interpolateAngelPos = AnimAngelPos.interpolate(interpolate);
  const interpolateAngelOpacity = AnimAngelOpacity.interpolate(interpolate);
  const interpolateBravePos = AnimBravePos.interpolate(interpolate);
  const interpolateBraveOpacity = AnimBraveOpacity.interpolate(interpolate);
  const interpolateCalmingPos = AnimCalmingPos.interpolate(interpolate);
  const interpolateCalmingOpacity = AnimCalmingOpacity.interpolate(interpolate);
  const interpolateChattyPos = AnimChattyPos.interpolate(interpolate);
  const interpolateChattyOpacity = AnimChattyOpacity.interpolate(interpolate);
  const interpolateFunnyPos = AnimFunnyPos.interpolate(interpolate);
  const interpolateFunnyOpacity = AnimFunnyOpacity.interpolate(interpolate);
  const interpolateHelpfulPos = AnimHelpfulPos.interpolate(interpolate);
  const interpolateHelpfulOpacity = AnimHelpfulOpacity.interpolate(interpolate);
  const interpolateHonestPos = AnimHonestPos.interpolate(interpolate);
  const interpolateHonestOpacity = AnimHonestOpacity.interpolate(interpolate);
  const interpolateSmartPos = AnimSmartPos.interpolate(interpolate);
  const interpolateSmartOpacity = AnimSmartOpacity.interpolate(interpolate);
  const interpolateSurvivorPos = AnimSurvivorPos.interpolate(interpolate);
  const interpolateSurvivorOpacity = AnimSurvivorOpacity.interpolate(interpolate);

  return (
    <Panel row justifyContent="space-between" alignItems="center">
      <ScrollView
        horizontal
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: AssetStyles.measure.space }}
      >
        <Icon
          name={AwardsEnum.Angel}
          onPress={onReaction}
          style={{
            transform: [{ translateY: interpolateAngelPos }],
            opacity: interpolateAngelOpacity,
          }}
        />
        <Icon
          name={AwardsEnum.Brave}
          onPress={onReaction}
          style={{
            transform: [{ translateY: interpolateBravePos }],
            opacity: interpolateBraveOpacity,
          }}
        />
        <Icon
          name={AwardsEnum.Calming}
          onPress={onReaction}
          style={{
            transform: [{ translateY: interpolateCalmingPos }],
            opacity: interpolateCalmingOpacity,
          }}
        />
        <Icon
          name={AwardsEnum.Chatty}
          onPress={onReaction}
          style={{
            transform: [{ translateY: interpolateChattyPos }],
            opacity: interpolateChattyOpacity,
          }}
        />
        <Icon
          name={AwardsEnum.Funny}
          onPress={onReaction}
          style={{
            transform: [{ translateY: interpolateFunnyPos }],
            opacity: interpolateFunnyOpacity,
          }}
        />
        <Icon
          name={AwardsEnum.Helpful}
          onPress={onReaction}
          style={{
            transform: [{ translateY: interpolateHelpfulPos }],
            opacity: interpolateHelpfulOpacity,
          }}
        />
        <Icon
          name={AwardsEnum.Honest}
          onPress={onReaction}
          style={{
            transform: [{ translateY: interpolateHonestPos }],
            opacity: interpolateHonestOpacity,
          }}
        />
        <Icon
          name={AwardsEnum.Smart}
          onPress={onReaction}
          style={{
            transform: [{ translateY: interpolateSmartPos }],
            opacity: interpolateSmartOpacity,
          }}
        />
        <Icon
          name={AwardsEnum.Survivor}
          onPress={onReaction}
          style={{
            transform: [{ translateY: interpolateSurvivorPos }],
            opacity: interpolateSurvivorOpacity,
          }}
        />
      </ScrollView>
    </Panel>
  );
};

const styles = StyleSheet.create({
  item: {
    height: HEIGHT,
    width: HEIGHT,
    borderRadius: AssetStyles.measure.radius.regular,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: AssetStyles.measure.space / 2,
  },
  scrollView: {
    marginLeft: -AssetStyles.measure.space / 2,
    marginRight: -AssetStyles.measure.space / 2,
    overflow: 'visible',
  },
  heartContainer: {
    height: HEIGHT,
    width: HEIGHT,
    borderRadius: HEIGHT / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReactionMenu;
