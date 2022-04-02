import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import { Typography, Grid, Button } from '@mui/material';
import { getPersonas } from '../../store/thunk/personaThunk';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { PeronasList } from './PeronasList';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from "react-router-dom";

const PersonasScreen = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {cargando} = useAppSelector(state => state.personas);

    useEffect(() => {
        dispatch(getPersonas());
    }, [dispatch]);

    const redirigir = () => {
      navigate('/personas/add');
    }
    
    return (
        <Box>
          <Grid container spacing={2} mb={2}>
            <Grid item alignItems='center' md={11}>
              <Typography align='center' variant='h5' mb={2} >Personas</Typography>
            </Grid>
            <Grid item md={1}>
              <Button onClick={redirigir}>
                <AddCircleIcon/>
              </Button>
            </Grid>
          </Grid>
          {cargando ? <h3>...Cargando</h3> : <PeronasList/>}
        </Box>
    )
}

export default PersonasScreen