import React from 'react';
import { ModeType } from '../../types';
import NavBar from '../core/NavBar';
import Badge from './Badge';
import { AssetStyles } from '../../assets/styles';

interface NavBarUserPostEditProps {
  mode: ModeType;
  attachments: number;
  onPressEdit: () => void;
}

const NavBarUserPostEdit = ({ mode, attachments, onPressEdit }: NavBarUserPostEditProps) => {
  return (
    <NavBar
      mode={mode}
      paddingLeft
      style={{ paddingRight: AssetStyles.measure.circle.small.padding }}
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
