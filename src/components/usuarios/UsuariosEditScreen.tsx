import { Box, Typography, Button, Grid, CircularProgress, Alert } from '@mui/material';
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Usuario, Error400 } from '../../interfaces/index';
import { getUsuario, updateUsuario } from '../../store/thunk/usuarioThunk';
import { MyTextInput } from '../customInputs/MyTextInput';
import { useEffect } from 'react';

const defaultValues: Usuario = {
  login: '',
  persona_id: 0,
  tipo_usuario_id: 0,
}

const validationSchema =
  Yup.object({
    login: Yup.string().email('debe ser un correo valido').trim().min(3, 'debe contener al menos 3 caracteres').max(50, 'Debe tener 50 caracteres o menos').required('Requerido'),
});

export const UsuariosEditScreen = () => {
  const formMethods = useForm<Usuario>({ mode: 'all', defaultValues, resolver: yupResolver(validationSchema) })
  const { handleSubmit, setValue, reset, trigger, setError, formState: { isValid } } = formMethods;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {usuario, cargando} = useAppSelector(state => state.usuarios);
  const params = useParams();
  const id = parseInt(params.id || '') ;

  useEffect(() => {
    const cargarData = async () => {
      if (id && (typeof id != "string")) {
        try {
          await dispatch(getUsuario(id)).unwrap();
        } catch (error) {
          navigate('/usuarios');
        }
      } else {
        navigate('/usuarios');
      }
    }
    cargarData();
  }, [id]);

  useEffect(() => {
    const resetValues = async () => {
      if (usuario && Object.keys(usuario).length > 0) {
        const { login, tipo_usuario_id, persona_id} = usuario;
        reset({id, login, tipo_usuario_id, persona_id});
        // la siguiente es para llamar a todas las validaciones, nota esto llama a las validaciones pero no hace un touched en los inputs
        trigger();
      }
    }
    resetValues();
  }, [usuario])
  

  const onSubmit = async (data: any) => {
    if (!isValid) return;
    try {
      await dispatch(updateUsuario(data)).unwrap();
      enqueueSnackbar('Operacion exitosa', {variant: 'success', anchorOrigin: { horizontal: 'center', vertical: 'top'}});
      navigate('/usuarios');
    } catch (error: any) {
      enqueueSnackbar('Ha ocurrido un problema', { variant: 'error', anchorOrigin: { horizontal: 'center', vertical: 'top'}});
      if (error && error.errors) {
        const errors: [] = error.errors || [];
        errors.forEach(({msg, param }: Error400) => {
          setError( (param as keyof Usuario), {type: "manual", message: msg});
        })
      }
    }
  }

  return (
    <Box >
      <Typography align='center' variant='h5' mb={2} >Editar login de Usuario</Typography>
      <Box mt={4}>
        <FormProvider {...formMethods} >
          <form onSubmit={handleSubmit(onSubmit)}>
            {
              (usuario) &&
              <>
                <Grid container spacing={3}>
                  <Grid item md={4} xs={12} >
                      <Box mb={2}>
                        <Alert severity="success" variant="outlined" style={{height: '54px'}}>
                          <b>Persona: </b> {usuario.persona?.nombre}
                        </Alert>
                      </Box>
                  </Grid>
                  <Grid item md={4} xs={12} >
                    <MyTextInput label={'Login o Correo'} name={'login'} placeholder='Login o Correo' maxLength={30} />
                  </Grid>
                </Grid>
                <Box mt={3} textAlign='center'>
                  <Button type='submit' size='large'  variant="contained" onClick={handleSubmit(onSubmit)} disabled={(!isValid || cargando )} >
                    {(cargando) && <><CircularProgress size={'16px'} />&nbsp;</>}
                    Guardar
                  </Button>
                </Box>
            </>
            }
          </form>
        </FormProvider>
      </Box>
    </Box>
  )
}
