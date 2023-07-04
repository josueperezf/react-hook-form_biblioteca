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
    { field: 'nombre', headerName: 'Nombre', editable: false, flex: 1 },
    { field: 'fecha_nacimiento', headerName: 'Fecha de Nac.', minWidth: 120,  valueFormatter: (data : any) =>  format(new Date (data.value), "dd-MM-yyyy" ) },
    { field: 'pais', headerName: 'Pais', minWidth: 200, disableColumnMenu: true, valueFormatter: ({value}: any) =>  (value.nombre as string).toLocaleUpperCase()  },
    { field: 'print', headerName: 'Acciones', disableExport: true, width: 200, sortable: false, filterable: false, disableColumnMenu: true,
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
                navigate(`/autores/show/${cellValues.id}`);
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
    <div style={{width: '100%' }}>
      {/* al DataGrid se le coloco una clase css '.MuiDataGrid-root .MuiDataGrid-cell' en el index.css para que las celdas saltaran de linea si no cabe el texto */}
      <DataGrid
        autoHeight
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
