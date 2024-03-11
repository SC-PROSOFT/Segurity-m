import React from 'react';
import {StatusBar} from 'react-native';

/* redux */
import {Provider as StoreProvider} from 'react-redux';
/* redux store */
import {store} from './src/redux/store';
/* papper */
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
/* context provider */
import GlobalProvider from './src/context/GlobalProvider';
/* components */
import {DecisionAlert, InfoAlert} from './src/components';
/* navigation */
import {Navigation} from './src/navigation/Navigation';
/* react query */
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

/* papper theme */
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2b4bb0',
  },
};

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <GlobalProvider>
          <StatusBar></StatusBar>
          <Navigation></Navigation>

          <DecisionAlert />
          <InfoAlert />
        </GlobalProvider>
      </PaperProvider>
    </StoreProvider>
  );
}

//colors: #30313498 #DE3A45 #303134 #2b4bb0 #19C22A
//contraste mejorado: #243C84

/*
paleta
lider: #303134
monocromaticos:  #4A5A88 #43495E #445FB3 #2F5BDD
*/
