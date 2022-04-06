import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useEffect } from 'react';
import { getAutores } from '../../store/thunk/autorThunk';
import Box from '@mui/material/Box';
import { Grid, Typography, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getLibros } from '../../store/thunk/libroThunk';
import { LibrosList } from './LibrosList';

export const LibrosScreen = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {cargando} = useAppSelector(state => state.libros);

    useEffect(() => {
        dispatch(getLibros());
    }, [dispatch]);

    const redirigir = () => {
      navigate('/libros/add');
    }
    return (
        <Box>
          <Grid container spacing={2} mb={2}>
            <Grid item alignItems='center' md={11}>
              <Typography align='center' variant='h5' mb={2} >Libros</Typography>
            </Grid>
            <Grid item md={1}>
              <Button onClick={redirigir}>
                <AddCircleIcon/>
              </Button>
            </Grid>
          </Grid>
          {cargando ? <h3>...Cargando</h3> : <LibrosList/>}
        </Box>
    )
}
