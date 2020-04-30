import React, { useEffect, FC } from 'react';
import { StatusBar, StyleSheet, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeArea } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, SvgBlob, Panel, Text, Color, AssetStyles } from '../components';
import { OnboardingRootParamList } from './OnboardingRoot';

type ScreenNavigationProp = StackNavigationProp<OnboardingRootParamList, 'Onboarding5'>;

type NavProps = {
  navigation: ScreenNavigationProp;
};

type Onboarding5Props = NavProps;
type OnboardingScreen5Props = Onboarding5Props;

const OnboardingScreen5: FC<OnboardingScreen5Props> = ({ navigation }) => {
  const insets = useSafeArea();
  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  return (
    <>
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
            onPress={(): void => navigation.navigate('Home')}
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
