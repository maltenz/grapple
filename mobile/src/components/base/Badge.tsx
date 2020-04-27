import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ColorType } from '../../types';
import CoreBadge from '../core/Badge';
import SvgIconSmallClose from '../../assets/svg/icons/small/SvgIconSmallClose';
import SvgIconSmallAttach from '../../assets/svg/icons/small/SvgIconSmallAttach';
import SvgIconSmallEdit from '../../assets/svg/icons/small/SvgIconSmallEdit';
import Panel, { MarginProps } from './Panel';
import Text from '../core/Text';

export type BadgeType = 'delete' | 'attachment' | 'edit';

interface BadgeProps extends MarginProps {
  type: BadgeType;
  appearance: 'heavy' | 'strong' | 'normal';
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  title?: string;
}

const Badge: FC<BadgeProps> = ({ type, appearance, title, onPress, ...rest }) => {
  let backgroundColor: ColorType = 'blue';
  let Icon = null;

  const getIcon = (iconColor: ColorType, strokeWidth: number): JSX.Element | null => {
    switch (type) {
      case 'delete':
        return <SvgIconSmallClose color={iconColor} strokeWidth={strokeWidth} />;
      case 'attachment':
        return <SvgIconSmallAttach color={iconColor} strokeWidth={strokeWidth} />;
      case 'edit':
        return <SvgIconSmallEdit color={iconColor} strokeWidth={strokeWidth} />;
      default:
        return null;
    }
  };

  switch (appearance) {
    case 'heavy':
      backgroundColor = 'red';
      Icon = getIcon('white', 2);
      break;
    case 'strong':
      backgroundColor = 'blue';
      Icon = getIcon('white', 2);
      break;
    case 'normal':
    default:
      backgroundColor = 'grey4';
      Icon = getIcon('grey', 1);
  }

  if (title) {
    return (
      <Panel row alignItems="center" onPress={onPress}>
        <Text marginRight={0.5} type="small">
          {title}
        </Text>
        <CoreBadge backgroundColor={backgroundColor} {...rest}>
          {Icon}
        </CoreBadge>
      </Panel>
    );
  }
  return (
    <CoreBadge backgroundColor={backgroundColor} onPress={onPress} {...rest}>
      {Icon}
    </CoreBadge>
  );
};

export default Badge;
