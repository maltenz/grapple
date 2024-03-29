import React, { FC, useState } from 'react';
import { ScrollView, LayoutAnimation, Platform, StyleSheet, UIManager, View } from 'react-native';

import { AssetStyles, CoreText, Panel, Text, Thumbnail, Button } from '../../assets';

import { ProfileType } from '../../types';

const TITLE = 'Why read motivational sayings?';
const CONTENT =
  'For motivation! You might need a bit, if you can use last year’s list of goals this year because it’s as good as new. All of us can benefit from inspirational thoughts, so here are ten great ones.';

const BUDDY_ITEM = {
  src: {
    thumbnail: { uri: 'https://source.unsplash.com/random' },
    large: { uri: 'https://source.unsplash.com/random' },
  },
};

const BUDDIES: ProfileType[] = [
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

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MenuItemBuddyFinder: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>();
  const [expanded, setExpanded] = useState(false);

  const onChange = (id: string, index: number): void => {
    setActiveIndex(index);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setExpanded(!expanded);
  };

  return (
    <>
      <Panel paddingVertical justifyContent="space-between">
        <Panel marginLeft>
          <CoreText type="p" minLineHeight marginBottom={0.75}>
            Find a buddy
          </CoreText>
        </Panel>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {BUDDIES.map(({ src, id }, index) => {
            return (
              <Thumbnail
                key={id}
                src={src.thumbnail}
                marginRight={index === BUDDIES.length - 1 ? 1 : 0.5}
                marginLeft={index === 0 && 1}
                outline={index === activeIndex && 'blue'}
                onPress={(): void => onChange(id, index)}
                backgroundColor="grey4"
              />
            );
          })}
        </ScrollView>
      </Panel>
      <View style={style.container}>
        {expanded && (
          <View style={style.tile}>
            <Text mode="day" type="p" bold appearance="normal" marginBottom={0.25}>
              Malte Boeing
            </Text>
            <Text mode="day" type="small" appearance="normal" marginBottom={0.5}>
              {CONTENT}
            </Text>
            <Panel alignItems="flex-end">
              <Button type="normal" appearance="normal" mode="night" marginBottom={0} outline>
                See profile
              </Button>
            </Panel>
          </View>
        )}
      </View>
    </>
  );
};

const style = StyleSheet.create({
  tile: { paddingHorizontal: AssetStyles.measure.space, paddingBottom: AssetStyles.measure.space },
  container: {
    overflow: 'hidden',
  },
});

export default MenuItemBuddyFinder;
