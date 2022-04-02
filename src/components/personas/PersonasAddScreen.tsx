import { useEffect } from 'react';
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import { Typography, Button, Grid } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { MyTextInput, MyDatePicker } from '../customFormik';
import { telefonoRegExp } from '../../helpers/expresionesRegulares';
import { RutValidator } from '../../validators/rut.validator';
import { getPaises } from '../../store/thunk/paisThunk';
import { Persona, Error400 } from '../../interfaces/index';
import { formatRut } from '../../helpers/formatRut';
import { subYears } from 'date-fns/esm';
import { addPersona } from '../../store/thunk/personaThunk';
import { useNavigate } from 'react-router-dom';
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
    nombre: Yup.string().trim().min(3, 'debe contener al menos 3 caracteres').max(15, 'Debe tener 15 caracteres o menos').required('Requerido'),
    telefono: Yup.string().trim().matches(telefonoRegExp, 'Debe ser un numero valido').required('Requerido'),
    // pais_id:  Yup.number().required('Requerido'),
    direccion : Yup.string().trim().min(6, 'debe contener al menos 6 caracteres').max(100, 'Debe tener 100 caracteres o menos').required('Requerido'),
    fecha_nacimiento : Yup.date().typeError("Fecha no Valida").max(maxDate, "fecha minima no permitida").min(minDate, "fecha maxima no permitida").required('Requerido')
});

export const PersonasAddScreen = () => {
  const formMethods = useForm<Persona>({ mode: 'all', defaultValues, resolver: yupResolver(validationSchema) })
  const { handleSubmit, setValue, setError, formState: { isValid, isDirty } } = formMethods;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    dispatch(getPaises());
  }, [dispatch]);

  const {paises, cargando: cargandoPaises} = useAppSelector(state => state.paises);

  const onSubmit = async (data: any) => {
    try {
      await dispatch(addPersona(data)).unwrap();
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
      <Typography align='center' variant='h5' mb={2} >Nueva Persona</Typography>
      <FormProvider {...formMethods} >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12} >
              <MyTextInput label={'Ingrese su DNI'} name={'dni'} placeholder='Ingrese su DNI' maxLength={12} onChange={ formatearInputRut } />
            </Grid>

            <Grid item md={4} xs={12} >
              <MyTextInput  label={'Ingrese Nombre'} mayuscula name={'nombre'} placeholder='Ingrese su nombre' maxLength={15}/>
            </Grid>

            <Grid item md={4} xs={12} >
              <MyTextInput  label={'Ingrese su telefono'} name={'telefono'} numero='entero' placeholder='Ingrese su telefono' maxLength={12} />
            </Grid>

            {/* <Grid item md={4} xs={12} >
              {
                (!cargandoPaises && paises.length > 0) && (
                  <FastField name="pais_id" placeholder="F">
                  {({ field, form, meta }: {field:any, form:any, meta:any}) => (
                    <TextField
                      {...field}
                      select
                      label='Pais'
                      fullWidth
                      defaultValue={192}
                    >

                      {
                        paises.map(({id, nombre}) => (
                          <MenuItem value={id} key={id} >{nombre}</MenuItem>
                        ))
                      }
                    </TextField>
                    )}
                  </FastField>
                )
              }
            </Grid> */}
    
            <Grid item md={4} xs={12} >
              <MyTextInput label={'Ingrese su direccion'} name={'direccion'} placeholder='Ingrese su direccion' maxLength={100} />
            </Grid>

            <Grid item md={4} xs={12} >
              <MyDatePicker name="fecha_nacimiento" label={'Fecha de Nacimiento'} maxDate={maxDate} minDate={minDate} />
            </Grid>
            
          </Grid>

          <Box mt={3} textAlign='center'>
            <Button type='submit' size='large'  variant="contained" disabled={!(isValid && isDirty)} >Guardar</Button> 
          </Box>
        </form>
      </FormProvider>
    </Box>
  )
}
