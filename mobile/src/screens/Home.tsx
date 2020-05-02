import _ from 'lodash';
import React, { FC } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Post, Color, AssetStyles, Navigation, NavigationIcon } from '../components';
import { HomeRootParamList, HomeRootNavigationProp } from './HomeRoot';
import { NavigationLogo } from '../components/base/Navigation';

type ScreenNavigationProp = StackNavigationProp<HomeRootParamList, 'Home'>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type HomeProps = NavProps;

const TITLE = 'Why read motivational sayings?';
const CONTENT =
  'For motivation! You might need a bit, if you can use last year’s list of goals this year because it’s as good as new. All of us can benefit from inspirational thoughts, so here are ten great ones.';

const Home: FC<HomeProps> = () => {
  const navigation = useNavigation<HomeRootNavigationProp>();

  return (
    <>
      <Navigation
        mode="day"
        Left={
          <NavigationIcon
            mode="day"
            type="search"
            onPress={(): void => navigation.navigate('CreateRoot')}
          />
        }
        Center={<NavigationLogo mode="day" />}
        Right={<NavigationIcon mode="day" type="chat" onPress={(): void => Alert.alert('test')} />}
      />
      <ScrollView style={styles.scrollView}>
        {_.times(10, () => (
          <Post key={_.uniqueId('id_')} gutter title={TITLE} content={CONTENT} />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Color.grey4,
    paddingTop: AssetStyles.measure.space,
  },
});

export default Home;
