import React, { FC } from 'react';
import Panel, { MarginProps, PanelProps } from './Panel';

interface ContainerProps extends MarginProps, PanelProps {}

const Container: FC<ContainerProps> = ({ children, ...rest }) => {
  return (
    <Panel backgroundColor="white" marginBottom {...rest}>
      {children}
    </Panel>
  );
};

export default Container;
