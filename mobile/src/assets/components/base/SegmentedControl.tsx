import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { ModeType } from '../../../types';
import Panel, { MarginProps } from './Panel';
import { Color } from '../../colors';
import Text from '../core/Text';

interface SegmentedControllerItemProps {
  text: string;
  active: boolean;
  onPress: () => void;
}

const SegmentedControllerItem: FC<SegmentedControllerItemProps> = ({ active, text, onPress }) => {
  return (
    <Panel flex={1} center onPress={onPress} backgroundColor={active ? 'blue' : 'transparent'}>
      <Text type="p" bold color={active ? 'white' : 'blue'}>
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
}

const SegmentedController: FC<SegmentedControllerProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mode,
  title,
  activeIndex,
  items,
  onChange,
  ...rest
}) => {
  return (
    <Panel {...rest}>
      {title && (
        <Text type="h4" marginBottom={0.5}>
          {title}
        </Text>
      )}
      <Panel row style={styles.container}>
        {items.map(({ title: keyTitle }, index) => (
          <SegmentedControllerItem
            key={keyTitle}
            active={activeIndex === index}
            text={keyTitle}
            onPress={(): void => onChange(index)}
          />
        ))}
      </Panel>
    </Panel>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: Color.blue,
    borderWidth: 2,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
});

export default SegmentedController;
