import clienteAxios from '../../config/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Autor } from '../../interfaces/index';
import { format } from 'date-fns';
const url = process.env.REACT_APP_API;

export const getAutores  = createAsyncThunk(
  'autores/getAutores',
  async () => {
    
    const response = await clienteAxios.get( `${url}autores`);
    const respuesta = response.data;
    // The value we return becomes the `fulfilled` action payload
    // El valor que devolvemos se convierte en la 'carga' útil del action payload
    return respuesta;
  }
);

export const getAutor  = createAsyncThunk(
  'autores/getAutor',
  async (id: number) => {
    const response = await clienteAxios.get( `${url}autores/${id}`);
    const respuesta = response.data;
    // console.log(respuesta);
    return respuesta;
  }
);

export const addAutor  = createAsyncThunk(
  'autores/addAutor',
  async (autor: Autor, { rejectWithValue }) => {
    if (autor.fecha_nacimiento) {
      autor.fecha_nacimiento = format(new Date (autor.fecha_nacimiento), "yyyy-MM-dd" )
    }
    try {
      const response = await clienteAxios.post( `${url}autores`, autor);
      const respuesta = response.data;
      return respuesta;
      
    } catch (error: any) {
        return rejectWithValue(error);
    }
  }
);

export const updateAutor  = createAsyncThunk(
  'autores/updateAutor',
  async (autor: Autor, { rejectWithValue }) => {
    if (autor.fecha_nacimiento) {
      autor.fecha_nacimiento = format(new Date (autor.fecha_nacimiento), "yyyy-MM-dd" )
    }
    try {
      const {id} = autor;
      const response = await clienteAxios.put( `${url}autores/${id}`, autor);
      const respuesta = response.data;
      return respuesta;
    } catch (error: any) {
        return rejectWithValue(error);
    }
  }
);