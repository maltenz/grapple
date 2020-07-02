import _ from 'lodash';
import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, Animated } from 'react-native';

import Emoji from 'react-native-emoji';

import PostNavbar, { PostNavbarItem } from './PostNavbar';
import PostContent from './PostContent';
import { AssetStyles } from '../../styles';
import Panel from './Panel';
import NavBarUser from './NavBarUser';
import { Color } from '../../colors';

import { Shot as ShotType, AwardsEnum } from '../../../generated/graphql';
import ReactionMenu from '../../../screens/components/ReactionMenu';

const POST_USER_IMAGE_SAMPLE = { uri: 'https://source.unsplash.com/120x120' };

export type Icon = 'heart' | 'broken_heart';

export interface AnimIconConfig {
  duration: number;
  delay: number;
  tolerance: number;
  iconName: string;
  active: boolean;
  width: number;
  fontSize: number;
}

interface ShotProps extends ShotType {
  index: number;
  onHeart?: () => void;
  onReaction?: (icon: AwardsEnum) => void;
  reactionsVisible?: boolean;
  bookmarked?: boolean;
  onBookmark?: () => void;
  commented?: boolean;
  onComments?: () => void;
  animIconConfig?: AnimIconConfig;
  gutter?: boolean;
}

interface IconProps {
  index: number;
  config: AnimIconConfig;
  gutter?: boolean;
}

const TOTAL = 9;
const WINDOW_WIDTH = AssetStyles.measure.window.width;
const GUTTER = AssetStyles.measure.space;

const Icon: FC<IconProps> = ({
  config: {
    duration: propDuration,
    delay: propDelay,
    tolerance,
    active,
    iconName,
    width,
    fontSize: propFontSize,
  },
  gutter,
  index,
}) => {
  const [anim] = useState<Animated.Value>(new Animated.Value(0));
  const [left, setLeft] = useState<number>(0);
  const [fontSize] = useState(
    Math.floor(Math.random() * (propFontSize - propFontSize / 3 + 1) + propFontSize / 3)
  );
  const [delay, setDelay] = useState<number>(0);
  const [duration, setDuration] = useState<number>();

  const screenWidth = gutter ? WINDOW_WIDTH - GUTTER * 2 : WINDOW_WIDTH;

  useEffect(() => {
    setDuration(randomDuration());
    setDelay(randomDelay() - width / 2);
    switch (index) {
      case 0:
      case 3:
      case 6:
        setLeft(randomX() + width / 2);
        break;
      case 1:
      case 4:
      case 7:
        setLeft(randomX() + screenWidth / 2 - width / 2);
        break;
      case 2:
      case 5:
      case 8:
        setLeft(randomX() + screenWidth - width);
        break;
      default:
    }
  }, [active]);

  useEffect(() => {
    if (active) {
      Animated.timing(anim, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }).start(() => {
        anim.setValue(0);
      });
    }
  }, [active]);

  const randomDelay = (): number => Math.floor(Math.random() * propDelay);
  const randomDuration = (): number =>
    Math.floor(Math.random() * (propDuration - tolerance + 1) + tolerance);
  const randomX = (): number => Math.floor(Math.random() * 60) + 1 - 30;

  const interpolate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -(WINDOW_WIDTH + width * 2)],
  });

  return (
    <Animated.View
      style={[
        styles.heartContainer,
        {
          bottom: -width,
          left,
          transform: [{ translateY: interpolate }],
        },
      ]}
    >
      <Emoji name={iconName} style={{ fontSize }} />
    </Animated.View>
  );
};

const Shot: FC<ShotProps> = ({
  index,
  title,
  content,
  image,
  onHeart,
  onReaction,
  reactionsVisible,
  bookmarked,
  onBookmark,
  commented,
  onComments,
  animIconConfig,
  gutter,
}) => {
  const [animList] = useState<number[]>(_.times(TOTAL, (listIndex) => listIndex));

  const width = gutter ? WINDOW_WIDTH - GUTTER * 2 : WINDOW_WIDTH;

  return (
    <>
      <ImageBackground
        source={{ uri: image as string }}
        resizeMode="cover"
        style={[
          styles.image,
          {
            width,
            height: width,
          },
        ]}
      >
        {index === 0 && (
          <>
            <NavBarUser
              userType="approved"
              name="Malte Boeing"
              src={POST_USER_IMAGE_SAMPLE}
              mode="day"
            />
            {animList.map((itemIndex) => (
              <Icon key={itemIndex} index={itemIndex} config={animIconConfig as AnimIconConfig} />
            ))}
            <ReactionMenu
              visible={reactionsVisible || false}
              onReaction={onReaction as (icon: AwardsEnum) => void}
            />
          </>
        )}
      </ImageBackground>
      <Panel marginVertical={0.5} marginHorizontal={gutter ? 0.5 : 1}>
        {index === 0 && (
          <PostNavbar
            Icons={
              <>
                <Panel flex={1} row>
                  <PostNavbarItem type="like" onPress={onHeart} marginRight active />
                  <PostNavbarItem
                    type="comment"
                    marginRight
                    onPress={onComments}
                    active={commented as boolean}
                  />
                  <PostNavbarItem
                    type="share"
                    marginRight
                    // eslint-disable-next-line @typescript-eslint/no-empty-function
                    onPress={(): void => {}}
                    active={false}
                  />
                </Panel>
                <PostNavbarItem
                  type="bookmark"
                  onPress={onBookmark}
                  active={bookmarked as boolean}
                />
              </>
            }
          />
        )}
        <PostContent title={title as string} content={content as string} />
      </Panel>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    padding: AssetStyles.measure.space / 2,
    backgroundColor: Color.grey,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  heartContainer: {
    position: 'absolute',
  },
});

export default Shot;
