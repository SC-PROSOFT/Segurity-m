import React from 'react';
import {StatusBar} from 'react-native';

/* papper */
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';

/* context provider */
import GlobalProvider from './src/context/GlobalProvider';

/* components */
import {DecisionAlert, InfoAlert} from './src/components';

/* navigation */
import {Navigation} from './src/navigation/Navigation';

/* papper theme */
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#365AC3',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <GlobalProvider>
        <StatusBar></StatusBar>
        <Navigation></Navigation>

        <DecisionAlert />
        <InfoAlert />
      </GlobalProvider>
    </PaperProvider>
  );
}

//colors: #30313498 #DE3A45 #303134 #365AC3 #19C22A

/*
paleta
lider: #303134
monocromaticos:  #4A5A88 #43495E #445FB3 #2F5BDD
*/

