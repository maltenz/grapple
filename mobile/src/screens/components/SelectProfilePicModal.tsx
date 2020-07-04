import React, { FC, ReactNode, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Overlay, Panel, Button, Thumbnail, Text, AssetStyles } from '../../assets';
import { authShotSelector } from '../../store';

const SPACE = AssetStyles.measure.space;

interface SelectProfilePicModalProps {
  visible: boolean;
  onClose: () => void;
  onImageSelect: ({ image }: { image: string }) => void;
}

const SelectProfilePicModal: FC<SelectProfilePicModalProps> = ({
  visible,
  onClose,
  onImageSelect,
}) => {
  const shots = useSelector(authShotSelector);
  const [profilePicActiveIndex, setProfilePicActiveIndex] = useState<number>(0);

  const handleImageSelect = (): void => {
    onImageSelect({ image: shots[profilePicActiveIndex].image as string });
    onClose();
  };

  if (!visible) {
    return null;
  }

  return (
    <Overlay type="page" paddingHorizontal={0}>
      <Panel flex={1} center>
        <Text type="h3" mode="night" appearance="normal" textAlign="center">
          Select profile picture
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.picScrollView}
          contentContainerStyle={styles.picScrollViewContent}
        >
          {shots.map(
            (shot, index: number): ReactNode => {
              if (shot?.image) {
                return (
                  <Thumbnail
                    key={shot.id as string}
                    src={{ uri: `data:image/jpeg;base64,${shot.image}` }}
                    marginRight={index === (shots.length as number) - 1 ? 1 : 0.5}
                    marginLeft={index === 0 && 1}
                    outline={index === profilePicActiveIndex && 'blue'}
                    onPress={(): void => setProfilePicActiveIndex(index)}
                    backgroundColor="grey4"
                  />
                );
              }
              return null;
            }
          )}
        </ScrollView>
      </Panel>
      <Button
        marginHorizontal
        mode="day"
        type="large"
        appearance="strong"
        onPress={handleImageSelect}
      >
        Save
      </Button>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  picScrollView: {
    flexGrow: 0,
    paddingVertical: SPACE,
  },
  picScrollViewContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default SelectProfilePicModal;
