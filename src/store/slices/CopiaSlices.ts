import { createSlice } from "@reduxjs/toolkit";
import { addCopia, getCopias, getCopia, updateCopia } from '../thunk/copiaThunk';
import { Copia } from '../../interfaces/index';

interface CopiaState {
  copias: Copia[],
  copia?: Copia | null,
  total: number,
  cargando: boolean,
  error?: any 
}
const initialState: CopiaState = {
  copias: [],
  copia: null,
  total: 0,
  cargando: false,
  error: null
}
const CopiaSlices = createSlice({
  name: "copias",
  initialState,
  reducers: {
    // setCopias: (state, action) => {
    //   state.list = action.payload;
    // }
  },
  extraReducers: (builder) => {
    // getCopias
    builder
      .addCase(getCopias.pending, (state) => {
        state.cargando = true;
      })
      .addCase(getCopias.fulfilled, (state, action) => {
        state.cargando = false;
        state.copia = null;
        state.copias = action.payload.copias;
        state.total = action.payload.total;
      })
      .addCase(getCopias.rejected, (state, action) => {
        if (action.payload) {
          state.error = (action.payload as any) || '';
        } else {
          state.error = (action.error as any)
        }
      });
    //getCopia 
    builder
      .addCase(getCopia.pending, (state) => {
        state.cargando = true;
        state.copia = null;
      })
      .addCase(getCopia.fulfilled, (state, action) => {
        state.cargando = false;
        state.copia = action.payload.copia;
      })
      .addCase(getCopia.rejected, (state, action) => {
        state.cargando = false;
        if (action.payload) {
          state.error = (action.payload as any) || '';
        } else {
          state.error = (action.error as any)
        }
      });

    // addCopia
    builder
      .addCase(addCopia.pending, (state) => {
        state.cargando = true;
      })
      .addCase(addCopia.fulfilled, (state, action) => {
        state.cargando = false;
        // console.log(action);
      })
      .addCase(addCopia.rejected, (state, action) => {
        state.cargando = false;
        if (action.payload) {
          state.error = (action.payload as any) || null;
        } else {
          state.error = (action.error as any)
        }
      });

      // updateCopia
    builder
      .addCase(updateCopia.pending, (state) => {
        state.cargando = true;
      })
      .addCase(updateCopia.fulfilled, (state, action) => {
        state.cargando = false;
        console.log(action);
      })
      .addCase(updateCopia.rejected, (state, action) => {
        state.cargando = false;
        if (action.payload) {
          state.error = (action.payload as any) || null;
        } else {
          state.error = (action.error as any)
        }
      });

  },
});

export default CopiaSlices.reducer;