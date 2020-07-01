import _ from 'lodash';
import React, { FC } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import Panel from '../../assets/components/base/Panel';
import { AwardsEnum } from '../../generated/graphql';
import Award from '../../assets/components/base/Award';
import { AssetStyles } from '../../assets/styles';

const HEIGHT = 40;

type ReactionMenuProps = {
  onReaction: (icon: AwardsEnum) => void;
};

const ReactionMenu: FC<ReactionMenuProps> = ({ onReaction }) => {
  return (
    <Panel row justifyContent="space-between" alignItems="center">
      <ScrollView
        horizontal
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: AssetStyles.measure.space }}
      >
        {_.map(AwardsEnum, (name) => {
          return (
            <TouchableOpacity key={name} onPress={(): void => onReaction(name)}>
              <BlurView key={name} tint="light" intensity={100} style={styles.item}>
                <Award type={name} />
              </BlurView>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Panel>
  );
};

const styles = StyleSheet.create({
  item: {
    height: HEIGHT,
    width: HEIGHT,
    borderRadius: AssetStyles.measure.radius.regular,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: AssetStyles.measure.space / 2,
  },
  scrollView: {
    marginLeft: -AssetStyles.measure.space / 2,
    marginRight: -AssetStyles.measure.space / 2,
  },
  heartContainer: {
    height: HEIGHT,
    width: HEIGHT,
    borderRadius: HEIGHT / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReactionMenu;
