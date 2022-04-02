import { createSlice } from "@reduxjs/toolkit";
import { addPersona, getPersonas, getPersona } from '../thunk/personaThunk';
import { Persona } from '../../interfaces/index';

const PersonaSlice = createSlice({
  name: "personas",
  initialState: {
    personas: [],
    persona: null,
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
      .addCase(getPersonas.pending, (state) => {
        state.cargando = true;
      })
      .addCase(getPersonas.fulfilled, (state, action) => {
        state.cargando = false;
        state.personas = action.payload.personas;
        state.total = action.payload.total;
      })
      .addCase(getPersonas.rejected, (state, action) => {
        if (action.payload) {
          state.error = (action.payload as any) || '';
        } else {
          state.error = (action.error as any)
        }
      });
    //getPersona 
    builder
      .addCase(getPersona.pending, (state) => {
        state.cargando = true;
        state.persona = null;
      })
      .addCase(getPersona.fulfilled, (state, action) => {
        state.cargando = false;
        state.persona = action.payload.persona;
      })
      .addCase(getPersona.rejected, (state, action) => {
        if (action.payload) {
          state.error = (action.payload as any) || '';
        } else {
          state.error = (action.error as any)
        }
      });

    // addPersona
    builder
      .addCase(addPersona.pending, (state) => {
        state.cargando = true;
      })
      .addCase(addPersona.fulfilled, (state, action) => {
        state.cargando = false;
        console.log(action);
        
        // state.personas = action.payload.personas;
        // state.total = action.payload.total;
      })
      .addCase(addPersona.rejected, (state, action) => {
        // console.log(action);
        // console.log(action.payload);
        
        if (action.payload) {
          state.error = (action.payload as any) || null;
        } else {
          state.error = (action.error as any)
        }
      });

  },
});

// export const { setPersonas } = userSlice.actions;

export default PersonaSlice.reducer;


// prueba
// export const personaReducer = userSlice.reducer;

