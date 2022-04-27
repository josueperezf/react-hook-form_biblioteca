import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Grid, Button } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CambioPassword, Error400 } from '../../interfaces/index';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { useForm, FormProvider } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { updateUsuarioPass } from '../../store/thunk/usuarioThunk';
import { MyTextInput } from '../customInputs/MyTextInput';

export interface Props {
  open: boolean;
  onClose: (value: boolean) => void;
}
const defaultValues: CambioPassword = {
  id: 0,
  password: '',
  newPassword: '',
  confirm: ''
};

const validationSchema = Yup.object({
  password: Yup.string().trim().min(6, 'debe contener al menos 6 caracteres').max(10, 'Debe tener 10 caracteres o menos').required('Requerido'),
  newPassword: Yup.string().trim().min(6, 'debe contener al menos 6 caracteres').max(10, 'Debe tener 10 caracteres o menos').required('Requerido'),
  confirm: Yup.string().trim().min(6, 'debe contener al menos 6 caracteres').max(10, 'Debe tener 10 caracteres o menos').required('Requerido')
            .oneOf([Yup.ref('newPassword'), null], 'Nuevo password y confirmar deben ser iguales')
});

export const UsuariosEditPassDialog = ({onClose, open}: Props) => {
  const formMethods = useForm<CambioPassword>({ mode: 'all', defaultValues, resolver: yupResolver(validationSchema) })
  const { handleSubmit, setError, reset, formState: { isValid, isDirty } } = formMethods;
  const {usuario} = useAppSelector(state => state.auth);
  const {cargando, error} = useAppSelector(state => state.usuarios);

  useEffect(() => {
    if (open && usuario && usuario.id) {
      const data = {...defaultValues, id: usuario.id, };
      reset(data)
    }
    console.log('abrio');
    
  }, [open])
  
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    onClose(false);
  };
  const llamarCerrarSesion = () => {
    onClose(true);
  };
  const onSubmit = async (cambioPassword: CambioPassword) => {        
    try {
      const data = {...cambioPassword};
      delete data.confirm;
      await dispatch(updateUsuarioPass(data)).unwrap();
      enqueueSnackbar('Operacion Exitosa', {variant: 'success', anchorOrigin: { horizontal: 'center', vertical: 'top'}});
      llamarCerrarSesion();
    } catch (error: any) {
      enqueueSnackbar('ha ocurrido un problema', { variant: 'error', anchorOrigin: { horizontal: 'center', vertical: 'top'}});
      if (error && error.errors) {
        const errors: [] = error.errors || [];
        errors.forEach(({msg, param }: Error400 ) => {
          setError( (param as keyof CambioPassword), {type: "manual", message: msg});
        })
      }
    }
  }
  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xs">
      <DialogTitle >Editar Usuario</DialogTitle>
      <DialogContent dividers>
        <FormProvider {...formMethods} >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
              <Grid item md={12} xs={12} >
                <MyTextInput  label={'Ingrese su password actual'} name={'password'} type='password' placeholder='Ingrese su password actual' maxLength={10} />
              </Grid>
              <Grid item md={12} xs={12} >
                <MyTextInput  label={'Ingrese su nuevo Password'} name={'newPassword'} type='password' placeholder='Ingrese su nuevo Password' maxLength={10} />
              </Grid>
              <Grid item md={12} xs={12} >
                <MyTextInput  label={'confirme su nuevo Password'} name={'confirm'} type='password' placeholder='confirme su nuevo Password' maxLength={10} />
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </DialogContent>
      <DialogActions >
        <Box textAlign='center'>
          <Button type='submit' size='large'  variant="contained" onClick={handleSubmit(onSubmit)} disabled={!(isValid && isDirty) || cargando}>
            Guardar
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}
