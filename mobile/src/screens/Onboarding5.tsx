import React, { FC, useEffect } from 'react';
import { StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeArea } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Button, SvgBlob, Panel, Text, Color, AssetStyles } from '../components';
import { ChildNavigationProp } from './HomeRoot';
import { OnboardingRootNavigationProp } from './OnboardingRoot';
import { storeTheme } from '../store';

const OnboardingScreen5: FC = () => {
  const dispatch = useDispatch();
  const insets = useSafeArea();
  const navigationChild = useNavigation<ChildNavigationProp>();
  const navigation = useNavigation<OnboardingRootNavigationProp>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(storeTheme.updatePager({ activeIndex: 3, count: 3, visible: false }));
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={{ uri: 'https://source.unsplash.com/random' }} style={{ flex: 1 }}>
        <Panel
          backgroundColor="purple"
          flex={1}
          style={[StyleSheet.absoluteFill, { opacity: 0.75 }]}
        />
        <BlurView tint="dark" intensity={75} style={[StyleSheet.absoluteFill, { flex: 1 }]} />
        <SvgBlob color="white" scale={3} style={styles.blob} />
        <Panel
          marginHorizontal={2}
          flex={1}
          style={{ marginTop: insets.top, marginBottom: insets.top }}
        >
          <Panel flex={1} justifyContent="space-around">
            <Panel center>
              <Text
                marginTop={0.5}
                marginBottom={0.5}
                textAlign="center"
                mode="night"
                type="h3"
                appearance="normal"
              >
                #metoo should not be limited to art and TV
              </Text>
            </Panel>
          </Panel>
        </Panel>
        <Panel
          flex={1}
          marginHorizontal
          justifyContent="flex-end"
          style={{ marginBottom: insets.top }}
        >
          <Text mode="day" type="h3" appearance="heavy" marginBottom textAlign="center">
            You are in complete control of your stories and data
          </Text>
          <Text
            mode="day"
            type="p"
            appearance="normal"
            regular
            textAlign="center"
            color="grey"
            marginHorizontal
            marginBottom
          >
            It is entirely up to you to take action when you are ready
          </Text>
          <Button
            type="large"
            mode="day"
            appearance="strong"
            onPress={(): void => navigationChild.navigate('HomeRoot')}
          >
            Enter
          </Button>
        </Panel>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  blob: {
    position: 'absolute',
    bottom: '-15%',
    left: '-50%',
    transform: [{ rotate: '-10deg' }],
    shadowRadius: 50,
    shadowColor: Color.red,
    shadowOpacity: 0.25,
  },
  ruler: {
    position: 'absolute',
    width: 5,
    height: AssetStyles.measure.window.height,
    top: 0,
    right: 0,
  },
  rulerArrow: {
    position: 'absolute',
    top: '50%',
    right: 5,
  },
});

export default OnboardingScreen5;
