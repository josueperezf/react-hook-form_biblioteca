import { createSlice } from "@reduxjs/toolkit";
import { getIdiomas } from '../thunk/idiomasThunk';

export const IdiomaSlice = createSlice({
  name: "idiomas",
  initialState: {
    idiomas: [],
    total: 0,
    cargando: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // getPersonas
    builder
      .addCase(getIdiomas.pending, (state) => {
        state.cargando = true;
      })
      .addCase(getIdiomas.fulfilled, (state, action) => {
        state.cargando = false;
        state.idiomas = action.payload.idiomas;
        state.total = action.payload.total;
      })
      .addCase(getIdiomas.rejected, (state, action) => {
        if (action.payload) {
          state.error = (action.payload as any) || '';
        } else {
          state.error = (action.error as any)
        }
      });
  },
});

// export const { setPersonas } = userSlice.actions;

export default IdiomaSlice.reducer;