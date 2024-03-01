// ProveedorGlobal.tsx
import React, {ReactNode} from 'react';

import {
  DecisionAlertProvider,
  MenuProvider,
  InfoAlertProvider,
} from '../context';

const GlobalProvider: React.FC<{children: ReactNode}> = ({children}) => {
  return (
    <DecisionAlertProvider>
      <MenuProvider>
        <InfoAlertProvider>{children}</InfoAlertProvider>
      </MenuProvider>
    </DecisionAlertProvider>
  );
};

export default GlobalProvider;
