import { Usuario } from '../../interfaces/index';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { formatRut } from '../../helpers/formatRut';
import { Box } from '@mui/system';

interface Props {
    usuarios: Usuario[]
}
export const UsuariosList = ({usuarios}: Props) => {
  const [pageSize, setPageSize] = useState<number>(50);
  const [usuarioFormateado, setUsuarioFormateado] = useState<Usuario[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (usuarios.length > 0) {
      const data:Usuario[] = usuarios.map(({persona, ...rest}: Usuario) => ({dni: persona?.dni || 0, nombre: persona?.nombre || '' , ...rest  }));
      setUsuarioFormateado(data);
    }
  }, [usuarios])
  
  
  const columns: GridColDef[] = [
      { field: 'dni', headerName: 'DNI', minWidth: 200, editable: false, valueFormatter: (data: any)=> formatRut(data.value ) },
      { field: 'nombre', headerName: 'Nombre', minWidth: 200, editable: false },
      { field: 'login', headerName: 'Login', minWidth: 200, editable: false, flex: 1 },
      { field: 'print', headerName: 'Acciones', disableExport: true, minWidth: 120, sortable: false, filterable: false, disableColumnMenu: true,
      renderCell: (cellValues) => {
        return (
          <Box textAlign={'center'} width={'100%'}>
            <Button
              variant="contained"
              color="primary"
              size='small'
              startIcon={<EditIcon fontSize='small' />}
              onClick={() => {
                navigate(`/usuarios/edit/${cellValues.id}`);
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
          rows={usuarioFormateado}
          columns={columns}
          pagination
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[50, 80, 100]}
        />
      </div>
    </>
  )
}
