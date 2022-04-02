
// import { Dispatch } from 'react';
// import { setPersonas } from '../slices/PersonaSlices';
import clienteAxios from '../../config/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Persona } from '../../interfaces/index';
import { format } from 'date-fns';
const url = process.env.REACT_APP_API;

export const getPersonas  = createAsyncThunk(
  'personas/getPersonas',
  async () => {
    
    const response = await clienteAxios.get( `${url}personas`);
    const respuesta = response.data;
    // The value we return becomes the `fulfilled` action payload
    // El valor que devolvemos se convierte en la 'carga' útil del action payload
    return respuesta;
  }
);

export const getPersona  = createAsyncThunk(
  'personas/getPersona',
  async (id: number) => {
    const response = await clienteAxios.get( `${url}personas/${id}`);
    const respuesta = response.data;
    console.log(respuesta);
    
    return respuesta;
  }
);


export const addPersona  = createAsyncThunk(
  'personas/addPersona',
  async (persona: Persona, { rejectWithValue }) => {
    if (persona.fecha_nacimiento) {
      persona.fecha_nacimiento = format(new Date (persona.fecha_nacimiento), "yyyy-MM-dd" )
    }
    try {
      const response = await clienteAxios.post( `${url}personas`, persona);
      const respuesta = response.data;
      return respuesta;
      
    } catch (error: any) {
        return rejectWithValue(error);
    }
  }
);