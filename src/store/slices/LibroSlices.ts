import { createSlice } from "@reduxjs/toolkit";
import { Libro } from '../../interfaces/index';
import { getLibros, getLibro, updateLibro, addLibro, getLibroForEdit, getLibroPorAutor } from '../thunk/libroThunk';

interface PersonaState {
  libros: Libro[],
  libro?: Libro | null,
  total: number,
  cargando: boolean,
  cargandoEnDialog: boolean,
  error?: any 
}
const initialState: PersonaState = {
  libros: [],
  libro: null,
  total: 0,
  cargando: false,
  cargandoEnDialog: false,
  error: null
}
const LibroSlice = createSlice({
  name: "libros",
  initialState,
  reducers: {
    setLibros: (state, action) => {
      state.libros = action.payload || [];
    }
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
        state.cargando = false;
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

    //getLibroPorAutor 
    builder
      .addCase(getLibroPorAutor.pending, (state) => {
        state.cargando = true;
        state.libros = [];
      })
      .addCase(getLibroPorAutor.fulfilled, (state, action) => {
        state.cargando = false;
        // console.log(action.payload);
        state.libros = action.payload.libros;
      })
      .addCase(getLibroPorAutor.rejected, (state, action) => {
        state.cargando = false;
        if (action.payload) {
          state.error = (action.payload as any) || '';
        } else {
          state.error = (action.error as any)
        }
      });

    // getLibroForEdit
    builder
      .addCase(getLibroForEdit.pending, (state) => {
        state.cargandoEnDialog = true;
        state.libro = null;
      })
      .addCase(getLibroForEdit.fulfilled, (state, action) => {
        state.cargandoEnDialog = false;
        state.libro = action.payload.libro;
      })
      .addCase(getLibroForEdit.rejected, (state, action) => {
        state.cargandoEnDialog = false;
        if (action.payload) {
          state.error = (action.payload as any) || '';
        } else {
          state.error = (action.error as any)
        }
      });
    // addLibro
    builder
      .addCase(addLibro.pending, (state) => {
        state.cargandoEnDialog = true;
      })
      .addCase(addLibro.fulfilled, (state, action) => {
        state.cargandoEnDialog = false;
        // console.log(action);
      })
      .addCase(addLibro.rejected, (state, action) => {
        state.cargandoEnDialog = false;
        if (action.payload) {
          state.error = (action.payload as any) || null;
        } else {
          state.error = (action.error as any)
        }
      });

      // updateLibro
    builder
      .addCase(updateLibro.pending, (state) => {
        state.cargandoEnDialog = true;
      })
      .addCase(updateLibro.fulfilled, (state, action) => {
        state.cargandoEnDialog = false;
        // console.log(action);
      })
      .addCase(updateLibro.rejected, (state, action) => {
        state.cargandoEnDialog = false;
        if (action.payload) {
          state.error = (action.payload as any) || null;
        } else {
          state.error = (action.error as any)
        }
      });

  },
});

export const { setLibros } = LibroSlice.actions;
export default LibroSlice.reducer;