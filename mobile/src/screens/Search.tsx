import React, { FC, ReactNode } from 'react';

import {
  Search as BaseSearch,
  Panel,
  SvgIconChat,
  SvgIconBookmark,
  SvgIconStory,
  CoreText,
  CoreBullet,
  Overlay,
  OverlayPanel,
  Excerpt,
} from '../assets';

interface CategoryItemProps {
  title: string;
  Icon: ReactNode;
}

const TITLE = 'Why read motivational sayings? ';
const CONTENT =
  'For motivation! You might need a bit, if you can use last year’s list of goals this year because it’s as good as new. All of us can benefit from inspirational thoughts, so here are ten great ones.';

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
      <CategoryItem
        title="Messages"
        Icon={<SvgIconChat color="white" strokeWidth={2} scale={0.9} />}
      />
      <CategoryItem
        title="Bookmark"
        Icon={<SvgIconBookmark color="white" strokeWidth={2} scale={0.9} />}
      />
      <CategoryItem
        title="Stories"
        Icon={<SvgIconStory color="white" strokeWidth={2} scale={0.9} />}
      />
    </OverlayPanel>
  );
};

const Results: FC = () => {
  return (
    <OverlayPanel paddingHorizontal={0.5}>
      <Excerpt title={TITLE} content={CONTENT} />
      <Excerpt title={TITLE} content={CONTENT} />
      <Excerpt title={TITLE} content={CONTENT} />
      <Excerpt title={TITLE} content={CONTENT} last />
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
