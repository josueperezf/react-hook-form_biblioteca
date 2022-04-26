import { createSlice } from "@reduxjs/toolkit";
import { addPersona, getPersonas, getPersona, updatePersona, getPersonaPorDNI, getPersonaSinUsuarioPorDNI } from '../thunk/personaThunk';
import { Persona } from '../../interfaces/index';

interface PersonaState {
  personas: Persona[],
  persona?: Persona | null,
  total: number,
  cargando: boolean,
  error?: any 
}
const initialState: PersonaState = {
  personas: [],
  persona: null,
  total: 0,
  cargando: false,
  error: null
}
const PersonaSlice = createSlice({
  name: "personas",
  initialState,
  reducers: {
    setPersona: (state, action) => {
      state.persona = action.payload || null;
    }
  },
  extraReducers: (builder) => {
    // getPersonas
    builder
      .addCase(getPersonas.pending, (state) => {
        state.cargando = true;
      })
      .addCase(getPersonas.fulfilled, (state, action) => {
        state.cargando = false;
        state.persona = null;
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
        state.cargando = false;
        if (action.payload) {
          state.error = (action.payload as any) || '';
        } else {
          state.error = (action.error as any)
        }
      });
    
    // getPersonaPorDNI
    builder
      .addCase(getPersonaPorDNI.pending, (state) => {
        state.cargando = true;
        state.persona = null;
      })
      .addCase(getPersonaPorDNI.fulfilled, (state, action) => {
        state.cargando = false;
        state.persona = action.payload.persona;
      })
      .addCase(getPersonaPorDNI.rejected, (state, action) => {
        state.cargando = false;
        if (action.payload) {
          state.error = (action.payload as any) || '';
        } else {
          state.error = (action.error as any)
        }
      });
    
    // getPersonaPorDNI
    builder
      .addCase(getPersonaSinUsuarioPorDNI.pending, (state) => {
        state.cargando = true;
        state.persona = null;
      })
      .addCase(getPersonaSinUsuarioPorDNI.fulfilled, (state, action) => {
        state.cargando = false;
        state.persona = action.payload.persona;
      })
      .addCase(getPersonaSinUsuarioPorDNI.rejected, (state, action) => {
        state.cargando = false;
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
        // console.log(action);
      })
      .addCase(addPersona.rejected, (state, action) => {
        state.cargando = false;
        if (action.payload) {
          state.error = (action.payload as any) || null;
        } else {
          state.error = (action.error as any)
        }
      });

      // updatePersona
    builder
      .addCase(updatePersona.pending, (state) => {
        state.cargando = true;
      })
      .addCase(updatePersona.fulfilled, (state, action) => {
        state.cargando = false;
        console.log(action);
      })
      .addCase(updatePersona.rejected, (state, action) => {
        state.cargando = false;
        if (action.payload) {
          state.error = (action.payload as any) || null;
        } else {
          state.error = (action.error as any)
        }
      });

  },
});

export const { setPersona } = PersonaSlice.actions;
export default PersonaSlice.reducer;
