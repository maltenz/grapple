import React, { FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Emoji from 'react-native-emoji';
// @ts-ignore
import compactFormat from 'cldr-compact-number';
import Panel, { MarginProps } from './Panel';
import { AwardsEnum } from '../../../generated/graphql';
import { AssetStyles } from '../../styles';
import { Color } from '../../colors';
import CoreText from '../core/Text';

interface AwardProps extends MarginProps {
  type: AwardsEnum;
  panel?: boolean;
}

export const AwardToEmojiHelper = (type: AwardsEnum): { text: string; name: string } => {
  let myName;
  let myText;
  switch (type) {
    case AwardsEnum.Angel:
      myName = 'angel';
      myText = 'Angel';
      break;
    case AwardsEnum.Brave:
      myName = 'muscle';
      myText = 'Brave';
      break;
    case AwardsEnum.Calming:
      myName = 'person_in_lotus_position';
      myText = 'Calming';
      break;
    case AwardsEnum.Chatty:
      myName = 'speech_balloon';
      myText = 'Chatty';
      break;
    case AwardsEnum.Funny:
      myName = 'laughing';
      myText = 'Funny';
      break;
    case AwardsEnum.Helpful:
      myName = 'books';
      myText = 'Helpful';
      break;
    case AwardsEnum.Honest:
      myName = 'herb';
      myText = 'Honest';
      break;
    case AwardsEnum.Smart:
      myName = 'nerd_face';
      myText = 'Smart';
      break;
    case AwardsEnum.Survivor:
    default:
      myName = 'fire';
      myText = 'Survivor';
      break;
  }
  return {
    name: myName,
    text: myText,
  };
};

const HEIGHT = 90;

const Award: FC<AwardProps> = ({
  type = AwardsEnum.Angel,
  panel,
  marginLeft = 0.25,
  marginRight = 0.25,
  ...rest
}) => {
  const [iconName, setIconName] = useState<string>('angel');
  const [name, setName] = useState<string>('Angel');

  useEffect(() => {
    const { name: helperName, text: helperText } = AwardToEmojiHelper(type);
    setIconName(helperName);
    setName(helperText);
  }, []);

  if (panel) {
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
  }

  return <Emoji name={iconName} style={styles.emoji} />;
};

const styles = StyleSheet.create({
  panel: {
    borderWidth: AssetStyles.measure.border.regular,
    borderColor: Color.grey3,
    borderRadius: AssetStyles.measure.radius.regular,
    height: HEIGHT,
  },
  emoji: {
    fontSize: 30,
    marginBottom: 2,
  },
});

export default Award;
