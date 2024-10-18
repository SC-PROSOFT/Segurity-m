import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type ObjDirectionIpConfig = {
  ip: string;
  port: string;
};

interface DirectionIpConfigState {
  objDirectionIpConfig: {
    ip: string;
    port: string;
  };
}

const initialState: DirectionIpConfigState = {
  objDirectionIpConfig: {
    ip: '',
    port: '',
  },
};

export const directionIpConfigSlice = createSlice({
  name: 'directionIpConfig',
  initialState,
  reducers: {
    setObjDirectionIpConfig: (
      state,
      action: PayloadAction<ObjDirectionIpConfig>,
    ) => {
      state.objDirectionIpConfig = action.payload;
    },
  },
});

export const {setObjDirectionIpConfig} = directionIpConfigSlice.actions;

export default directionIpConfigSlice.reducer;
