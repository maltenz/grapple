import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Panel, SvgRulerRightArrow, AssetStyles } from '../../components';

interface RulerProps {
  position: 'lower' | 'center';
}
const Ruler: FC<RulerProps> = ({ position }) => (
  <>
    <Panel style={styles.ruler} backgroundColor="red" />
    <SvgRulerRightArrow
      color="red"
      style={[styles.rulerArrow, { top: position === 'center' ? '50%' : '65%' }]}
    />
  </>
);

const styles = StyleSheet.create({
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

export default Ruler;
