import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { ModeType, ColorType } from '../../../types';
import Panel, { MarginProps } from './Panel';
import { Color } from '../../colors';
import Text from '../core/Text';

interface SegmentedControllerItemProps {
  text: string;
  active: boolean;
  onPress: () => void;
  color?: ColorType;
}

const SegmentedControllerItem: FC<SegmentedControllerItemProps> = ({
  active,
  text,
  onPress,
  color,
}) => {
  let activeColor: ColorType;
  let textColor: ColorType;

  if (color) {
    activeColor = color;
    textColor = color;
  } else {
    activeColor = 'blue';
    textColor = 'blue';
  }

  return (
    <Panel flex={1} center onPress={onPress} backgroundColor={active ? activeColor : 'transparent'}>
      <Text type="p" bold color={active ? 'white' : textColor}>
        {text}
      </Text>
    </Panel>
  );
};

interface SegmentedControllerProps extends MarginProps {
  title?: string;
  activeIndex: number;
  items: Array<{
    title: string;
  }>;
  onChange: (index: number) => void;
  mode: ModeType;
  color?: ColorType;
}

const SegmentedController: FC<SegmentedControllerProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mode,
  title,
  activeIndex,
  items,
  onChange,
  color,
  ...rest
}) => {
  return (
    <Panel {...rest}>
      {title && (
        <Text type="h4" marginBottom={0.5}>
          {title}
        </Text>
      )}
      <Panel row style={[styles.container, { borderColor: color ? Color[color] : color }]}>
        {items.map(({ title: keyTitle }, index) => (
          <SegmentedControllerItem
            key={keyTitle}
            active={activeIndex === index}
            text={keyTitle}
            onPress={(): void => onChange(index)}
            color={color}
          />
        ))}
      </Panel>
    </Panel>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
});

export default SegmentedController;
