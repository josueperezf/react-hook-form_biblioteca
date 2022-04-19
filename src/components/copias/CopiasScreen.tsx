import { useEffect } from 'react';
import { getCopias } from '../../store/thunk/copiaThunk';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { Box } from '@mui/system';
import { Grid, Typography, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CopiasList } from './CopiasList';

export const CopiasScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {copias, cargando} = useAppSelector(state => state.copias);
  const redirigir = () => {
    navigate('/copias/add');
  }
  useEffect(() => {
      dispatch(getCopias());
  }, [dispatch]);

  return (
    <Box>
      <Grid container spacing={2} mb={2}>
        <Grid item alignItems='center' md={11}>
          <Typography align='center' variant='h5' mb={2} >Copias</Typography>
        </Grid>
        <Grid item md={1}>
          <Button onClick={redirigir}>
            <AddCircleIcon/>
          </Button>
        </Grid>
      </Grid>
      {cargando ? <h3>...Cargando</h3> : (copias.length > 0) ? <CopiasList copias={copias} /> : <p>Aun no hay registros para mostrar</p>}
    </Box>
  )
}
