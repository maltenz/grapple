import React, { FC } from 'react';
import { StyleProp, ViewStyle, LayoutAnimation } from 'react-native';

import Panel from './Panel';
import PullBar from './PullBar';
import Shot, { AnimIconConfig } from './PostShot';

import { Shot as ShotType } from '../../../generated/graphql';

interface PostProps {
  gutter?: boolean;
  style?: StyleProp<ViewStyle>;
  shots: ShotType[];
  liked: boolean;
  onLike: () => void;
  bookmarked: boolean;
  onBookmark: () => void;
  visible: boolean;
  onVisible: (value: boolean) => void;
  animIconConfig: AnimIconConfig;
}

const Post: FC<PostProps> = ({
  shots,
  liked,
  onLike,
  bookmarked,
  onBookmark,
  visible,
  onVisible,
  animIconConfig,
  gutter,
  style,
}) => {
  const handleVisible = (): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    onVisible(!visible);
  };

  return (
    <Panel
      marginHorizontal={gutter}
      marginBottom
      backgroundColor="white"
      activeOpacity={1}
      style={style}
    >
      <Shot
        key={shots[0]?.id as string}
        index={0}
        image={shots[0]?.image as string}
        title={shots[0]?.title as string}
        content={shots[0]?.content as string}
        liked={liked}
        handleLike={onLike}
        bookmarked={bookmarked}
        handleBookmark={onBookmark}
        animIconConfig={animIconConfig}
        gutter={gutter}
      />
      {visible && shots.length > 1 && (
        <>
          {shots.map((shot, index) => {
            if (index > 0) {
              return (
                <Shot
                  key={shot?.id as string}
                  index={index}
                  image={shot?.image as string}
                  title={shot?.title as string}
                  content={shot?.content as string}
                  gutter={gutter}
                />
              );
            }
            return null;
          })}
        </>
      )}
      {shots.length > 1 && <PullBar mode="day" marginBottom={0.5} onPress={handleVisible} />}
    </Panel>
  );
};

export default Post;
