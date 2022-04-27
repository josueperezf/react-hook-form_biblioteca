
// import { Dispatch } from 'react';
// import { setUsuarios } from '../slices/UsuarioSlices';
import clienteAxios from '../../config/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Usuario, CambioPassword } from '../../interfaces/index';
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
    return respuesta;
  }
);

export const addUsuario  = createAsyncThunk(
  'usuarios/addUsuario',
  async (usuario: Usuario, { rejectWithValue }) => {
    try {
      const response = await clienteAxios.post( `${url}usuarios`, usuario);
      const respuesta = response.data;
      return respuesta;
    } catch (error: any) {
        return rejectWithValue(error);
    }
  }
);

export const updateUsuario  = createAsyncThunk(
  'usuarios/updateUsuario',
  async (usuario: Usuario, { rejectWithValue }) => {
    try {
      const {id} = usuario;
      const response = await clienteAxios.put( `${url}usuarios/${id}`, usuario);
      const respuesta = response.data;
      return respuesta;
    } catch (error: any) {
        return rejectWithValue(error);
    }
  }
);
export const updateUsuarioPass  = createAsyncThunk(
  'usuarios/updateUsuarioPass',
  async (cambioPassword: CambioPassword, { rejectWithValue }) => {
    try {
      const {id} = cambioPassword;
      const response = await clienteAxios.put( `${url}usuarios/p/${id}`, cambioPassword);
      const respuesta = response.data;
      return respuesta;
    } catch (error: any) {
        return rejectWithValue(error);
    }
  }
);