import React, { FC, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Panel from './Panel';
import CoreText from '../core/Text';
import { ProfileItemProps } from '../../screens/Profile';
import Thumbnail from '../core/Thumbnail';

interface MenuItemBuddyFinderProps {
  items: ProfileItemProps[];
  onChange: (index: number) => void;
  activeIndex: number;
}

const MenuItemBuddyFinder: FC<MenuItemBuddyFinderProps> = ({
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
    <Panel paddingVertical justifyContent="space-between" style={styles.container}>
      <CoreText type="p" minLineHeight marginLeft={1} marginBottom={0.5}>
        Find a buddy
      </CoreText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map(({ src, id }, index) => {
          return (
            <Thumbnail
              key={id}
              src={src.thumbnail}
              marginRight={index === items.length - 1 ? 1 : 0.25}
              marginLeft={index === 0 && 1}
              outline={index === activeIndex && 'blue'}
              onPress={(): void => onChange(id, index)}
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
