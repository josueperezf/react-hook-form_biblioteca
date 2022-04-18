import React from 'react'
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridColDef, DataGrid } from '@mui/x-data-grid';
import { useAppSelector } from '../../hooks/useRedux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
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
    { field: 'idioma', headerName: 'Idioma', editable: false, valueFormatter: (data : any) => data.value.nombre },
    // { field: 'libro', headerName: 'Libro', minWidth: 200, editable: false, valueFormatter: (data : any) => data.value.titulo },
    { field: 'nombre', headerName: 'Nombre', minWidth: 200, editable: false, flex: 1 },
    { field: 'fecha', headerName: 'Fecha', width: 80, flex: 1, valueFormatter: (data : any) =>  format(new Date (data.value), "dd-MM-yyyy" ) },
    { field: 'print', headerName: 'Acciones', disableExport: true, width: 150, flex: 1, sortable: false, filterable: false, disableColumnMenu: true,
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
                navigate(`/ediciones/edit/${cellValues.id}`);
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

  /**
   * el siguiente if es por que utilizo este componente tanto en el edicionesScreen como en LibrosShowScreee,
   * en este ultimo no necesito la columna libro, por ende, no la tengo, asi que la agrego solo si la tengo,
   * esto ocurre solo cuando es llamado desde edicionesScreen
   */
  if (ediciones.length > 0 && ediciones[0].libro) {
    const column = { field: 'libro', headerName: 'Libro', minWidth: 200, editable: false, valueFormatter: (data : any) => data.value.titulo };
    columns.splice(1, 0, column);
  }

  return (
    <>
      <div style={{height: 400, width: '100%' }}>
        <DataGrid
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
