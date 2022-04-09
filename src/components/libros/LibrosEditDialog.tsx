import { Box, Dialog, DialogTitle, Grid, Button, DialogContent, DialogActions } from '@mui/material';
import * as Yup from 'yup';
import { Libro, Error400 } from '../../interfaces/index';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useSnackbar } from 'notistack';
import { getLibroForEdit, updateLibro } from '../../store/thunk/libroThunk';
import { MyTextInput, MyAutocomplete } from '../customInputs';
import { memo, useEffect, useState } from 'react';
import { getAutores } from '../../store/thunk/autorThunk';

const defaultValues: Libro = {
  titulo: '',
  autores: [] // null si se quisiera como el automcomplete no multiple y valor inicial sin seleccion
};

const validationSchema = Yup.object({
    titulo: Yup.string().trim().min(3, 'debe contener al menos 3 caracteres').max(50, 'Debe tener 50 caracteres o menos').required('Requerido'),
    autores: Yup.array().min(1, 'Al menos un autor debe ser seleccionado')
});

export interface LibrosEditDialogProps {
  id: number,
  open: boolean;
  selectedValue?: string | any;
  onClose: (value: boolean) => void;
}

export const LibrosEditDialog = memo((props: LibrosEditDialogProps) => {
  const { onClose, open, id } = props;
  const {autores} = useAppSelector(state => state.autores);
  const {cargandoEnDialog, libro} = useAppSelector(state => state.libros);
  const [autoresFormateados, setAutoresFormateados] = useState<{id: number, label: string}[]>([]);
  const formMethods = useForm<Libro>({ mode: 'all', defaultValues, resolver: yupResolver(validationSchema) })
  const { handleSubmit, setError, reset, formState: { isValid } } = formMethods;
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (open && id) {
      (autores.length === 0) && dispatch(getAutores());
      dispatch(getLibroForEdit(id));
    }
  }, [open]);

  useEffect(() => {
    if (autores && autores.length > 0) {
      // formatear para  autores
      const formateado = autores.map(({id, nombre}) => ({id: id || 0, label:nombre })) ||[] 
      setAutoresFormateados(formateado);
    }
  }, [autores]);

  useEffect(() => {
    if (libro) {
      const data = {...libro};
      data.autores = data.autores.map(({id, nombre}: {id: number, nombre: string})=> ({id, label: nombre}));
      reset(data);
      // trigger();
    }
  }, [libro])

  const onSubmit = async (data: any) => {        
    try {
      // esto lo hago por que el autocomplete me guarda un array con object de id y label del autor, el backend me pide un array de id, no un array de objectos
      data.autores = data.autores.map(({id}: {id: number}) => (id) );
      await dispatch(updateLibro(data));
      enqueueSnackbar('Operacion Exitosa', {variant: 'success', anchorOrigin: { horizontal: 'center', vertical: 'top'}});
      updateBookList();
    } catch (error: any) {
      enqueueSnackbar('ha ocurrido un problema', { variant: 'error', anchorOrigin: { horizontal: 'center', vertical: 'top'}});
      if (error && error.errors) {
        const errors: [] = error.errors || [];
        errors.forEach(({msg, param }: Error400) => {
          setError( (param as keyof Libro), {
            type: "manual",
            message: msg,
          });
        })
      }
    }
  }

  const handleClose = () => {
    onClose(false);
  };

  const updateBookList = () => {
    onClose(true);
  };

  return (
    (autoresFormateados.length > 0) ?
    <Dialog onClose={handleClose} open={open} maxWidth='xl'>
      <DialogTitle >Editar Libro</DialogTitle>
      <FormProvider {...formMethods} >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Grid container spacing={3} pt={2}>

              <Grid item md={12} xs={12} >
                <MyTextInput  label={'Ingrese el titulo del libro'} mayuscula name={'titulo'} placeholder='Ingrese el titulo del libro' maxLength={50}/>
              </Grid>

              <Grid item md={12} xs={12} >
                <MyAutocomplete label={'Autores'} name={'autores'} multiple placeholder='Seleccione autores' options={autoresFormateados}/>
              </Grid>

            </Grid>
          </DialogContent>
          <DialogActions>
            <Box textAlign='center'>
              <Button type='submit' size='large'  variant="contained"
                disabled={!(isValid) || cargandoEnDialog}
              >
                Guardar
              </Button> 
            </Box>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
    : <b>Cargando... </b>
  );
})
