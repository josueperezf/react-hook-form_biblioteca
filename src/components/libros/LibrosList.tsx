import React from 'react'
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridColDef, DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/useRedux';
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
          fileName: 'Listado-libros',
          delimiter: ';',
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  );
}
export const LibrosList = () => {
  const {libros} = useAppSelector(state => state.libros);
  
  const [pageSize, setPageSize] = useState<number>(10);
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'titulo', headerName: 'Titulo', flex: 1, editable: false },
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
                  navigate(`/libros/edit/${cellValues.id}`);
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
      <div style={{height: 600, width: '100%' }}>
        <DataGrid
          disableSelectionOnClick
          hideFooterSelectedRowCount
          rows={libros}
          columns={columns}
          pagination
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20, 50]}
          components={{
            Toolbar: customToolbar
          }}
        />
      </div>
    </>
  )
}
