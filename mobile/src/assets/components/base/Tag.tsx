import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import CoreText from '../core/Text';
import Panel, { MarginProps } from './Panel';
import { AssetStyles } from '../../styles';
import { Color } from '../../colors';
import SvgIconSmallClose from '../../svg/icons/small/SvgIconSmallClose';

interface TagProps extends MarginProps {
  text: string;
  marginRight?: number;
}

const Tag: FC<TagProps> = ({ text, marginRight = 0.5, ...rest }) => {
  return (
    <Panel
      style={styles.container}
      alignItems="center"
      paddingLeft={0.5}
      marginRight={marginRight}
      {...rest}
      row
    >
      <CoreText type="small" bold color="purple" minLineHeight>
        {text}
      </CoreText>
      <SvgIconSmallClose color="purple" />
    </Panel>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    borderRadius: AssetStyles.measure.radius.regular,
    borderWidth: 2,
    borderColor: Color.purple,
  },
});

export default Tag;
