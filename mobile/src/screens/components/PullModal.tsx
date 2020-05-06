/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-underscore-dangle */
import React, { FC, useState } from 'react';
import { StyleSheet, PanResponder, Animated, PanResponderGestureState } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { PullBar, AssetStyles, Color } from '../../components';
import { NavigationHeight } from '../../components/base/Navigation';

interface PullModalProps {
  yValue: number;
}
const easing = (t: number): number =>
  // eslint-disable-next-line no-restricted-properties
  1 - Math.pow(Math.cos((t * Math.PI) / 2), 3) * Math.cos(t * 3);

const WINDOW_HEIGHT = AssetStyles.measure.window.height;
const DUR = 500;

const PullModal: FC<PullModalProps> = ({ children, yValue }) => {
  const [initialY] = useState(WINDOW_HEIGHT - Math.abs(yValue));
  const [pan] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
  pan.y.setValue(initialY);

  const inset = useSafeArea();

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: Animated.event([
        null,
        {
          dx: new Animated.Value(0),
          dy: pan.y,
        },
      ]),
      onPanResponderGrant: () => {
        pan.setOffset({
          x: 0,
          // @ts-ignore
          y: pan.y._value,
        });
      },

      onPanResponderEnd: (e, { vy, dy }: PanResponderGestureState) => {
        pan.flattenOffset();
        const IS_SWIPE = vy > 0.5 || vy < -0.5;
        const IS_UP = Math.sign(dy) === -1;

        if (IS_SWIPE && IS_UP) {
          Animated.timing(pan, {
            toValue: { x: 0, y: NavigationHeight + inset.top },
            duration: DUR,
            easing,
          }).start();
        } else if (!IS_UP) {
          Animated.timing(pan, { toValue: { x: 0, y: initialY }, easing, duration: DUR }).start();
        }
      },
    })
  ).current;

  return (
    <>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.container, StyleSheet.absoluteFill, pan.getLayout()]}
      >
        <PullBar mode="day" />
        {children}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: WINDOW_HEIGHT,
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
