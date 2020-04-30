import _ from 'lodash';
import React, { FC, useState } from 'react';
import { ScrollView, Alert, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Gallery,
  GalleryItemType,
  Navigation,
  NavigationIcon,
  AssetStyles,
  Panel,
  NavBarUserPostEdit,
  PostContent,
  BulletPager,
} from '../components';
import { CreateRootParamList } from './CreateRoot';

type ScreenNavigationProp = StackNavigationProp<CreateRootParamList, 'MyPost'>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type MyPostsProps = NavProps;

const GALERY_ITEM_SAMPLE = {
  src: {
    thumbnail: { uri: 'https://source.unsplash.com/random' },
    large: { uri: 'https://source.unsplash.com/random' },
  },
};

const GALLERY: GalleryItemType[] = [
  { ...GALERY_ITEM_SAMPLE, id: 'asd' },
  { ...GALERY_ITEM_SAMPLE, id: 'a3a' },
  { ...GALERY_ITEM_SAMPLE, id: 'ags' },
  { ...GALERY_ITEM_SAMPLE, id: '42v' },
  { ...GALERY_ITEM_SAMPLE, id: '525' },
  { ...GALERY_ITEM_SAMPLE, id: '6hj' },
];

const TITLE = 'Why read motivational sayings?';
const CONTENT =
  'For motivation! You might need a bit, if you can use last year’s list of goals this year because it’s as good as new. All of us can benefit from inspirational thoughts, so here are ten great ones.';

const MyPosts: FC<MyPostsProps> = ({ navigation }) => {
  const [galleryActiveIndex, setGalleryActiveIndex] = useState(0);
  const [galleryHeroImg, setGalleryHeroImg] = useState({
    uri: 'https://source.unsplash.com/random',
  });

  const handleGalleryOnChange = (id: string, index: number): void => {
    const { large } = GALLERY[index].src;
    const uri = _.get(large, ['uri']);
    setGalleryHeroImg({ uri });
    setGalleryActiveIndex(index);
  };
  return (
    <>
      <Navigation
        mode="day"
        Left={
          <NavigationIcon
            mode="day"
            type="search"
            onPress={(): void => navigation.navigate('Camera')}
          />
        }
        Right={<NavigationIcon mode="day" type="chat" onPress={(): void => Alert.alert('test')} />}
      />
      <ScrollView style={styles.scrollView}>
        {_.times(5, () => {
          return (
            <Panel marginBottom key={_.uniqueId('id_')}>
              <Gallery
                Nav={
                  <NavBarUserPostEdit
                    mode="day"
                    attachments={5}
                    onPressEdit={(): void => Alert.alert('edit')}
                  />
                }
                onChange={handleGalleryOnChange}
                items={GALLERY}
                activeIndex={galleryActiveIndex}
                src={galleryHeroImg}
                utility="delete"
                mode="day"
                type="feature"
                gutter
              />
              <Panel
                marginHorizontal
                paddingHorizontal={0.5}
                paddingVertical={0.5}
                backgroundColor="white"
              >
                <PostContent title={TITLE} content={CONTENT} />
                <BulletPager
                  marginTop
                  center
                  marginBottom={0.5}
                  mode="day"
                  count={5}
                  activeIndex={2}
                />
              </Panel>
            </Panel>
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: AssetStyles.measure.space,
  },
});

export default MyPosts;
