import { useEffect } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import { Typography, Button, Grid } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { MyTextInput, MyDatePicker } from '../customInputs';
import { telefonoRegExp } from '../../helpers/expresionesRegulares';
import { RutValidator } from '../../validators/rut.validator';
import { Persona, Error400 } from '../../interfaces/index';
import { formatRut } from '../../helpers/formatRut';
import { subYears } from 'date-fns/esm';
import { getPersona, updatePersona } from '../../store/thunk/personaThunk';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const defaultValues: Persona = {
  dni: '',
  nombre: '',
  direccion: '',
  telefono: '',
  fecha_nacimiento: null,
};

const maxDate = subYears( new Date(), 18);
const minDate = subYears( new Date(), 100);

const validationSchema =
  Yup.object({
    dni: Yup.string().trim().uppercase().min(6, 'debe contener al menos 6 caracteres').max(15, 'Debe tener 15 caracteres o menos').required('Requerido')
    .test('ValidarRut', 'Debe ser Rut valido',
      value =>  RutValidator(value ||  '' )
    ),
    nombre: Yup.string().trim().min(3, 'debe contener al menos 3 caracteres').max(50, 'Debe tener 50 caracteres o menos').required('Requerido'),
    telefono: Yup.string().trim().matches(telefonoRegExp, 'Debe ser un numero valido').required('Requerido'),
    direccion : Yup.string().trim().min(6, 'debe contener al menos 6 caracteres').max(100, 'Debe tener 100 caracteres o menos').required('Requerido'),
    fecha_nacimiento : Yup.date().typeError("Fecha no Valida").max(maxDate, "fecha minima no permitida").min(minDate, "fecha maxima no permitida").required('Requerido')
});

export const PersonasEditScreen = () => {
  const formMethods = useForm<Persona>({ mode: 'all', defaultValues, resolver: yupResolver(validationSchema) })
  const { handleSubmit, setValue, trigger, setError, reset, formState: { isValid } } = formMethods;
  
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const id = parseInt(params.id || '') ;
  const {persona, cargando} = useAppSelector(state => state.personas);

  useEffect(() => {
    const cargarData = async () => {
      if (id && (typeof id != "string")) {
        try {
          await dispatch(getPersona(id)).unwrap();
        } catch (error) {
          navigate('/personas');
        }
      } else {
        navigate('/personas');
      }
    }
    cargarData();
  }, [id]);

  useEffect(() => {
    const resetValues = async () => {
      if (persona && Object.keys(persona).length > 0) {
        reset(persona);
        // la siguiente es para llamar a todas las validaciones, nota esto llama a las validaciones pero no hace un touched en los inputs
        trigger();
        setValue('dni', formatRut(persona.dni))
      }
    }
    resetValues();
  }, [persona])
  


  const onSubmit = async (persona: Persona) => {
    try {
      await dispatch(updatePersona(persona)).unwrap();
      enqueueSnackbar('Operacion Exitosa', {variant: 'success', anchorOrigin: { horizontal: 'center', vertical: 'top'}});
      navigate('/personas');
    } catch (error: any) {
      enqueueSnackbar('ha ocurrido un problema', { variant: 'error', anchorOrigin: { horizontal: 'center', vertical: 'top'}});
      if (error && error.errors) {
        const errors: [] = error.errors || [];
        errors.forEach(({msg, param }: Error400) => {
          setError( (param as keyof Persona), {
            type: "manual",
            message: msg,
          });
        })
      }
    }
  }
  const formatearInputRut = (e: React.FormEvent<HTMLInputElement> | any) => {
    setValue(e.target.name, formatRut(e.target.value));
  }

  return (
    <Box >
      <Typography align='center' variant='h5' mb={2} >Editar Persona</Typography>
      <FormProvider {...formMethods} >
        {
          (persona && Object.keys(persona).length > 0 && !cargando) && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item md={4} xs={12} >
                  <MyTextInput label={'Ingrese su DNI'} name={'dni'} placeholder='Ingrese su DNI' maxLength={12} onChange={ formatearInputRut } />
                </Grid>

                <Grid item md={4} xs={12} >
                  <MyTextInput  label={'Ingrese Nombre'} mayuscula name={'nombre'} placeholder='Ingrese su nombre' maxLength={50}/>
                </Grid>

                <Grid item md={4} xs={12} >
                  <MyTextInput  label={'Ingrese su telefono'} name={'telefono'} numero='entero' placeholder='Ingrese su telefono' maxLength={12} />
                </Grid>

                <Grid item md={4} xs={12} >
                  <MyTextInput label={'Ingrese su direccion'} name={'direccion'} placeholder='Ingrese su direccion' maxLength={100} />
                </Grid>

                <Grid item md={4} xs={12} >
                  <MyDatePicker name="fecha_nacimiento" label={'Fecha de Nacimiento'} maxDate={maxDate} minDate={minDate} />
                </Grid>
                
              </Grid>

              <Box mt={3} textAlign='center'>
                <Button type='submit' size='large'  variant="contained" disabled={!isValid || cargando} >Guardar</Button> 
              </Box>
            </form>
          )
        }
      </FormProvider>
    </Box>
  )
}
