import React from 'react'
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridColDef, DataGrid } from '@mui/x-data-grid';
import { useAppSelector } from '../../hooks/useRedux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, Chip, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { format } from 'date-fns';
import { Edicion } from '../../interfaces/index';

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
interface Props {
  ediciones: Edicion[]
}
export const EdicionesList = ({ediciones}: Props) => {
  // const {ediciones} = useAppSelector(state => state.ediciones);
  const [pageSize, setPageSize] = useState<number>(10);
  const navigate = useNavigate();

  let columns: GridColDef[] = [
    { field: 'idioma', headerName: 'Idioma', width: 100, editable: false, valueFormatter: (data : any) => data.value.nombre },
    // { field: 'libro', headerName: 'Libro', minWidth: 200, editable: false, valueFormatter: (data : any) => data.value.titulo },
    { field: 'nombre', headerName: 'Nombre', minWidth: 250, editable: false, flex: 1 },
    { field: 'fecha', headerName: 'Fecha', width: 100,  valueFormatter: (data : any) =>  format(new Date (data.value), "dd-MM-yyyy" ) },
    { field: 'print', headerName: 'Acciones', disableExport: true, width: 120, sortable: false, filterable: false, disableColumnMenu: true,
    renderCell: (cellValues) => {
      return (
        <Box textAlign={'center'} width={'100%'}>
            <Button
              variant="contained"
              color="primary"
              size='small'
              startIcon={<EditIcon fontSize='small' />}
              onClick={() => {
                navigate(`/ediciones/edit/${cellValues.id}`);
              }}
            >
              Editar
            </Button>
        </Box>
      );
    }
    }
  ];

  /**
   * el siguiente if es por que utilizo este componente tanto en el edicionesScreen como en LibrosShowScreee,
   * en este ultimo no necesito la columna libro, por ende, no la tengo, asi que la agrego solo si la tengo,
   * esto ocurre solo cuando es llamado desde edicionesScreen
   */
  if (ediciones.length > 0 && ediciones[0].libro) {
    const column = { field: 'libro', headerName: 'Libro', minWidth: 200, editable: false,
      renderCell: (data : any) => <Chip  label={ data.value.titulo} color="info" onClick={()=>navigate(`/libros/show/${data.value.id}`)} /> };
    // data.value.titulo
    columns.splice(1, 0, column);
  }

  return (
    <>
      <div style={{width: '100%' }}>
        {/* al DataGrid se le coloco una clase css '.MuiDataGrid-root .MuiDataGrid-cell' en el index.css para que las celdas saltaran de linea si no cabe el texto */}
        <DataGrid
          autoHeight
          disableSelectionOnClick
          hideFooterSelectedRowCount
          rows={ediciones}
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
