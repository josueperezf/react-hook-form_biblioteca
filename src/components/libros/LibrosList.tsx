import React, { useCallback } from 'react'
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridColDef, DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { Grid, Button, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { getLibros } from '../../store/thunk/libroThunk';
import { LibrosEditDialog } from './LibrosEditDialog';
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
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number>(0);
  const navigate = useNavigate();

  const handleClickOpen = (id: number) => {
    setId(id);
    setOpen(true);
  }
  const handleClose = (value: boolean) => {
    setOpen(false);
    value && dispatch(getLibros());
  };

  const columns: GridColDef[] = [
    { field: 'titulo', headerName: 'Titulo', flex: 1, editable: false },
    { field: 'print', headerName: 'Acciones', disableExport: true, width: 200, sortable: false, filterable: false, disableColumnMenu: true,
      renderCell: (cellValues) => {
        return (
          <>
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
                    // navigate(`/libros/edit/${cellValues.id}`);
                    handleClickOpen( parseInt((cellValues as any).id) || 0);
                  }}
                >
                  Editar
                </Button>
              </Grid>
            </Grid>
          </>
        );
      }
    }
  ];
  return (
    <>
      <div style={{height: 600, width: '100%' }}>
        <LibrosEditDialog
          id={id}
          open={open}
          onClose={handleClose}
        />
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
