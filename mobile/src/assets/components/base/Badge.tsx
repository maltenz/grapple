import React, { FC, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ColorType } from '../../../types';
import CoreBadge from '../core/Badge';
import SvgIconSmallClose from '../../svg/icons/small/SvgIconSmallClose';
import SvgIconSmallAttach from '../../svg/icons/small/SvgIconSmallAttach';
import SvgIconSmallEdit from '../../svg/icons/small/SvgIconSmallEdit';
import Panel, { MarginProps } from './Panel';
import Text from '../core/Text';
import SvgIconSmallAdd from '../../svg/icons/small/SvgIconSmallAdd';

export type BadgeType = 'delete' | 'attachment' | 'edit' | 'add';

interface BadgeProps extends MarginProps {
  type: BadgeType;
  appearance: 'heavy' | 'strong' | 'normal';
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  title?: string | ReactNode;
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
      case 'add':
        return <SvgIconSmallAdd color={iconColor} strokeWidth={strokeWidth} />;
      case 'edit':
        return <SvgIconSmallEdit color={iconColor} strokeWidth={strokeWidth} />;
      default:
        return null;
    }
  };

  switch (appearance) {
    case 'heavy':
      backgroundColor = 'red';
      Icon = getIcon('white', 3);
      break;
    case 'strong':
      backgroundColor = 'blue';
      Icon = getIcon('white', 3);
      break;
    case 'normal':
    default:
      backgroundColor = 'grey4';
      Icon = getIcon('grey', 3);
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
