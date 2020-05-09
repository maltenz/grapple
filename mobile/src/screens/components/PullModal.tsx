/* eslint-disable @typescript-eslint/ban-ts-ignore, no-underscore-dangle  */
import React, { FC, useState, useEffect, memo } from 'react';
import { StyleSheet, PanResponder, Animated, PanResponderGestureState } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { PullBar, AssetStyles, Color, ButtonNormalHeight, PullBarHeight } from '../../assets';
import { NavigationHeight } from '../../assets/components/base/Navigation';
import { layoutSelectors } from '../../store';

const WINDOW_HEIGHT = AssetStyles.measure.window.height;
const PullbarOffset = ButtonNormalHeight + PullBarHeight + AssetStyles.measure.space;

const PullModal: FC = memo(
  ({ children }) => {
    const inset = useSafeArea();
    const pullModalVisible = useSelector(layoutSelectors.pullModalVisibleSelector);
    const [hiddenAnim] = useState(new Animated.Value(0));
    const [bottom] = useState(WINDOW_HEIGHT - Math.abs(PullbarOffset) - inset.bottom);
    const [top] = useState(NavigationHeight + inset.top);
    const [pan] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
    pan.y.setValue(bottom);

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
          pan.flattenOffset();

          const NOT_TOUCH = dy > 5 || dy < -5;
          const IS_UP = Math.sign(dy) === -1;

          if (IS_UP && NOT_TOUCH) {
            Animated.timing(pan, {
              toValue: { x: 0, y: top },
            }).start();
          } else if (NOT_TOUCH) {
            Animated.timing(pan, {
              toValue: { x: 0, y: bottom },
            }).start();
          }
        },
      })
    ).current;

    useEffect(() => {
      Animated.timing(hiddenAnim, {
        toValue: pullModalVisible ? 1 : 0,
        duration: 250,
      }).start();
    }, [pullModalVisible]);

    const marginTop = hiddenAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [PullbarOffset + inset.bottom, 0],
    });

    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.container,
          StyleSheet.absoluteFill,
          pan.getLayout(),
          {
            marginTop,
          },
        ]}
      >
        <PullBar mode="day" />
        {children}
      </Animated.View>
    );
  },
  (): boolean => true
);

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
