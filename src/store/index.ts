import { configureStore } from '@reduxjs/toolkit'
import AutorSlices from './slices/AutorSlices';
import CopiaSlices from './slices/CopiaSlices';
import EdicionSlice from './slices/EdicionSlices';
import IdiomaSlice from './slices/IdiomaSlices';
import LibroSlice from './slices/LibroSlices';
import PaisSlice from './slices/PaisSlices';
import PersonaSlice from './slices/PersonaSlices';
import UsuarioSlice from './slices/UsuarioSlices';

export const store = configureStore({
  reducer: {
    autores: AutorSlices,
    copias: CopiaSlices,
    ediciones: EdicionSlice,
    idiomas: IdiomaSlice,
    libros: LibroSlice,
    paises: PaisSlice,
    personas: PersonaSlice,
    usuarios: UsuarioSlice,
    // comments: commentsReducer,
    // users: usersReducer
  }
})

// Inferir los tipos `RootState` y `AppDispatch` de la propia store
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch