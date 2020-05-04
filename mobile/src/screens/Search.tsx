import React, { FC, ReactNode } from 'react';
import Overlay, { OverlayPanel } from './components/Overlay';
import {
  Search as BaseSearch,
  Panel,
  SvgIconChat,
  SvgIconBookmark,
  SvgIconStory,
  Thumbnail,
  Badge,
  AssetStyles,
  ThumbnailDimension,
} from '../components';

import CoreText from '../components/core/Text';
import CoreBullet from '../components/core/Bullet';

interface CategoryItemProps {
  title: string;
  Icon: ReactNode;
}

const THUMBNAIL_SRC = {
  src: {
    thumbnail: { uri: 'https://source.unsplash.com/random' },
    large: { uri: 'https://source.unsplash.com/random' },
  },
};

const TITLE = 'Why read motivational sayings? ';
const CONTENT =
  'For motivation! You might need a bit, if you can use last year’s list of goals this year because it’s as good as new. All of us can benefit from inspirational thoughts, so here are ten great ones.';

const CONTENT_WIDTH =
  AssetStyles.measure.window.width - AssetStyles.measure.space * 3.5 - ThumbnailDimension;

const CategoryItem: FC<CategoryItemProps> = ({ title, Icon }) => {
  return (
    <Panel flex={1} center paddingBottom={0.25}>
      {Icon}
      <CoreText type="mini" color="white">
        {title}
      </CoreText>
      <CoreBullet marginTop={0.35} />
    </Panel>
  );
};

const Category: FC = () => {
  return (
    <OverlayPanel row paddingHorizontal={0.5} marginBottom>
      <CategoryItem title="Messages" Icon={<SvgIconChat color="white" />} />
      <CategoryItem title="Bookmark" Icon={<SvgIconBookmark color="white" />} />
      <CategoryItem title="Stories" Icon={<SvgIconStory color="white" />} />
    </OverlayPanel>
  );
};

interface ResultsItemProps {
  title: string;
  content: string;
  last?: boolean;
}

const ResultsItem: FC<ResultsItemProps> = ({ title, content, last }) => {
  return (
    <Panel row marginBottom={last ? 0 : 1}>
      <Thumbnail
        src={{ uri: THUMBNAIL_SRC.src.thumbnail.uri }}
        backgroundColor="grey"
        TopLeft={<Badge appearance="heavy" type="delete" />}
        marginRight={0.5}
      />
      <Panel justifyContent="center">
        <CoreText
          type="small"
          minLineHeight
          bold
          color="blue"
          numberOfLines={1}
          style={{ width: CONTENT_WIDTH }}
        >
          {title}
        </CoreText>
        <Panel style={{ height: 5 }} />
        <Panel marginRight row style={{ width: CONTENT_WIDTH }}>
          <CoreText type="small" color="white" numberOfLines={2}>
            {content}
          </CoreText>
        </Panel>
      </Panel>
    </Panel>
  );
};

const Results: FC = () => {
  return (
    <OverlayPanel paddingHorizontal={0.5}>
      <ResultsItem title={TITLE} content={CONTENT} />
      <ResultsItem title={TITLE} content={CONTENT} />
      <ResultsItem title={TITLE} content={CONTENT} />
      <ResultsItem title={TITLE} content={CONTENT} last />
    </OverlayPanel>
  );
};

const Search: FC = () => {
  return (
    <Overlay paddingHorizontal>
      <BaseSearch marginBottom={1} />
      <Category />
      <Results />
    </Overlay>
  );
};

export default Search;
