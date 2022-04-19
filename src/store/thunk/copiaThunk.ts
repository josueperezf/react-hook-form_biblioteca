
// import { Dispatch } from 'react';
// import { setCopias } from '../slices/CopiaSlices';
import clienteAxios from '../../config/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Copia } from '../../interfaces/index';
import { format } from 'date-fns';
const url = process.env.REACT_APP_API;

export const getCopias  = createAsyncThunk(
  'copias/getCopias',
  async () => {
    
    const response = await clienteAxios.get( `${url}copias`);
    const respuesta = response.data;
    // The value we return becomes the `fulfilled` action payload
    // El valor que devolvemos se convierte en la 'carga' útil del action payload
    return respuesta;
  }
);

export const getCopia  = createAsyncThunk(
  'copias/getCopia',
  async (id: number) => {
    const response = await clienteAxios.get( `${url}copias/${id}`);
    const respuesta = response.data;
    console.log(respuesta);
    
    return respuesta;
  }
);

export const addCopia  = createAsyncThunk(
  'copias/addCopia',
  async (copia: Copia, { rejectWithValue }) => {
    try {
      const response = await clienteAxios.post( `${url}copias`, copia);
      const respuesta = response.data;
      return respuesta;
      
    } catch (error: any) {
        return rejectWithValue(error);
    }
  }
);

export const updateCopia  = createAsyncThunk(
  'copias/updateCopia',
  async (copia: Copia, { rejectWithValue }) => {
    try {
      const {id} = copia;
      const response = await clienteAxios.put( `${url}copias/${id}`, copia);
      const respuesta = response.data;
      return respuesta;
    } catch (error: any) {
        return rejectWithValue(error);
    }
  }
);