import { createSlice } from "@reduxjs/toolkit";
import { addEdicion, getEdiciones, getEdicion, updateEdicion, getOnlyEdiciones } from '../thunk/edicionThunk';
import { Edicion } from '../../interfaces/index';

interface EdicionState {
  ediciones: Edicion[],
  edicion?: Edicion | null,
  total: number,
  cargando: boolean,
  error?: any 
}
const initialState: EdicionState = {
  ediciones: [],
  edicion: null,
  total: 0,
  cargando: false,
  error: null
}
const EdicionSlice = createSlice({
  name: "ediciones",
  initialState,
  reducers: {
    // setEdicions: (state, action) => {
    //   state.list = action.payload;
    // }
  },
  extraReducers: (builder) => {
    // getEdiciones
    builder
      .addCase(getEdiciones.pending, (state) => {
        state.cargando = true;
      })
      .addCase(getEdiciones.fulfilled, (state, action) => {
        state.cargando = false;
        state.edicion = null;
        state.ediciones = action.payload.ediciones;
        state.total = action.payload.total;
      })
      .addCase(getEdiciones.rejected, (state, action) => {
        if (action.payload) {
          state.error = (action.payload as any) || '';
        } else {
          state.error = (action.error as any)
        }
      });
      // getOnlyEdiciones
    builder
      .addCase(getOnlyEdiciones.pending, (state) => {
        state.cargando = true;
      })
      .addCase(getOnlyEdiciones.fulfilled, (state, action) => {
        state.cargando = false;
        state.edicion = null;
        state.ediciones = action.payload.ediciones;
        state.total = action.payload.total;
      })
      .addCase(getOnlyEdiciones.rejected, (state, action) => {
        if (action.payload) {
          state.error = (action.payload as any) || '';
        } else {
          state.error = (action.error as any)
        }
      });

    //getEdicion 
    builder
      .addCase(getEdicion.pending, (state) => {
        state.cargando = true;
        state.edicion = null;
      })
      .addCase(getEdicion.fulfilled, (state, action) => {
        state.cargando = false;
        state.edicion = action.payload.edicion;
      })
      .addCase(getEdicion.rejected, (state, action) => {
        state.cargando = false;
        if (action.payload) {
          state.error = (action.payload as any) || '';
        } else {
          state.error = (action.error as any)
        }
      });

    // addEdicion
    builder
      .addCase(addEdicion.pending, (state) => {
        state.cargando = true;
      })
      .addCase(addEdicion.fulfilled, (state, action) => {
        state.cargando = false;
        // console.log(action);
      })
      .addCase(addEdicion.rejected, (state, action) => {
        state.cargando = false;
        if (action.payload) {
          state.error = (action.payload as any) || null;
        } else {
          state.error = (action.error as any)
        }
      });

      // updateEdicion
    builder
      .addCase(updateEdicion.pending, (state) => {
        state.cargando = true;
      })
      .addCase(updateEdicion.fulfilled, (state, action) => {
        state.cargando = false;
        // console.log(action);
      })
      .addCase(updateEdicion.rejected, (state, action) => {
        state.cargando = false;
        if (action.payload) {
          state.error = (action.payload as any) || null;
        } else {
          state.error = (action.error as any)
        }
      });

  },
});

// export const { setEdicions } = userSlice.actions;

export default EdicionSlice.reducer;


// prueba
// export const edicionReducer = userSlice.reducer;

