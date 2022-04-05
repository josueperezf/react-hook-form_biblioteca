import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { getAutores } from '../../store/thunk/autorThunk';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AutoresList } from './AutoresList';

export const AutoresScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {cargando, autores} = useAppSelector(state => state.autores);

  useEffect(() => {
      dispatch(getAutores());
  }, [dispatch]);

  const redirigir = () => {
    navigate('/autores/add');
  }
  return (
    <Box>
      <Grid container spacing={2} mb={2}>
        <Grid item alignItems='center' md={11}>
          <Typography align='center' variant='h5' mb={2} >Autores</Typography>
        </Grid>
        <Grid item md={1}>
          <Button onClick={redirigir}>
            <AddCircleIcon/>
          </Button>
        </Grid>
      </Grid>
      {cargando ? <h3>...Cargando</h3> : (Object.keys(autores || {}).length > 0) ? <AutoresList/> : <p>Aun no hay registros para mostrar</p>}
    </Box>
  )
}
