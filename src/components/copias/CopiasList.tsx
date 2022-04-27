import { Copia } from '../../interfaces/index';
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridColDef, DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

function customToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton/>
      <GridToolbarFilterButton/>
      <GridToolbarExport 
        printOptions={{ disableToolbarButton: true }}
        csvOptions={{
          fileName: 'Listado-copias',
          delimiter: ';',
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  );
}
interface Props {
    copias: Copia[]
}
export const CopiasList = ({copias}: Props) => {
  const [pageSize, setPageSize] = useState<number>(50);
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'codigo', headerName: 'Código', minWidth: 120, disableColumnMenu: true},
    { field: 'edicion', headerName: 'Edicion', minWidth: 200, flex: 1, editable: false, valueFormatter: (data : any) => data.value.nombre },
    { field: 'estado', headerName: 'Estado', minWidth: 200, editable: false, valueFormatter: (data : any) => data.value.nombre },
    { field: 'print', headerName: 'Acciones', disableExport: true, minWidth: 200, sortable: false, filterable: false, disableColumnMenu: true,
      renderCell: (cellValues) => {
        return (
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" size='small' startIcon={<VisibilityIcon/>}
                onClick={(event: any) => {
                  navigate(`/copias/show/${cellValues.id}`);
                }}
              >
                Ver
              </Button>
            </Grid>

            <Grid item>
              <Button variant="contained" color="primary" size='small' startIcon={<EditIcon fontSize='small' />}
                onClick={() => {
                  navigate(`/copias/edit/${cellValues.id}`);
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
          rows={copias}
          columns={columns}
          pagination
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[50, 80, 100]}
          components={{
            Toolbar: customToolbar
          }}
        />
      </div>
    </>
  )
}
