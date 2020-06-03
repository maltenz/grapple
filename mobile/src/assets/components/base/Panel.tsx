import React, { FC } from 'react';
import { TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';
import { ColorType } from '../../../types';
import { AssetStyles } from '../../styles';
import { Color } from '../../colors';

export type ContentDistribution = 'space-around' | 'space-between' | 'space-evenly' | 'stretch';
export type ContentPosition = 'center' | 'end' | 'flex-end' | 'flex-start' | 'start';

const { space } = AssetStyles.measure;

export interface PanelProps extends MarginProps, PaddingProps {
  style?: StyleProp<ViewStyle>;
  backgroundColor?: ColorType;
  flex?: number;
  row?: boolean;
  center?: boolean;
  justifyContent?: ContentDistribution | ContentPosition;
  alignItems?: ContentDistribution | ContentPosition;
  onPress?: () => void;
  pointerEvents?: 'auto' | 'box-none' | 'box-only' | 'none';
  activeOpacity?: number;
}

type MeasureType = boolean | number;

export interface MarginProps {
  margin?: MeasureType;
  marginHorizontal?: MeasureType;
  marginVertical?: MeasureType;
  marginTop?: MeasureType;
  marginRight?: MeasureType;
  marginBottom?: MeasureType;
  marginLeft?: MeasureType;
}

export interface PaddingProps {
  padding?: MeasureType;
  paddingHorizontal?: MeasureType;
  paddingVertical?: MeasureType;
  paddingTop?: MeasureType;
  paddingRight?: MeasureType;
  paddingBottom?: MeasureType;
  paddingLeft?: MeasureType;
}
interface ViewOrTouchableProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  pointerEvents?: 'auto' | 'box-none' | 'box-only' | 'none';
  activeOpacity?: number;
}
const ViewOrTouchable: FC<ViewOrTouchableProps> = ({
  onPress,
  children,
  pointerEvents,
  style,
  activeOpacity,
}) => {
  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={activeOpacity} style={style} onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={style} pointerEvents={pointerEvents}>
      {children}
    </View>
  );
};

export const measure = (value: number | boolean | undefined): number | boolean | null => {
  switch (typeof value) {
    case 'number':
      return value * space;
    case 'boolean':
      return space;
    default: {
      return null;
    }
  }
};

const Panel: FC<PanelProps> = ({
  children,
  style,
  flex,
  backgroundColor,
  row,
  center,
  justifyContent,
  alignItems,
  onPress,
  pointerEvents,
  activeOpacity,
  padding,
  paddingHorizontal,
  paddingVertical,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  margin,
  marginHorizontal,
  marginVertical,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  ...rest
}) => {
  const panelStyles = {};

  if (row) {
    Object.assign(panelStyles, { flexDirection: 'row' });
  }

  if (center) {
    Object.assign(panelStyles, { justifyContent: 'center', alignItems: 'center' });
  }

  if (flex) {
    Object.assign(panelStyles, { flex });
  }

  if (justifyContent) {
    Object.assign(panelStyles, { justifyContent });
  }

  if (alignItems) {
    Object.assign(panelStyles, { alignItems });
  }

  if (backgroundColor) {
    Object.assign(panelStyles, { backgroundColor: Color[backgroundColor] });
  }

  if (padding) {
    Object.assign(panelStyles, { padding: measure(padding) });
  }

  if (paddingHorizontal) {
    Object.assign(panelStyles, { paddingHorizontal: measure(paddingHorizontal) });
  }

  if (paddingVertical) {
    Object.assign(panelStyles, { paddingVertical: measure(paddingVertical) });
  }

  if (paddingTop) {
    Object.assign(panelStyles, { paddingTop: measure(paddingTop) });
  }

  if (paddingRight) {
    Object.assign(panelStyles, { paddingRight: measure(paddingRight) });
  }

  if (paddingBottom) {
    Object.assign(panelStyles, { paddingBottom: measure(paddingBottom) });
  }

  if (paddingLeft) {
    Object.assign(panelStyles, { paddingLeft: measure(paddingLeft) });
  }

  if (margin) {
    Object.assign(panelStyles, { margin: measure(margin) });
  }

  if (marginHorizontal) {
    Object.assign(panelStyles, { marginHorizontal: measure(marginHorizontal) });
  }

  if (marginVertical) {
    Object.assign(panelStyles, { marginVertical: measure(marginVertical) });
  }

  if (marginTop) {
    Object.assign(panelStyles, { marginTop: measure(marginTop) });
  }

  if (marginRight) {
    Object.assign(panelStyles, { marginRight: measure(marginRight) });
  }

  if (marginBottom) {
    Object.assign(panelStyles, { marginBottom: measure(marginBottom) });
  }

  if (marginLeft) {
    Object.assign(panelStyles, { marginLeft: measure(marginLeft) });
  }

  return (
    <ViewOrTouchable
      onPress={onPress}
      pointerEvents={pointerEvents}
      activeOpacity={activeOpacity}
      {...rest}
      style={[panelStyles, style]}
    >
      {children}
    </ViewOrTouchable>
  );
};

export default Panel;
