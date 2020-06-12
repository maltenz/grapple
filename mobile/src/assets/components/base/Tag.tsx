import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import CoreText from '../core/Text';
import Panel, { MarginProps } from './Panel';
import { AssetStyles } from '../../styles';
import { Color } from '../../colors';
import SvgIconSmallClose from '../../svg/icons/small/SvgIconSmallClose';
import { ModeType } from '../..';
import SvgIconSmallAdd from '../../svg/icons/small/SvgIconSmallAdd';

interface TagProps extends MarginProps {
  mode: ModeType;
  type?: 'add';
  text: string;
  marginRight?: number;
}

const Tag: FC<TagProps> = ({ text, marginRight = 0.5, mode, type, ...rest }) => {
  const color = mode === 'day' ? 'purple' : 'white';

  return (
    <Panel
      style={[styles.container, { borderColor: Color[color] }]}
      alignItems="center"
      paddingLeft={0.5}
      marginRight={marginRight}
      {...rest}
      row
    >
      <CoreText type="small" bold color={color} minLineHeight>
        {text}
      </CoreText>
      {type === 'add' ? <SvgIconSmallAdd color={color} /> : <SvgIconSmallClose color={color} />}
    </Panel>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    borderRadius: AssetStyles.measure.radius.regular,
    borderWidth: 2,
  },
});

export default Tag;
