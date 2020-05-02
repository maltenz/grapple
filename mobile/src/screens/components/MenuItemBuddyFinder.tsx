import React, { FC, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Panel from '../../components/base/Panel';
import CoreText from '../../components/core/Text';
import { ProfileItemProps } from '../Profile';
import Thumbnail from '../../components/base/Thumbnail';

const TITLE = 'Why read motivational sayings?';
const CONTENT =
  'For motivation! You might need a bit, if you can use last year’s list of goals this year because it’s as good as new. All of us can benefit from inspirational thoughts, so here are ten great ones.';

const BUDDY_ITEM = {
  src: {
    thumbnail: { uri: 'https://source.unsplash.com/random' },
    large: { uri: 'https://source.unsplash.com/random' },
  },
};

const BUDDIES: ProfileItemProps[] = [
  {
    ...BUDDY_ITEM,
    name: TITLE,
    excerpt: CONTENT,
    id: '123',
  },
  {
    ...BUDDY_ITEM,
    name: TITLE,
    excerpt: CONTENT,
    id: '231',
  },
  {
    ...BUDDY_ITEM,
    name: TITLE,
    excerpt: CONTENT,
    id: '535',
  },
  {
    ...BUDDY_ITEM,
    name: TITLE,
    excerpt: CONTENT,
    id: '532',
  },
  {
    ...BUDDY_ITEM,
    name: TITLE,
    excerpt: CONTENT,
    id: '523',
  },
];

const MenuItemBuddyFinder: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onChange = (id: string, index: number): void => {
    setActiveIndex(index);
  };

  return (
    <Panel paddingVertical justifyContent="space-between" style={styles.container}>
      <CoreText type="p" minLineHeight marginLeft={1} marginBottom={0.5}>
        Find a buddy
      </CoreText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {BUDDIES.map(({ src, id }, index) => {
          return (
            <Thumbnail
              key={id}
              src={src.thumbnail}
              marginRight={index === BUDDIES.length - 1 ? 1 : 0.25}
              marginLeft={index === 0 && 1}
              outline={index === activeIndex && 'blue'}
              onPress={(): void => onChange(id, index)}
              backgroundColor="grey4"
            />
          );
        })}
      </ScrollView>
    </Panel>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  border: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default MenuItemBuddyFinder;
