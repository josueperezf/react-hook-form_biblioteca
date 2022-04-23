
// import { Dispatch } from 'react';
// import { setPersonas } from '../slices/PersonaSlices';
import clienteAxios from '../../config/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Persona, Auth } from '../../interfaces/index';
import { format } from 'date-fns';
const url = process.env.REACT_APP_API;

export const getUserAuth  = createAsyncThunk(
  'auth/getUserAuth',
  async () => {
    const response = await clienteAxios.get( `${url}auth/renew`);
    const respuesta = response.data;
    return respuesta;
  }
);

export const loginAuth  = createAsyncThunk(
  'auth/loginAuth',
  async (auth: Auth, { rejectWithValue }) => {
    try {
      const response = await clienteAxios.post( `${url}auth/login`, auth);
      const respuesta = response.data;
      return respuesta;
      
    } catch (error: any) {
        return rejectWithValue(error);
    }
  }
);
