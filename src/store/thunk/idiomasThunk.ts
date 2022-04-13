import clienteAxios from '../../config/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
const url = process.env.REACT_APP_API;

export const getIdiomas  = createAsyncThunk(
  'idiomas/getIdiomas',
  async () => {
    
    const response = await clienteAxios.get( `${url}idiomas`);
    const respuesta = response.data;
    // The value we return becomes the `fulfilled` action payload
    // El valor que devolvemos se convierte en la 'carga' útil del action payload
    return respuesta;
  }
);