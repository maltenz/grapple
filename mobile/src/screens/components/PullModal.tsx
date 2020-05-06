/* eslint-disable @typescript-eslint/ban-ts-ignore, no-underscore-dangle  */
import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, PanResponder, Animated, PanResponderGestureState } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { PullBar, AssetStyles, Color, ButtonNormalHeight, PullBarHeight } from '../../components';
import { NavigationHeight } from '../../components/base/Navigation';

const WINDOW_HEIGHT = AssetStyles.measure.window.height;
const PullbarOffset = ButtonNormalHeight + PullBarHeight + AssetStyles.measure.space;

const PullModal: FC = ({ children }) => {
  const inset = useSafeArea();
  const [bottom] = useState(WINDOW_HEIGHT - Math.abs(PullbarOffset) - inset.bottom);
  const [top] = useState(NavigationHeight + inset.top);
  const [pan] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
  useEffect(() => {
    pan.y.setValue(bottom);
  }, []);

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
      onPanResponderEnd: (e, { dy }: PanResponderGestureState) => {
        const notTouchEvent = dy > 5 || dy < -5;
        pan.flattenOffset();
        const IS_UP = Math.sign(dy) === -1;
        if (IS_UP && notTouchEvent) {
          Animated.timing(pan, {
            toValue: { x: 0, y: top },
          }).start();
        } else if (notTouchEvent) {
          Animated.timing(pan, {
            toValue: { x: 0, y: bottom },
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.container, StyleSheet.absoluteFill, pan.getLayout()]}
    >
      <PullBar mode="day" />
      {children}
    </Animated.View>
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
});

export { PullbarOffset };

export default PullModal;
