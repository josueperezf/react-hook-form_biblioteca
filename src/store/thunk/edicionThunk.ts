import clienteAxios from '../../config/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Edicion } from '../../interfaces/index';
import { format } from 'date-fns';
const url = process.env.REACT_APP_API;

export const getEdiciones  = createAsyncThunk(
  'ediciones/getEdiciones',
  async () => {
    
    const response = await clienteAxios.get( `${url}ediciones`);
    const respuesta = response.data;
    // The value we return becomes the `fulfilled` action payload
    // El valor que devolvemos se convierte en la 'carga' útil del action payload
    return respuesta;
  }
);

export const getOnlyEdiciones  = createAsyncThunk(
  'ediciones/getOnlyEdiciones',
  async () => {
    
    const response = await clienteAxios.get( `${url}ediciones`);
    const respuesta = response.data;
    // The value we return becomes the `fulfilled` action payload
    // El valor que devolvemos se convierte en la 'carga' útil del action payload
    return respuesta;
  }
);

export const getEdicion  = createAsyncThunk(
  'ediciones/getEdicion',
  async (id: number) => {
    const response = await clienteAxios.get( `${url}ediciones/${id}`);
    const respuesta = response.data;
    console.log(respuesta);
    
    return respuesta;
  }
);

export const addEdicion  = createAsyncThunk(
  'ediciones/addEdicion',
  async (edicion: Edicion, { rejectWithValue }) => {
    if (edicion.fecha) {
      edicion.fecha = format(new Date (edicion.fecha), "yyyy-MM-dd" )
    }
    try {
      const response = await clienteAxios.post( `${url}ediciones`, edicion);
      const respuesta = response.data;
      return respuesta;
      
    } catch (error: any) {
        return rejectWithValue(error);
    }
  }
);

export const updateEdicion  = createAsyncThunk(
  'ediciones/updateEdicion',
  async (edicion: Edicion, { rejectWithValue }) => {
    if (edicion.fecha) {
      edicion.fecha = format(new Date (edicion.fecha), "yyyy-MM-dd" )
    }
    try {
      const {id} = edicion;
      const response = await clienteAxios.put( `${url}ediciones/${id}`, edicion);
      const respuesta = response.data;
      return respuesta;
    } catch (error: any) {
        return rejectWithValue(error);
    }
  }
);