/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-underscore-dangle */
import React, { FC, useRef } from 'react';
import { StyleSheet, PanResponder, View, Animated } from 'react-native';
import { PullBar, AssetStyles, Color } from '../../components';

const OFFSET_HEIGHT = 100;

const PullModal: FC = ({ children }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: 0,
          // @ts-ignore
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dy: pan.y }]),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <>
      <View {...panResponder.panHandlers} />
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY: pan.y }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <PullBar mode="day" />
        {children}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: AssetStyles.measure.window.height - OFFSET_HEIGHT,
    right: 0,
    left: 0,
    height: AssetStyles.measure.window.height,
    backgroundColor: Color.white,
    ...AssetStyles.shadow.deep,
    borderTopRightRadius: AssetStyles.measure.radius.large,
    borderTopLeftRadius: AssetStyles.measure.radius.large,
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default PullModal;
