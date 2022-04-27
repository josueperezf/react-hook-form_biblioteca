import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getCopia } from '../../store/thunk/copiaThunk';
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

export const CopiasShowScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = parseInt(params.id || '') ;
  const {copia, cargando} = useAppSelector(state => state.copias);

  useEffect(() => {
    const cargarData = async () => {
      if (id && (typeof id != "string")) {
        try {
          await Promise.all([
            dispatch(getCopia(id)).unwrap()
          ]);
        } catch (error) {
          navigate('/copias')
        }
      } else {
        navigate('/copias')
      }
    }
    cargarData();
  }, [dispatch]);

  return (
    <>
      {
        (copia && Object.keys(copia).length > 0) &&
          <Box>
            <Box>
              <Typography align='center' variant='h4' mb={2}>Ver Copia</Typography>
              <Box mb={1}>
                <Typography align='left' display={'inline-block'} variant='subtitle1' fontWeight={'bold'} >Código:</Typography>
                <Typography align='center' display={'inline-block'} ml={2}>{copia.codigo}</Typography>
              </Box>
              <Box mb={2}>
                <Typography align='left' display={'inline-block'} variant='subtitle1' fontWeight={'bold'} >Serial:</Typography>
                <Typography align='center' display={'inline-block'} ml={2}>{copia.serial}</Typography>
              </Box>
              <Box mb={2}>
                <Typography align='left' display={'inline-block'} variant='subtitle1' fontWeight={'bold'} >Estado:</Typography>
                <Typography align='center' display={'inline-block'} ml={2}>{copia.estado?.nombre}</Typography>
              </Box>
            </Box>
            {
              (copia.edicion) &&
                <Box mt={4}>
                  <hr/>
                  <Typography align='left' display={'inline-block'} variant='h5' fontWeight={'bold'} >Ediciones:</Typography>
                  <Box mb={1}>
                    <Typography align='left' display={'inline-block'} variant='subtitle1' fontWeight={'bold'} >Nombre:</Typography>
                    <Typography align='center' display={'inline-block'} ml={2}>{copia.edicion.nombre}</Typography>
                  </Box>
                  <Box mb={1}>
                    <Typography align='left' display={'inline-block'} variant='subtitle1' fontWeight={'bold'} >Número de paginas:</Typography>
                    <Typography align='center' display={'inline-block'} ml={2}>{copia.edicion.numero_paginas}</Typography>
                  </Box>
                  <Box mb={1}>
                    <Typography align='left' display={'inline-block'} variant='subtitle1' fontWeight={'bold'} >Idioma:</Typography>
                    <Typography align='center' display={'inline-block'} ml={2}>{copia.edicion.idioma?.nombre}</Typography>
                  </Box>
                  <Box mb={1}>
                    <Typography align='left' display={'inline-block'} variant='subtitle1' fontWeight={'bold'} >Acciones:</Typography>
                    <Box>
                      <Button variant="contained" color="primary" size='small' startIcon={<VisibilityIcon/>}
                        onClick={() => {
                          navigate(`/libros/show/${copia.edicion?.libro_id}`);
                        }}
                      >
                        Ver libro
                      </Button>
                      </Box>
                  </Box>
              </Box>
            }
        </Box>
      }
    </>
  )
}
