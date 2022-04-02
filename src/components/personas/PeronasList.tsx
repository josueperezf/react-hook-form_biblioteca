import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAppSelector } from '../../hooks/useRedux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import { Button, Grid } from '@mui/material';
import { format } from 'date-fns';
import { formatRut } from '../../helpers/formatRut';
import { useNavigate } from 'react-router-dom';

export const PeronasList = () => {
    const {personas} = useAppSelector(state => state.personas);
    const navigate = useNavigate()
    
    const columns: GridColDef[] = [
        { field: 'dni', headerName: 'DNI', valueFormatter: (data : any) =>  formatRut(data.value) },
        { field: 'nombre', headerName: 'Nombre', minWidth: 200, editable: true },
        { field: 'fecha_nacimiento', headerName: 'Fecha de Nac.', minWidth: 100, flex: 1, valueFormatter: (data : any) =>  format(new Date (data.value), "dd-MM-yyyy" ) },
        { field: 'print', headerName: 'Acciones', minWidth: 200, flex: 1, sortable: false, filterable: false, disableColumnMenu: true,
        renderCell: (cellValues) => {
          return (
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size='small'
                  startIcon={<VisibilityIcon/>}
                  onClick={(event: any) => {
                    console.log(event, cellValues);
                  }}
                >
                  Ver
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size='small'
                  startIcon={<EditIcon fontSize='small' />}
                  onClick={() => {
                    navigate(`/personas/edit/${cellValues.id}`);
                  }}
                >
                  Editar
                </Button>
              </Grid>
            </Grid>
          );
        }
      }
    ];
  return (
    <>
      <div style={{height: 400, width: '100%' }}>
        <DataGrid
          rows={personas}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  )
}
