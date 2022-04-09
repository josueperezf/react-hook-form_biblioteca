import clienteAxios from '../../config/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Libro } from '../../interfaces/index';
import { format } from 'date-fns';
const url = process.env.REACT_APP_API;

export const getLibros  = createAsyncThunk(
  'libros/getLibros',
  async () => {
    
    const response = await clienteAxios.get( `${url}libros`);
    const respuesta = response.data;
    // The value we return becomes the `fulfilled` action payload
    // El valor que devolvemos se convierte en la 'carga' útil del action payload
    return respuesta;
  }
);

export const getLibro  = createAsyncThunk(
  'libros/getLibro',
  async (id: number) => {
    const response = await clienteAxios.get( `${url}libros/${id}`);
    const respuesta = response.data;
    console.log(respuesta);
    
    return respuesta;
  }
);

export const getLibroForEdit  = createAsyncThunk(
  'libros/getLibroForEdit',
  async (id: number) => {
    const response = await clienteAxios.get( `${url}libros/edit/${id}`);
    const respuesta = response.data;
    console.log(respuesta);
    
    return respuesta;
  }
);

export const addLibro  = createAsyncThunk(
  'libros/addLibro',
  async (libro: Libro, { rejectWithValue }) => {
    // if (libro.fecha_nacimiento) {
    //   libro.fecha_nacimiento = format(new Date (libro.fecha_nacimiento), "yyyy-MM-dd" )
    // }
    try {
      const response = await clienteAxios.post( `${url}libros`, libro);
      const respuesta = response.data;
      return respuesta;
      
    } catch (error: any) {
        return rejectWithValue(error);
    }
  }
);

export const updateLibro  = createAsyncThunk(
  'libros/updateLibro',
  async (libro: Libro, { rejectWithValue }) => {
    // if (libro.fecha_nacimiento) {
    //   libro.fecha_nacimiento = format(new Date (libro.fecha_nacimiento), "yyyy-MM-dd" )
    // }
    try {
      const {id} = libro;
      const response = await clienteAxios.put( `${url}libros/${id}`, libro);
      const respuesta = response.data;
      return respuesta;
    } catch (error: any) {
        return rejectWithValue(error);
    }
  }
);