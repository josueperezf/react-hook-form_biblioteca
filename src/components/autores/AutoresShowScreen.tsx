import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAutor } from '../../store/thunk/autorThunk';
import { Typography, Grid, Button } from '@mui/material';
import { Box } from '@mui/system';
import { getPaises } from '../../store/thunk/paisThunk';
import { Pais } from '../../interfaces/index';
import { format } from 'date-fns';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

export const AutoresShowScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [pais, setPais] = useState<string>('');
  const params = useParams();
  const id = parseInt(params.id || '') ;
  const {autor, cargando} = useAppSelector(state => state.autores);
  const {paises, cargando:cargandoPais} = useAppSelector(state => state.paises);
  const columns: GridColDef[] = [
    { field: 'titulo', headerName: 'Titulo', flex: 1, editable: false },
    { field: 'print', headerName: 'Acciones', disableExport: true, width: 200, sortable: false, filterable: false, disableColumnMenu: true,
      renderCell: (cellValues) => {
        return (
          <>
            <Grid container spacing={1}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size='small'
                  startIcon={<VisibilityIcon/>}
                  onClick={(event: any) => {
                    navigate(`/libros/show/${cellValues.id}`);
                  }}
                >
                  Ver
                </Button>
              </Grid>
            </Grid>
          </>
        );
      }
    }
  ];

  useEffect(() => {
    const cargarData = async () => {
      if (id && (typeof id != "string")) {
        try {
          await Promise.all([
            dispatch(getAutor(id)).unwrap(),
            dispatch(getPaises()).unwrap(),
          ]);
        } catch (error) {
          navigate('/autores')
        }
      } else {
        navigate('/autores')
      }
    }
    cargarData();
  }, [dispatch]);

  useEffect(() => {
    if (paises.length > 0 && autor && autor.pais_id && pais === '') {
      const paisEncontrado: Pais[] = paises.filter(({id}: Pais) => id == autor.pais_id) ;
      (paisEncontrado.length > 0 ) && setPais(paisEncontrado[0].nombre);
    }
  }, [paises, autor])
  

  return (
    <>
      <Box>
        <Grid container spacing={2} mb={2}>
          <Grid item alignItems='center' md={11}>
            <Typography align='center' variant='h5' mb={2} >Autores</Typography>
          </Grid>
          <Grid item md={1}>
            <Button onClick={ ()=> navigate(`/autores/edit/${id}`)} >
              <EditIcon/>
            </Button>
          </Grid>
        </Grid>
        {
          (autor && Object.keys(autor).length> 0 && !cargando)  &&
          <>
            <Grid container mt={3}>
              <Grid item md={12} xs={12} >
                <Box >
                  <Box mb={2}>
                    <Typography align='left' display={'inline-block'} variant='subtitle1' fontWeight={'bold'} >Nombre:</Typography>
                    <Typography align='center' display={'inline-block'} ml={2}>{autor?.nombre}</Typography>
                  </Box>
                  {
                    (pais.length > 0) &&
                      <Box mb={2}>
                        <Typography align='left' display={'inline-block'} variant='subtitle1' fontWeight={'bold'} >Pais origen:</Typography>
                        <Typography align='center' display={'inline-block'} ml={2}>{pais}</Typography>
                      </Box>
                  }
                  {
                    (autor.fecha_nacimiento) &&
                    <Box mb={2}>
                      <Typography align='left' display={'inline-block'} variant='subtitle1' fontWeight={'bold'} >Fecha Nacimiento:</Typography>
                      <Typography align='center' display={'inline-block'} ml={2}>{ format(new Date (autor.fecha_nacimiento), "dd-MM-yyyy" )}</Typography>
                    </Box>
                  }

                </Box>
              </Grid>
            </Grid>
            {
              (autor?.libros) &&
              <Box width='100%' mt={3}>
                <Typography align='left' display={'inline-block'} variant='h5' fontWeight={'bold'} >Libros:</Typography>
                <DataGrid
                  disableSelectionOnClick
                  hideFooterSelectedRowCount
                  rows={autor.libros}
                  columns={columns}
                  pageSize={100}
                  rowsPerPageOptions={[100]}
                  autoHeight
                  hideFooter
                />
              </Box>
            }
          </>
        }
      </Box>
    </>
  )
}
