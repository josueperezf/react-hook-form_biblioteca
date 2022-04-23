import { createSlice } from "@reduxjs/toolkit";
import { loginAuth, getUserAuth } from '../thunk/authThunk';
import { UsuarioLogueado } from '../../interfaces/index';

interface AuthState {
  usuario?: UsuarioLogueado | null,
  token?: string,
  cargando: boolean,
  error?: any 
}
const initialState: AuthState = {
  usuario: null,
  token: '',
  cargando: false,
  error: null
}
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.usuario = null;
      state.token = '';
    }
  },
  extraReducers: (builder) => {
    //getUserAuth 
    builder
      .addCase(getUserAuth.pending, (state) => {
        state.cargando = true;
        state.usuario = null;
      })
      .addCase(getUserAuth.fulfilled, (state, action) => {
        state.cargando = false;
        const {token, usuario} = action.payload;
        if (token && usuario) {
          localStorage.setItem('token', token);
          state.token = token;
          state.usuario = usuario;
        }
      })
      .addCase(getUserAuth.rejected, (state, action) => {
        state.cargando = false;
        if (action.payload) {
          state.error = (action.payload as any) || '';
        } else {
          state.error = (action.error as any)
        }
      });

    // loginAuth
    builder
      .addCase(loginAuth.pending, (state) => {
        state.cargando = true;
      })
      .addCase(loginAuth.fulfilled, (state, action) => {
        state.cargando = false;
        const {token, usuario} = action.payload;
        if (token && usuario) {
          localStorage.setItem('token', token);
          state.token = token;
          state.usuario = usuario;
        }
      })
      .addCase(loginAuth.rejected, (state, action) => {
        state.cargando = false;
        if (action.payload) {
          state.error = (action.payload as any) || null;
        } else {
          state.error = (action.error as any)
        }
      });
  },
});
export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;