import React, { FC } from 'react';
import Panel from './Panel';
import Thumbnail, { ThumbnailDimension } from './Thumbnail';
import CoreText from '../core/Text';
import { AssetStyles } from '../../styles';
import { ModeType } from '../..';

interface ExcerptProps {
  last?: boolean;
  title: string;
  content: string;
  mode?: ModeType;
}

const THUMBNAIL_SRC = {
  src: {
    thumbnail: { uri: 'https://source.unsplash.com/random' },
    large: { uri: 'https://source.unsplash.com/random' },
  },
};

const CONTENT_WIDTH =
  AssetStyles.measure.window.width - AssetStyles.measure.space * 3.5 - ThumbnailDimension;

const Excerpt: FC<ExcerptProps> = ({ last, title, content, mode = 'day' }) => {
  return (
    <Panel row marginBottom={last ? 0 : 1}>
      <Thumbnail
        src={{ uri: THUMBNAIL_SRC.src.thumbnail.uri }}
        backgroundColor="grey"
        marginRight={0.5}
      />
      <Panel justifyContent="center">
        <CoreText
          type="small"
          minLineHeight
          bold
          color="blue"
          numberOfLines={1}
          // style={{ width: CONTENT_WIDTH }}
        >
          {title}
        </CoreText>
        <Panel style={{ height: 5 }} />
        <Panel marginRight row style={{ width: CONTENT_WIDTH }}>
          <CoreText type="small" color={mode === 'day' ? 'grey' : 'white'} numberOfLines={2}>
            {content}
          </CoreText>
        </Panel>
      </Panel>
    </Panel>
  );
};

export default Excerpt;
