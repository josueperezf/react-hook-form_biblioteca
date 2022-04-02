import { createSlice } from "@reduxjs/toolkit";
import { getPaises } from '../thunk/paisThunk';

export const PaisSlice = createSlice({
  name: "paises",
  initialState: {
    paises: [],
    total: 0,
    cargando: false,
    error: null
  },
  reducers: {
    // setPersonas: (state, action) => {
    //   state.list = action.payload;
    // }
  },
  extraReducers: (builder) => {
    // getPersonas
    builder
      .addCase(getPaises.pending, (state) => {
        state.cargando = true;
      })
      .addCase(getPaises.fulfilled, (state, action) => {
        state.cargando = false;
        state.paises = action.payload.paises;
        state.total = action.payload.total;
      })
      .addCase(getPaises.rejected, (state, action) => {
        if (action.payload) {
          state.error = (action.payload as any) || '';
        } else {
          state.error = (action.error as any)
        }
      });
  },
});

// export const { setPersonas } = userSlice.actions;

export default PaisSlice.reducer;


// prueba
// export const personaReducer = userSlice.reducer;

