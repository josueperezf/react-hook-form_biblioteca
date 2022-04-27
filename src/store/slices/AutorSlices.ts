import { createSlice } from "@reduxjs/toolkit";
import { Autor } from '../../interfaces/index';
import { addAutor, getAutor, getAutores, updateAutor } from "../thunk/autorThunk";

interface AutorState {
  autores: Autor[],
  autor?: Autor | null,
  total: number,
  cargando: boolean,
  error?: any 
}
const initialState: AutorState = {
  autores: [],
  autor: null,
  total: 0,
  cargando: false,
  error: null
}
const AutorSlice = createSlice({
  name: "autores",
  initialState,
  reducers: {
    // setPersonas: (state, action) => {
    //   state.list = action.payload;
    // }
  },
  extraReducers: (builder) => {
    // getAutores
    builder
      .addCase(getAutores.pending, (state) => {
        state.cargando = true;
      })
      .addCase(getAutores.fulfilled, (state, action) => {
        state.cargando = false;
        state.autor = null;
        state.autores = action.payload.autores;
        state.total = action.payload.total;
      })
      .addCase(getAutores.rejected, (state, action) => {
        if (action.payload) {
          state.error = (action.payload as any) || '';
        } else {
          state.error = (action.error as any)
        }
      });
    //getAutor 
    builder
      .addCase(getAutor.pending, (state) => {
        state.cargando = true;
        state.autor = null;
      })
      .addCase(getAutor.fulfilled, (state, action) => {
        state.cargando = false;
        state.autor = action.payload.autor;
      })
      .addCase(getAutor.rejected, (state, action) => {
        state.cargando = false;
        if (action.payload) {
          state.error = (action.payload as any) || '';
        } else {
          state.error = (action.error as any)
        }
      });

    // addAutor
    builder
      .addCase(addAutor.pending, (state) => {
        state.cargando = true;
      })
      .addCase(addAutor.fulfilled, (state, action) => {
        state.cargando = false;
        // console.log(action);
      })
      .addCase(addAutor.rejected, (state, action) => {
        state.cargando = false;
        if (action.payload) {
          state.error = (action.payload as any) || null;
        } else {
          state.error = (action.error as any)
        }
      });

      // updateAutor
    builder
      .addCase(updateAutor.pending, (state) => {
        state.cargando = true;
      })
      .addCase(updateAutor.fulfilled, (state, action) => {
        state.cargando = false;
        // console.log(action);
      })
      .addCase(updateAutor.rejected, (state, action) => {
        state.cargando = false;
        if (action.payload) {
          state.error = (action.payload as any) || null;
        } else {
          state.error = (action.error as any)
        }
      });

  },
});

export default AutorSlice.reducer;