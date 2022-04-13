import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import Box from '@mui/material/Box';
import { Grid, Typography, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect } from 'react';
import { getEdiciones } from '../../store/thunk/edicionThunk';
import { EdicionesList } from './EdicionesList';

export const EdicionesScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {cargando, ediciones} = useAppSelector(state => state.ediciones);

  useEffect(() => {
    dispatch(getEdiciones());
    console.log(ediciones);
    
  }, [])
  
  const redirigir = () => {
    navigate('/ediciones/add');
  }
  return (
    <Box>
      <Grid container spacing={2} mb={2}>
        <Grid item alignItems='center' md={11}>
          <Typography align='center' variant='h5' mb={2} >Ediciones de libros</Typography>
        </Grid>
        <Grid item md={1}>
          <Button onClick={redirigir}>
            <AddCircleIcon/>
          </Button>
        </Grid>
      </Grid>
      {cargando ? <h3>...Cargando</h3> : (Object.keys(ediciones || {}).length > 0) ? <EdicionesList/> : <p>Aun no hay registros para mostrar</p>}
    </Box>
  )
}
