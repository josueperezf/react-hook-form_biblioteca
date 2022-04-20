
// import { Dispatch } from 'react';
// import { setUsuarios } from '../slices/UsuarioSlices';
import clienteAxios from '../../config/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Usuario } from '../../interfaces/index';
import { format } from 'date-fns';
const url = process.env.REACT_APP_API;

export const getUsuarios  = createAsyncThunk(
  'usuarios/getUsuarios',
  async () => {
    
    const response = await clienteAxios.get( `${url}usuarios`);
    const respuesta = response.data;
    // The value we return becomes the `fulfilled` action payload
    // El valor que devolvemos se convierte en la 'carga' útil del action payload
    return respuesta;
  }
);

export const getUsuario  = createAsyncThunk(
  'usuarios/getUsuario',
  async (id: number) => {
    const response = await clienteAxios.get( `${url}usuarios/${id}`);
    const respuesta = response.data;
    console.log(respuesta);
    
    return respuesta;
  }
);

export const addUsuario  = createAsyncThunk(
  'usuarios/addUsuario',
  async (persona: Usuario, { rejectWithValue }) => {
    try {
      const response = await clienteAxios.post( `${url}usuarios`, persona);
      const respuesta = response.data;
      return respuesta;
      
    } catch (error: any) {
        return rejectWithValue(error);
    }
  }
);

export const updateUsuario  = createAsyncThunk(
  'usuarios/updateUsuario',
  async (persona: Usuario, { rejectWithValue }) => {
    try {
      const {id} = persona;
      const response = await clienteAxios.put( `${url}usuarios/${id}`, persona);
      const respuesta = response.data;
      return respuesta;
    } catch (error: any) {
        return rejectWithValue(error);
    }
  }
);