import {configureStore} from '@reduxjs/toolkit';

import asesorReducer from './slices/asesorSlice';
import directionIpConfigReducer from './slices/directionIpConfigSlice';

export const store = configureStore({
  reducer: {
    asesor: asesorReducer,
    directionIpConfig: directionIpConfigReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
