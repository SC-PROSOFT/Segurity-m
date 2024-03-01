// visible: boolean;
//   type: type;
//   description: string;

import React, {createContext, useContext, useState, ReactNode} from 'react';
import {InfoAlert} from '../components/InfoAlert';

type Type = 'error' | 'success' | 'info';

interface InfoAlertConfig {
  visible: boolean;
  type: Type;
  description: string;
}

interface InfoAlertContextType {
  showInfoAlert: (infoAlertConfig: InfoAlertConfig) => void;
  hideInfoAlert: () => void;
  infoAlertConfig: InfoAlertConfig;
}

const InfoAlertContext = createContext<InfoAlertContextType | undefined>(
  undefined,
);

export const InfoAlertProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [infoAlertConfig, setInfoAlertConfig] = useState<InfoAlertConfig>({
    visible: false,
    type: 'info',
    description: '',
  });

  const showInfoAlert = (infoAlertConfig: InfoAlertConfig) => {
    setInfoAlertConfig({...infoAlertConfig, visible: true});
  };

  const hideInfoAlert = () => {
    setInfoAlertConfig({
      visible: false,
      type: infoAlertConfig.type,
      description: infoAlertConfig.description,
    });
  };

  return (
    <InfoAlertContext.Provider
      value={{showInfoAlert, hideInfoAlert, infoAlertConfig}}>
      {children}
    </InfoAlertContext.Provider>
  );
};

export const infoAlertContext = () => {
  const context = useContext(InfoAlertContext);
  if (!context) {
    throw new Error('useMyFunction must be used within a MyFunctionProvider');
  }
  return context;
};
