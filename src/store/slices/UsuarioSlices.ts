import { createSlice } from "@reduxjs/toolkit";
import { addUsuario, getUsuarios, getUsuario, updateUsuarioPass } from '../thunk/usuarioThunk';
import { Usuario } from '../../interfaces/index';

interface UsuarioState {
  usuarios: Usuario[],
  usuario?: Usuario | null,
  total: number,
  cargando: boolean,
  error?: any 
}
const initialState: UsuarioState = {
  usuarios: [],
  usuario: null,
  total: 0,
  cargando: false,
  error: null
}
const UsuarioSlice = createSlice({
  name: "usuarios",
  initialState,
  reducers: {
    // setUsuarios: (state, action) => {
    //   state.list = action.payload;
    // }
  },
  extraReducers: (builder) => {
    // getUsuarios
    builder
      .addCase(getUsuarios.pending, (state) => {
        state.cargando = true;
      })
      .addCase(getUsuarios.fulfilled, (state, action) => {
        state.cargando = false;
        state.usuario = null;
        state.usuarios = action.payload.usuarios;
        state.total = action.payload.total;
      })
      .addCase(getUsuarios.rejected, (state, action) => {
        if (action.payload) {
          state.error = (action.payload as any) || '';
        } else {
          state.error = (action.error as any)
        }
      });
    //getUsuario 
    builder
      .addCase(getUsuario.pending, (state) => {
        state.cargando = true;
        state.usuario = null;
      })
      .addCase(getUsuario.fulfilled, (state, action) => {
        state.cargando = false;
        state.usuario = action.payload.usuario;
      })
      .addCase(getUsuario.rejected, (state, action) => {
        state.cargando = false;
        if (action.payload) {
          state.error = (action.payload as any) || '';
        } else {
          state.error = (action.error as any)
        }
      });

    // addUsuario
    builder
      .addCase(addUsuario.pending, (state) => {
        state.cargando = true;
      })
      .addCase(addUsuario.fulfilled, (state, action) => {
        state.cargando = false;
        // console.log(action);
      })
      .addCase(addUsuario.rejected, (state, action) => {
        state.cargando = false;
        if (action.payload) {
          state.error = (action.payload as any) || null;
        } else {
          state.error = (action.error as any)
        }
      });

      // updateUsuarioPass
    builder
      .addCase(updateUsuarioPass.pending, (state) => {
        state.cargando = true;
      })
      .addCase(updateUsuarioPass.fulfilled, (state, action) => {
        state.cargando = false;
        console.log(action);
      })
      .addCase(updateUsuarioPass.rejected, (state, action) => {
        console.log(action);
        
        state.cargando = false;
        if (action.payload) {
          state.error = (action.payload as any) || null;
        } else {
          state.error = (action.error as any)
        }
      });

  },
});

export default UsuarioSlice.reducer;