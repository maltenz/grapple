import React, { FC } from 'react';
import Panel, { MarginProps, PanelProps } from './Panel';

interface MenuContainerProps extends MarginProps, PanelProps {}

const MenuContainer: FC<MenuContainerProps> = ({ children, ...rest }) => {
  return (
    <Panel backgroundColor="white" marginBottom {...rest}>
      {children}
    </Panel>
  );
};

export default MenuContainer;
