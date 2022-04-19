import { Box } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { Typography, Grid, Stack, Chip } from '@mui/material';
import { useEffect } from 'react';
import { getLibro } from '../../store/thunk/libroThunk';
import { Autor } from '../../interfaces/index';
import { EdicionesList } from '../ediciones/EdicionesList';

export const LibrosShowScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = parseInt(params.id || '') ;
  const {libro, cargando: cargandolibro} = useAppSelector(state => state.libros);

  useEffect(() => {
    const cargarData = async () => {
      if (id && (typeof id != "string")) {
        try {
          await Promise.all([
            dispatch(getLibro(id)).unwrap()
          ]);
        } catch (error) {
          navigate('/libros')
        }
      } else {
        navigate('/libros')
      }
    }
    cargarData();
  }, [dispatch]);  

  return (
    <>
      <Box>
        <Typography align='center' variant='h4' mb={2}>Ver Libro</Typography>
          {
            (libro && Object.keys(libro).length> 0 && !cargandolibro)  &&
            <>
              <Grid container mt={3}>
                <Grid item md={12} xs={12} >
                  <Box >
                    <Box mb={2}>
                      <Typography align='left' display={'inline-block'} variant='subtitle1' fontWeight={'bold'} >Nombre:</Typography>
                      <Typography align='center' display={'inline-block'} ml={2}>{libro?.titulo}</Typography>
                    </Box>
                    {
                      (libro.autores) && 
                        <Box>
                          <Typography align='left' display={'inline-block'} variant='subtitle1' fontWeight={'bold'} >Autor(es): &nbsp;</Typography>
                          <Stack direction="row" display={'inline-block'}>
                          {
                            libro.autores.map(({id, nombre}: Autor) => (
                              <span key={id}>
                                  <Chip  label={nombre} color="info" onClick={()=>navigate(`/autores/show/${id}`)} /><span> </span>
                                </span>)
                              )
                          }
                          </Stack>
                        </Box>
                    }
                  </Box>
                </Grid>
              </Grid>
                {
                  (libro?.ediciones && libro?.ediciones?.length > 0) && (
                    <Box mt={4}>
                      <Typography align='left' display={'inline-block'} variant='h5' fontWeight={'bold'} >Ediciones:</Typography>
                      <EdicionesList ediciones={libro?.ediciones} />
                    </Box>
                  )
                }
            </>
          }
          <br/>
      </Box>
    </>
  )
}
