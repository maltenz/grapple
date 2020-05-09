import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ModeType } from '../../../types';
import NavBar from '../core/NavBar';
import Badge from './Badge';
import { AssetStyles } from '../../styles';
import Text from '../core/Text';

interface NavBarUserStoryIncidentProps {
  mode: ModeType;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  utility: 'Story' | 'Incident';
}

const NavBarUserStoryIncident: FC<NavBarUserStoryIncidentProps> = ({ mode, onPress, style }) => {
  return (
    <NavBar
      mode={mode}
      paddingLeft
      style={[
        { paddingRight: AssetStyles.measure.circle.small.padding, ...AssetStyles.shadow.deep },
        style,
      ]}
    >
      <Badge
        title={
          <Text type="small">
            <Text type="small" bold>
              Story
            </Text>
            &nbsp; &nbsp; | &nbsp; &nbsp;
            <Text type="small">Incident</Text>
          </Text>
        }
        type="edit"
        appearance="normal"
        onPress={onPress}
      />
    </NavBar>
  );
};

export default NavBarUserStoryIncident;
