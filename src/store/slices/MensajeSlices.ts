import { createSlice } from "@reduxjs/toolkit";
import { MensajeState } from '../../interfaces/index';

const initialState: MensajeState = {
  contenido: "",
  open: false,
  tipo: "error",
  titulo: "",
  onClose: null
}
const MensajeSlice = createSlice({
  name: "mensaje",
  initialState,
  reducers: {
    mostrarMensaje: (state, action) => {
      state.contenido = action.payload.contenido;
      state.open = action.payload.open;
      state.tipo = action.payload.tipo;
      state.titulo = action.payload.titulo;
      (action.payload.onClose) && (state.onClose = action.payload.onClose);
    },
    ocultarMensaje: (state) => {
      state.open = false;
      // state.contenido = '';
      // state.tipo = 'error';
      // state.titulo = '';
      state.onClose = null;
    }
  }
});

export const { mostrarMensaje } = MensajeSlice.actions;
export const { ocultarMensaje } = MensajeSlice.actions;
export default MensajeSlice.reducer;