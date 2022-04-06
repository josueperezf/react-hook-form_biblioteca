import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import { subYears } from 'date-fns';
import * as Yup from 'yup';
import { getPaises } from '../../store/thunk/paisThunk';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { Autor, Error400, Pais } from '../../interfaces/index';
import { getAutor, updateAutor } from '../../store/thunk/autorThunk';
import Box from '@mui/material/Box';
import { Typography, Grid, Button } from '@mui/material';
import { MyTextInput } from '../customInputs/MyTextInput';
import { MyDatePicker } from '../customInputs/MyDatePicker';
import { MySelect, Option } from '../customInputs/MySelect';

const defaultValues: Autor = {
  biografia: '',
  fecha_nacimiento: '',
  nombre: '',
  pais_id: 0,
};
const maxDate = subYears( new Date(), 18);
const minDate = subYears( new Date(), 800);

const validationSchema =
  Yup.object({
    nombre: Yup.string().trim().min(3, 'debe contener al menos 3 caracteres').max(50, 'Debe tener 50 caracteres o menos').required('Requerido'),
    fecha_nacimiento : Yup.date().typeError("Fecha no Valida").max(maxDate, "fecha minima no permitida").min(minDate, "fecha maxima no permitida").required('Requerido'),
    pais_id:  Yup.number().required('Requerido').notOneOf([0], 'Algun elemento debe ser seleccionado'),
    biografia : Yup.string().trim().min(6, 'debe contener al menos 6 caracteres').max(250, 'Debe tener 250 caracteres o menos').required('Requerido'),
});

export const AutoresEditScreen = () => {
  const formMethods = useForm<Autor>({ mode: 'all', defaultValues, resolver: yupResolver(validationSchema) })
  const { handleSubmit, setError, reset, trigger, formState: { isValid } } = formMethods;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = parseInt(params.id || '') ;
  const {paises, cargando: cargandoPaises} = useAppSelector(state => state.paises);
  const {autor, cargando: cargandoAutor} = useAppSelector(state => state.autores);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const cargarData = async () => {
      if (id && (typeof id != "string")) {
        try {
          await Promise.all([
            dispatch(getPaises()).unwrap(),
            dispatch(getAutor(id)).unwrap()
          ]);
        } catch (error) {
          navigate('/autores')
        }
      } else {
        navigate('/autores')
      }
    }
    cargarData();
  }, [dispatch]);

  useEffect(() => {
    if (autor && Object.keys(autor).length > 0) {
      reset(autor);
      trigger();
    }
  }, [autor])
  

  const formatearOptionsSelectPais = (paises:Pais[]): Option[] => {
    return [ {'id': 0, text: 'Seleccione'}, ...paises.map((pais: Pais) =>({id: pais.id, text: pais.nombre}) )];
  }
  
  const onSubmit = async (data: any) => {
    try {
      await dispatch(updateAutor(data)).unwrap();
      enqueueSnackbar('Operacion Exitosa', {variant: 'success', anchorOrigin: { horizontal: 'center', vertical: 'top'}});
      navigate('/autores');
    } catch (error: any) {
      enqueueSnackbar('ha ocurrido un problema', { variant: 'error', anchorOrigin: { horizontal: 'center', vertical: 'top'}});
      if (error && error.errors) {
        const errors: [] = error.errors || [];
        errors.forEach(({msg, param }: Error400) => {
          setError( (param as keyof Autor), {
            type: "manual",
            message: msg,
          });
        })
      }
    }
  }
  return (
    <Box >
      <Typography align='center' variant='h5' mb={2} >Editar Autor</Typography>
      <FormProvider {...formMethods} >
        {
          (autor && Object.keys(autor).length > 0 && !cargandoAutor ) && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>

                <Grid item md={4} xs={12} >
                  <MyTextInput  label={'Ingrese Nombre'} mayuscula name={'nombre'} placeholder='Ingrese su nombre' maxLength={50}/>
                </Grid>
                <Grid item md={4} xs={12} >
                  <MyDatePicker name="fecha_nacimiento" label={'Fecha de Nacimiento'} maxDate={maxDate} minDate={minDate} />
                </Grid>
                <Grid item md={4} xs={12} >
                  {
                    (paises && paises.length > 0) &&
                      <MySelect label={'Pais'}  name={'pais_id'} placeholder='Seleccione su pais de nacimiento' options={ formatearOptionsSelectPais(paises)} />
                  }
                </Grid>
                <Grid item md={12} xs={12} >
                  <MyTextInput type='text' label={'Ingrese biografia'}  name={'biografia'} placeholder='Ingrese biografia' maxLength={250}/>
                </Grid>

              </Grid>
              <Box mt={3} textAlign='center'>
                <Button type='submit' size='large'  variant="contained" disabled={!(isValid)} >Guardar</Button> 
              </Box>
            </form>
          )
        }
      </FormProvider>
    </Box>
  )
}
