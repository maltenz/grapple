import React, { FC, useState } from 'react';
import { ColorPicker, fromHsv } from 'react-native-color-picker';
import { Overlay, Panel, Button, Color, AssetStyles } from '../../assets';

const WIDTH = AssetStyles.measure.window.width;
const SPACE = AssetStyles.measure.space;

interface ColorPickerModalProps {
  visible: boolean;
  onClose: () => void;
}

const ColorPickerModal: FC<ColorPickerModalProps> = ({ visible, onClose }) => {
  const [primaryColor, setPrimaryColor] = useState<string>(Color.red);

  if (!visible) {
    return null;
  }

  return (
    <Overlay type="page">
      <Panel flex={1} center>
        {/* @ts-ignore */}
        <ColorPicker
          color={primaryColor}
          onColorSelected={(color): void => setPrimaryColor(color)}
          onColorChange={(color): void => setPrimaryColor(fromHsv(color))}
          defaultColor={primaryColor}
          hideSliders
          style={{
            width: WIDTH - SPACE * 2,
            height: WIDTH - SPACE * 2,
          }}
        />
      </Panel>
      <Button mode="day" type="large" appearance="strong" onPress={(): void => onClose()}>
        Close
      </Button>
    </Overlay>
  );
};

export default ColorPickerModal;
