import { configureStore } from '@reduxjs/toolkit'
import AutorSlices from './slices/AutorSlices';
import PaisSlice from './slices/PaisSlices';
import PersonaSlice from './slices/PersonaSlices';
import LibroSlice from './slices/LibroSlices';

export const store = configureStore({
  reducer: {
    autores: AutorSlices,
    libros: LibroSlice,
    paises: PaisSlice,
    personas: PersonaSlice,
    // comments: commentsReducer,
    // users: usersReducer
  }
})

// Inferir los tipos `RootState` y `AppDispatch` de la propia store
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch