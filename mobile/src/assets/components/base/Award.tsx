import React, { FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Emoji from 'react-native-emoji';
import compactFormat from 'cldr-compact-number';
import Panel, { MarginProps } from './Panel';
import { AwardsEnum } from '../../../generated/graphql';
import { AssetStyles } from '../../styles';
import { Color } from '../../colors';
import CoreText from '../core/Text';

interface AwardProps extends MarginProps {
  type: AwardsEnum;
}

const HEIGHT = 90;

const Award: FC<AwardProps> = ({
  type = AwardsEnum.Angel,
  marginLeft = 0.25,
  marginRight = 0.25,
  ...rest
}) => {
  const [iconName, setIconName] = useState<string>('angel');
  const [name, setName] = useState<string>('Angel');

  useEffect(() => {
    switch (type) {
      case AwardsEnum.Angel:
        setIconName('angel');
        setName('Angel');
        break;
      case AwardsEnum.Brave:
        setIconName('muscle');
        setName('Brave');
        break;
      case AwardsEnum.Calming:
        setIconName('person_in_lotus_position');
        setName('Calming');
        break;
      case AwardsEnum.Chatty:
        setIconName('speech_balloon');
        setName('Chatty');
        break;
      case AwardsEnum.Funny:
        setIconName('laughing');
        setName('Funny');
        break;
      case AwardsEnum.Helpful:
        setIconName('books');
        setName('Helpful');
        break;
      case AwardsEnum.Honest:
        setIconName('herb');
        setName('Honest');
        break;
      case AwardsEnum.Smart:
        setIconName('nerd_face');
        setName('Smart');
        break;
      case AwardsEnum.Survivor:
      default:
        setIconName('fire');
        setName('Survivor');
        break;
    }
  }, []);

  return (
    <Panel
      style={styles.panel}
      paddingHorizontal={0.5}
      center
      flex={1}
      marginLeft={marginLeft}
      marginRight={marginRight}
      {...rest}
    >
      <Emoji name={iconName} style={styles.emoji} />
      <CoreText type="small" bold color="grey2" minLineHeight>
        {name}
      </CoreText>
      <CoreText type="mini" bold color="grey2">
        {compactFormat(19634, 'en')}
      </CoreText>
    </Panel>
  );
};

const styles = StyleSheet.create({
  panel: {
    borderWidth: AssetStyles.measure.border.regular,
    borderColor: Color.grey3,
    borderRadius: AssetStyles.measure.radius.large,
    height: HEIGHT,
  },
  emoji: {
    fontSize: 30,
    marginBottom: 2,
  },
});

export default Award;
