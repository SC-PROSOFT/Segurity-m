import {createSlice, PayloadAction} from '@reduxjs/toolkit';

/* types */
import {IAsesor} from '../../common/types';

type ObjAsesor = {
  id: number;
};

interface AsesorState {
  objAsesor: {
    id: number;
  };
}

const initialState: AsesorState = {
  objAsesor: {
    id: 0,
  },
};

export const asesorSlice = createSlice({
  name: 'asesor',
  initialState,
  reducers: {
    setObjAsesor: (state, action: PayloadAction<ObjAsesor>) => {
      state.objAsesor = action.payload;
    },
  },
});

export const {setObjAsesor} = asesorSlice.actions;

export default asesorSlice.reducer;
