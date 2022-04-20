import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { UsuariosList } from './UsuariosList';
import { getUsuarios } from '../../store/thunk/usuarioThunk';

export const UsuariosScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {usuarios, cargando} = useAppSelector(state => state.usuarios);

  useEffect(() => {
      dispatch(getUsuarios());
  }, [dispatch]);

  const redirigir = () => {
    navigate('/usuarios/add');
  }
  
  return (
    <Box>
      <Typography align='center' variant='h5' mb={3} >Usuarios</Typography>
      {cargando ? <h3>...Cargando</h3> : (Object.keys(usuarios || {}).length > 0) ? <UsuariosList usuarios={usuarios} /> : <p>Aun no hay registros para mostrar</p>}
    </Box>
  )
}
