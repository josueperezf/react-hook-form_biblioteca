import { createSlice } from "@reduxjs/toolkit";
import { Libro } from '../../interfaces/index';
import { getLibros, getLibro, updateLibro, addLibro } from '../thunk/libroThunk';

interface PersonaState {
  libros: Libro[],
  libro?: Libro | null,
  total: number,
  cargando: boolean,
  error?: any 
}
const initialState: PersonaState = {
  libros: [],
  libro: null,
  total: 0,
  cargando: false,
  error: null
}
const LibroSlice = createSlice({
  name: "libros",
  initialState,
  reducers: {
    // setPersonas: (state, action) => {
    //   state.list = action.payload;
    // }
  },
  extraReducers: (builder) => {
    // getLibros
    builder
      .addCase(getLibros.pending, (state) => {
        state.cargando = true;
      })
      .addCase(getLibros.fulfilled, (state, action) => {
        state.cargando = false;
        state.libro = null;
        state.libros = action.payload.libros;
        state.total = action.payload.total;
      })
      .addCase(getLibros.rejected, (state, action) => {
        if (action.payload) {
          state.error = (action.payload as any) || '';
        } else {
          state.error = (action.error as any)
        }
      });
    //getLibro 
    builder
      .addCase(getLibro.pending, (state) => {
        state.cargando = true;
        state.libro = null;
      })
      .addCase(getLibro.fulfilled, (state, action) => {
        state.cargando = false;
        state.libro = action.payload.libro;
      })
      .addCase(getLibro.rejected, (state, action) => {
        state.cargando = false;
        if (action.payload) {
          state.error = (action.payload as any) || '';
        } else {
          state.error = (action.error as any)
        }
      });

    // addLibro
    builder
      .addCase(addLibro.pending, (state) => {
        state.cargando = true;
      })
      .addCase(addLibro.fulfilled, (state, action) => {
        state.cargando = false;
        // console.log(action);
      })
      .addCase(addLibro.rejected, (state, action) => {
        state.cargando = false;
        if (action.payload) {
          state.error = (action.payload as any) || null;
        } else {
          state.error = (action.error as any)
        }
      });

      // updateLibro
    builder
      .addCase(updateLibro.pending, (state) => {
        state.cargando = true;
      })
      .addCase(updateLibro.fulfilled, (state, action) => {
        state.cargando = false;
        console.log(action);
      })
      .addCase(updateLibro.rejected, (state, action) => {
        state.cargando = false;
        if (action.payload) {
          state.error = (action.payload as any) || null;
        } else {
          state.error = (action.error as any)
        }
      });

  },
});

export default LibroSlice.reducer;