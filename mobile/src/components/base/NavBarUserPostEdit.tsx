import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ModeType } from '../../types';
import NavBar from '../core/NavBar';
import Badge from './Badge';
import { AssetStyles } from '../../assets/styles';

interface NavBarUserPostEditProps {
  mode: ModeType;
  attachments: number;
  onPressEdit: () => void;
  style?: StyleProp<ViewStyle>;
}

const NavBarUserPostEdit: FC<NavBarUserPostEditProps> = ({
  mode,
  attachments,
  onPressEdit,
  style,
}) => {
  return (
    <NavBar
      mode={mode}
      paddingLeft
      style={[{ paddingRight: AssetStyles.measure.circle.small.padding }, style]}
    >
      <Badge
        title={`${attachments} Attachments`}
        type="attachment"
        appearance="normal"
        marginRight
      />
      <Badge title="Edit" type="edit" appearance="normal" onPress={onPressEdit} />
    </NavBar>
  );
};

export default NavBarUserPostEdit;
