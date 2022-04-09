import { Box, Dialog, DialogTitle, Grid, Button, DialogContent, DialogActions } from '@mui/material';
import * as Yup from 'yup';
import { Libro, Error400 } from '../../interfaces/index';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useSnackbar } from 'notistack';
import { addLibro } from '../../store/thunk/libroThunk';
import { MyTextInput, MyAutocomplete } from '../customInputs';
import { useEffect, useState } from 'react';
import { getAutores } from '../../store/thunk/autorThunk';

const defaultValues: Libro = {
  titulo: '',
  autores: [] // null si se quisiera como el automcomplete no multiple y valor inicial sin seleccion
};

const validationSchema = Yup.object({
    titulo: Yup.string().trim().min(3, 'debe contener al menos 3 caracteres').max(50, 'Debe tener 50 caracteres o menos').required('Requerido'),
    autores: Yup.array().min(1, 'Al menos un autor debe ser seleccionado')
});

export interface LibrosAddDialogProps {
  open: boolean;
  selectedValue?: string | any;
  onClose: (value: boolean) => void;
}

export const LibrosAddDialog = (props: LibrosAddDialogProps) => {
  const { onClose, open } = props;
  const {autores} = useAppSelector(state => state.autores);
  const {cargandoEnDialog} = useAppSelector(state => state.libros);
  const [autoresFormateados, setAutoresFormateados] = useState<{id: number, label: string}[]>([]);
  const formMethods = useForm<Libro>({ mode: 'all', defaultValues, resolver: yupResolver(validationSchema) })
  const { handleSubmit, setError, reset, formState: { isValid, isDirty } } = formMethods;
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (open) {
      (autores.length === 0) && dispatch(getAutores());
      reset(defaultValues)
    }
  }, [open]);

  useEffect(() => {
    if (autores && autores.length > 0) {
      // formatear para  autores
      const formateado = autores.map(({id, nombre}) => ({id: id || 0, label:nombre })) ||[] 
      setAutoresFormateados(formateado);
    }
  }, [autores])
  
  

  const onSubmit = async (data: any) => {        
    try {
      // esto lo hago por que el autocomplete me guarda un array con object de id y label del autor, el backend me pide un array de id, no un array de objectos
      data.autores = data.autores.map(({id}: {id: number}) => (id) );
      await dispatch(addLibro(data)).unwrap();
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
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle >Nuevo Libro</DialogTitle>
      <FormProvider {...formMethods} >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Grid container spacing={3} pt={2}>

              <Grid item md={12} xs={12} >
                <MyTextInput  label={'Ingrese el titulo del libro'} mayuscula name={'titulo'} placeholder='Ingrese el titulo del libro' maxLength={50}/>
              </Grid>

              <Grid item md={12} xs={12} >
                {
                  (autoresFormateados.length > 0) &&
                    <MyAutocomplete label={'Autores'} name={'autores'} multiple placeholder='Seleccione autores' options={autoresFormateados}
                      onChange={(e)=>{console.log('entro al onchange'); console.log(e)}}
                    />
                }
              </Grid>

            </Grid>
          </DialogContent>
          <DialogActions>
            <Box textAlign='center'>
              <Button type='submit' size='large'  variant="contained"
                disabled={!(isValid && isDirty) || cargandoEnDialog}
              >
                Guardar
              </Button> 
            </Box>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
}
