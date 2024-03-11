import {configureStore} from '@reduxjs/toolkit';

import asesorReducer from './slices/asesorSlice';

export const store = configureStore({
  reducer: {
    asesor: asesorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
