import React, { FC } from 'react';
import { ImageSourcePropType } from 'react-native';
import { ModeType } from '../../../types';
import NavBar from '../core/NavBar';
import Avatar from '../core/Avatar';
import Panel, { MarginProps } from './Panel';
import Text from '../core/Text';

interface NavBarUserProps extends MarginProps {
  mode: ModeType;
  name: string;
  userType: 'approved' | 'survivor' | 'anonymous';
  src: ImageSourcePropType;
}

const NavBarUser: FC<NavBarUserProps> = ({ mode, name, userType, src, ...rest }) => {
  let credentialText;

  switch (userType) {
    case 'approved':
      credentialText = 'Approved Buddy';
      break;
    case 'survivor':
      credentialText = 'Survivor';
      break;
    default:
  }
  return (
    <NavBar mode={mode} {...rest}>
      <Avatar marginRight={0.5} src={src} />
      <Panel justifyContent="space-between" paddingVertical={0.1} paddingRight>
        <Text type="small" bold minLineHeight color={mode === 'day' ? 'grey' : 'white'}>
          {name}
        </Text>
        {credentialText && (
          <Text type="mini" minLineHeight color="blue">
            Approved Buddy
          </Text>
        )}
      </Panel>
    </NavBar>
  );
};

export default NavBarUser;
