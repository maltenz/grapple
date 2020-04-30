import React, { FC, useState } from 'react';
import { Alert } from 'react-native';
import Panel from './Panel';
import PostContent from './PostContent';
import BulletPager from './BulletPager';
import NavBarUserPostEdit from './NavBarUserPostEdit';
import Gallery, { GalleryItemType } from './Gallery';

export interface PostsEditItemType extends GalleryItemType {
  title: string;
  content: string;
}

export interface PostsEditSliderProps {
  items: PostsEditItemType[];
  onChange: (index: number) => void;
  activeIndex: number;
}

const PostsEditSlider: FC<PostsEditSliderProps> = ({
  items,
  onChange: propsOnChange,
  activeIndex: propsActiveIndex,
}) => {
  const [activeIndex, setActiveIndex] = useState(propsActiveIndex);

  const onChange = (id: string, index: number): void => {
    setActiveIndex(index);
    propsOnChange(index);
  };

  return (
    <Panel marginBottom>
      <Gallery
        Nav={
          <NavBarUserPostEdit
            mode="day"
            attachments={5}
            onPressEdit={(): void => Alert.alert('edit')}
          />
        }
        onChange={onChange}
        items={items}
        activeIndex={activeIndex}
        src={items[activeIndex].src.large}
        utility="view"
        mode="day"
        type="feature"
        gutter
      />
      <Panel marginHorizontal paddingHorizontal={0.5} paddingVertical={0.5} backgroundColor="white">
        <PostContent title={items[activeIndex].title} content={items[activeIndex].content} />
        <BulletPager
          marginTop
          center
          marginBottom={0.5}
          mode="day"
          count={5}
          activeIndex={activeIndex}
        />
      </Panel>
    </Panel>
  );
};

export default PostsEditSlider;
