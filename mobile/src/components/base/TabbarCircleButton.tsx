import React, { FC } from 'react';
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle, View } from 'react-native';
import { Color } from '../../assets/colors';
import { AssetStyles } from '../../assets/styles';
import SvgIconSmallAdd from '../../assets/svg/icons/small/SvgIconSmallAdd';

interface TabbarCircleButtonProps {
  isFocused?: boolean;
  onPress: () => void;
  onLongPress: () => void;
  style?: StyleProp<ViewStyle>;
  type?: 'camera';
}
const TabbarCircleButton: FC<TabbarCircleButtonProps> = ({
  isFocused,
  onPress,
  onLongPress,
  style,
  type,
}) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityStates={isFocused ? ['selected'] : []}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[
        styles.circle,
        type === 'camera'
          ? {
              backgroundColor: Color.white,
            }
          : {
              ...AssetStyles.shadow.deep,
              backgroundColor: Color.red,
              shadowColor: Color.red,
            },
        style,
      ]}
    >
      {type === 'camera' ? (
        <View style={styles.circleBorder} />
      ) : (
        <SvgIconSmallAdd color="white" scale={1.25} />
      )}
    </TouchableOpacity>
  );
};

const CIRCLE_DIAMETER = AssetStyles.measure.circle.large.size;
const CIRCLE_BORDER_DIAMETER = CIRCLE_DIAMETER - 15;

const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_DIAMETER,
    height: CIRCLE_DIAMETER,
    borderRadius: CIRCLE_DIAMETER / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -AssetStyles.measure.space * 2,
  },
  circleBorder: {
    width: CIRCLE_BORDER_DIAMETER,
    height: CIRCLE_BORDER_DIAMETER,
    borderRadius: CIRCLE_BORDER_DIAMETER / 2,
    borderWidth: 2,
    borderColor: Color.black,
  },
});

export default TabbarCircleButton;
