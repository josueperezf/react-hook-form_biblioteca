import { DataGrid, GridColDef, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useAppSelector } from '../../hooks/useRedux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import { Box, Button, Grid } from '@mui/material';
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

export const PersonasList = () => {
    const {personas} = useAppSelector(state => state.personas);
    const [pageSize, setPageSize] = useState<number>(5);
    const navigate = useNavigate()
    /**
     * he notado que para el filtrar solo toma la data principal, por ejemplo
     * si tengo un objeto como persona con {id, nombre, apellido, usuario}, siendo usuario del tipo Usuario que tiene login password y demas,
     * pero quiero que en el buscador aparezca el login. con un valueFormatter o cualquier otro lo puedo hacer,
     * pero al momento de hacer la busqueda, que el mismo datagrid tiene,
     * al colocar ejemplo 'josueperezf', no me consigue nada,
     * ya que me busca por la data princial, no busca en login ya que este pertenece a usuario:Usuario,
     * posible solucion, una formatear la data al recibirla, y no mostrar el objeto persona si no el objeto personaFormateado,
     * otra opcion seria investigar si se puede customizar la busqueda, pero no se como hacerlo por ahora
     * 
     * nota: en el componente UsuariosList deje un ejemplo de como hacerlo segun la primera opcion
     */
    const columns: GridColDef[] = [
        { field: 'dni', headerName: 'DNI', minWidth: 150, disableColumnMenu: true, valueFormatter: (data : any) =>  formatRut(data.value) },
        { field: 'nombre', headerName: 'Nombre', minWidth: 200, editable: false, flex: 1 },
        { field: 'fecha_nacimiento', headerName: 'Fecha de Nac.', minWidth: 120, valueFormatter: (data : any) =>  format(new Date (data.value), "dd-MM-yyyy" ) },
        { field: 'print', headerName: 'Acciones', disableExport: true, minWidth: 120, sortable: false, filterable: false, disableColumnMenu: true,
        renderCell: (cellValues) => {
          return (
            <Box textAlign={'center'} width={'100%'}>
              <Button variant="contained" color="primary" size='small' startIcon={<EditIcon fontSize='small' />}
                onClick={() => {
                  navigate(`/personas/edit/${cellValues.id}`);
                }}
              >
                Editar
              </Button>
            </Box>
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
