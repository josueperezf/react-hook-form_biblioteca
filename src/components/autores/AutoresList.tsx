import React from 'react'
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridColDef, DataGrid } from '@mui/x-data-grid';
import { useAppSelector } from '../../hooks/useRedux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { format } from 'date-fns';

function customToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton/>
      <GridToolbarFilterButton/>
      <GridToolbarExport 
        printOptions={{ disableToolbarButton: true }}
        csvOptions={{
          fileName: 'Listado-autores',
          delimiter: ';',
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  );
}
export const AutoresList = () => {
  const {autores} = useAppSelector(state => state.autores);
  const [pageSize, setPageSize] = useState<number>(5);
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'nombre', headerName: 'Nombre', minWidth: 200, editable: false },
    { field: 'fecha_nacimiento', headerName: 'Fecha de Nac.', minWidth: 100, flex: 1, valueFormatter: (data : any) =>  format(new Date (data.value), "dd-MM-yyyy" ) },
    { field: 'pais', headerName: 'Pais', disableColumnMenu: true, valueFormatter: ({value}: any) =>  (value.nombre as string).toLocaleUpperCase()  },
    { field: 'print', headerName: 'Acciones', disableExport: true, minWidth: 200, flex: 1, sortable: false, filterable: false, disableColumnMenu: true,
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
                navigate(`/autores/edit/${cellValues.id}`);
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
        disableSelectionOnClick
        hideFooterSelectedRowCount
        rows={autores}
        columns={columns}
        pagination
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        components={{
          Toolbar: customToolbar
        }}
      />
    </div>
  </>
  )
}
