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
      <Grid container spacing={2} mb={2}>
        <Grid item alignItems='center' md={11}>
          <Typography align='center' variant='h5' mb={3} >Usuarios</Typography>
        </Grid>
        <Grid item md={1}>
          <Button onClick={redirigir}>
            <AddCircleIcon/>
          </Button>
        </Grid>
      </Grid>
      {cargando ? <h3>...Cargando</h3> : (Object.keys(usuarios || {}).length > 0) ? <UsuariosList usuarios={usuarios} /> : <p>Aun no hay registros para mostrar</p>}
    </Box>
  )
}
