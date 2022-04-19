import { DataGrid, GridColDef, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useAppSelector } from '../../hooks/useRedux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import { Button, Grid } from '@mui/material';
import { format } from 'date-fns';
import { formatRut } from '../../helpers/formatRut';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function customToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton/>
      <GridToolbarFilterButton/>
      <GridToolbarExport 
        printOptions={{ disableToolbarButton: true }}
        csvOptions={{
          fileName: 'Listado-personas',
          delimiter: ';',
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  );
}

export const PeronasList = () => {
    const {personas} = useAppSelector(state => state.personas);
    const [pageSize, setPageSize] = useState<number>(5);
    const navigate = useNavigate()
    
    const columns: GridColDef[] = [
        { field: 'dni', headerName: 'DNI', minWidth: 150, disableColumnMenu: true, valueFormatter: (data : any) =>  formatRut(data.value) },
        { field: 'nombre', headerName: 'Nombre', minWidth: 200, editable: false, flex: 1 },
        { field: 'fecha_nacimiento', headerName: 'Fecha de Nac.', minWidth: 120, valueFormatter: (data : any) =>  format(new Date (data.value), "dd-MM-yyyy" ) },
        { field: 'print', headerName: 'Acciones', disableExport: true, minWidth: 200, sortable: false, filterable: false, disableColumnMenu: true,
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
      <div style={{width: '100%' }}>
        {/* al DataGrid se le coloco una clase css '.MuiDataGrid-root .MuiDataGrid-cell' en el index.css para que las celdas saltaran de linea si no cabe el texto */}
        <DataGrid
          autoHeight
          disableSelectionOnClick
          hideFooterSelectedRowCount
          rows={personas}
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
