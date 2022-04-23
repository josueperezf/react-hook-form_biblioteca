import { Box, CardActions, CardContent, Typography, Button, CardHeader, Card, Grid, CircularProgress, LinearProgress } from '@mui/material';
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { loginAuth } from '../../store/thunk/authThunk';
import { Error400, Auth } from '../../interfaces/index';
import { MyTextInput } from '../customInputs/MyTextInput';
import { LoadingButton } from '@mui/lab';

const defaultValues: Auth = {
  login: '',
  password: ''
}

const validationSchema =
  Yup.object({
    login: Yup.string().email('debe ser un correo valido').trim().min(3, 'debe contener al menos 3 caracteres').max(50, 'Debe tener 50 caracteres o menos').required('Requerido'),
    password: Yup.string().trim().min(3, 'debe contener al menos 3 caracteres').max(50, 'Debe tener 50 caracteres o menos').required('Requerido'),
});

const LoginScreen = () => {
  const formMethods = useForm<Auth>({ mode: 'all', defaultValues, resolver: yupResolver(validationSchema) })
  const { handleSubmit, setValue, setError, formState: { isValid, isDirty } } = formMethods;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {token, cargando} = useAppSelector(state => state.auth);

  const onSubmit = async (data: any) => {
    try {
      await dispatch(loginAuth(data)).unwrap();
      enqueueSnackbar('Bienvenido al sistema', {variant: 'success', anchorOrigin: { horizontal: 'center', vertical: 'top'}});
      if (token) {
        navigate('/libros');
      }
    } catch (error: any) {
      enqueueSnackbar('Acceso denegado', { variant: 'error', anchorOrigin: { horizontal: 'center', vertical: 'top'}});
      if (error && error.errors) {
        const errors: [] = error.errors || [];
        errors.forEach(({msg, param }: Error400) => {
          setError( (param as keyof Auth), {
            type: "manual",
            message: msg,
          });
        })
      }
    }
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <FormProvider {...formMethods} >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card sx={{ minWidth: 350, boxShadow: 1 }}>
            <CardHeader sx={{ backgroundColor: 'primary.main', color: 'white', textAlign: 'center' }}title="Iniciar Sesion"/>
            <Box sx={{ width: '100%' }}>
              {(cargando) && <LinearProgress color='info' />}
            </Box>
            <CardContent>
              <Box mt={3}>
                <MyTextInput label={'Login o Correo'} name={'login'} placeholder='Login o Correo' maxLength={30} />
                <MyTextInput label={'Password o Clave'} name={'password'} placeholder='Password o Clave' maxLength={20} />
              </Box>
            </CardContent>
            <CardActions className='pl-16' >
              <Box ml={1} mr={1} width={'100%'}>
                <Grid container spacing={2}>
                  <Grid item md={6}  >
                    <Button fullWidth variant="contained" >Registrar</Button> 
                  </Grid>
                  <Grid item md={6}>
                    <Button type='submit' fullWidth variant="contained" disabled={!(isValid )} >
                      {(cargando) && <><CircularProgress size={'16px'} />&nbsp;</>}
                      Iniciar
                    </Button> 
                  </Grid>
                </Grid>
              </Box>
            </CardActions>
          </Card>
        </form>
      </FormProvider>
    </Box>
  )
}

export default LoginScreen