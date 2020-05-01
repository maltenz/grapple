import React, { FC } from 'react';
import Panel from './Panel';

const MenuContainer: FC = ({ children }) => {
  return (
    <Panel backgroundColor="white" marginBottom>
      {children}
    </Panel>
  );
};

export default MenuContainer;
