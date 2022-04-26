import { Box, Typography, Button, Grid, CircularProgress, Alert } from '@mui/material';
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Usuario, Error400, Persona } from '../../interfaces/index';
import { addUsuario } from '../../store/thunk/usuarioThunk';
import { MyTextInput } from '../customInputs/MyTextInput';
// import { BuscarPersonaDNI } from './BuscarPersonaDNI';
import { useState, useEffect } from 'react';
import { BuscarPersonaPorDNI } from '../personas/BuscarPersonaPorDNI';

const defaultValues: Usuario = {
  login: '',
  password: '',
  persona_id: 0
}

const validationSchema =
  Yup.object({
    login: Yup.string().email('debe ser un correo valido').trim().min(3, 'debe contener al menos 3 caracteres').max(50, 'Debe tener 50 caracteres o menos').required('Requerido'),
    password: Yup.string().trim().min(6, 'debe contener al menos 6 caracteres').max(50, 'Debe tener 50 caracteres o menos').required('Requerido'),
    persona_id: Yup.string().notOneOf(['0']).required('Requerido'),
});

export const UsuariosAddScreen = () => {
  const formMethods = useForm<Usuario>({ mode: 'all', defaultValues, resolver: yupResolver(validationSchema) })
  const { handleSubmit, setValue, reset, setError, formState: { isValid } } = formMethods;
  const [persona, setPersona] = useState<Persona | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {token, cargando} = useAppSelector(state => state.auth);

  useEffect(() => {
    setPersona(null);
  }, [])
  

  const onSubmit = async (data: any) => {
    if (!isValid) return;
    try {
      await dispatch(addUsuario(data)).unwrap();
      enqueueSnackbar('Bienvenido al sistema', {variant: 'success', anchorOrigin: { horizontal: 'center', vertical: 'top'}});
      if (token) {
        navigate('/usuarios');
      }
    } catch (error: any) {
      enqueueSnackbar('Ha ocurrido un problema', { variant: 'error', anchorOrigin: { horizontal: 'center', vertical: 'top'}});
      if (error && error.errors) {
        const errors: [] = error.errors || [];
        errors.forEach(({msg, param }: Error400) => {
          console.log(param);
          
          setError( (param as keyof Usuario), {
            type: "manual",
            message: msg,
          });
        })
      }
    }
  }
  const fn = (persona: Persona | null) => {
    setPersona(persona);
    (persona && persona.id)
      ? setValue('persona_id', persona.id)
      : reset(defaultValues);
  }

  return (
    <Box >
      <Typography align='center' variant='h5' mb={2} >Nuevo Usuario</Typography>
      <Box mt={4}>
        <Grid container spacing={1} justifyContent="center" mb={3}>
          <Grid item md={6} xs={12}   >
            <BuscarPersonaPorDNI fn={fn} tipo='sin-cuenta-usuario' />
          </Grid>
        </Grid>
        <FormProvider {...formMethods} >
          <form onSubmit={handleSubmit(onSubmit)}>
            {
              (persona) &&
              <>
                <Grid container spacing={3}>
                  <Grid item md={4} xs={12} >
                      <Box mb={2}>
                        <Alert severity="success" variant="outlined" style={{height: '54px'}}>
                          <b>Persona: </b> {persona.nombre}
                        </Alert>
                      </Box>
                  </Grid>
                  <Grid item md={4} xs={12} >
                    <MyTextInput label={'Login o Correo'} name={'login'} placeholder='Login o Correo' maxLength={30} disabled={persona === null} />
                  </Grid>
                  <Grid item md={4} xs={12} >
                    <MyTextInput label={'Password o Clave'} name={'password'} type='password' placeholder='Password o Clave' maxLength={20} disabled={persona === null}/>
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
