import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import { Typography, Button, Grid } from '@mui/material';
import { Copia, Edicion, Error400 } from '../../interfaces/index';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { getOnlyEdiciones } from '../../store/thunk/edicionThunk';
import { useEffect, useState } from 'react';
import { addCopia } from '../../store/thunk/copiaThunk';
import { MyTextInput } from '../customInputs/MyTextInput';
import { MyAutocomplete } from '../customInputs/MyAutocomplete';

const defaultValues: Copia = {
  edicion_id: null,
  codigo: '',
  serial: ''
};
const validationSchema =
  Yup.object({
    edicion_id: Yup.object().typeError('Algun elemento debe ser seleccionado'),
    codigo: Yup.string().trim().min(3, 'debe contener al menos 3 caracteres').max(50, 'Debe tener 50 caracteres o menos').required('Requerido'),
    serial: Yup.string().trim().min(3, 'debe contener al menos 3 caracteres').max(50, 'Debe tener 50 caracteres o menos').required('Requerido'),
});

export const CopiasAddScreen = () => {
  const formMethods = useForm<Copia>({ mode: 'all', defaultValues, resolver: yupResolver(validationSchema) })
  const { handleSubmit, setValue, setError, formState: { isValid, isDirty } } = formMethods;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [edicionesFormateado, setEdicionesFormateado] = useState<{id: number, label: string}[]>([]);
  const {ediciones, cargando:cargandoEdiciones} = useAppSelector(state => state.ediciones);
  const {cargando} = useAppSelector(state => state.copias);

  useEffect(() => {
    dispatch(getOnlyEdiciones());
  }, [dispatch]);

  useEffect(() => {
    if (ediciones && ediciones.length > 0) {
      const formateado = ediciones.map(({id, nombre}: Edicion) => ({id: id || 0, label:nombre })) ||[];
      setEdicionesFormateado(formateado);
    }
  }, [ediciones])

  const onSubmit = async (data: any) => {
    try {
      // esto lo hago por que el autocomplete me guarda un object de id y label, el backend me pide un number, no un objecto
      data.edicion_id = data.edicion_id.id || null;
      await dispatch(addCopia(data)).unwrap();
      enqueueSnackbar('Operacion Exitosa', {variant: 'success', anchorOrigin: { horizontal: 'center', vertical: 'top'}});
      navigate('/copias');
    } catch (error: any) {
      enqueueSnackbar('ha ocurrido un problema', { variant: 'error', anchorOrigin: { horizontal: 'center', vertical: 'top'}});
      if (error && error.errors) {
        const errors: [] = error.errors || [];
        errors.forEach(({msg, param }: Error400) => {
          setError( (param as keyof Copia), { type: "manual", message: msg});
        })
      }
    }
  }
  

  return (
    <Box >
      <Typography align='center' variant='h5' mb={2} >Nueva Copia</Typography>
      <FormProvider {...formMethods} >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>

            <Grid item md={4} xs={12} >
              {
                (edicionesFormateado.length > 0) &&
                  <MyAutocomplete label={'Edicion'} name={'edicion_id'} placeholder='Seleccione edicion' options={edicionesFormateado}/>
              }
            </Grid>
            <Grid item md={4} xs={12} >
              <MyTextInput label={'Ingrese el código'} name={'codigo'} placeholder='Ingrese el código' maxLength={12} />
            </Grid>
            <Grid item md={4} xs={12} >
              <MyTextInput label={'Ingrese el serial'} name={'serial'} placeholder='Ingrese el serial' maxLength={12} />
            </Grid>

          </Grid>
          <Box textAlign='center'>
              <Button type='submit' size='large'  variant="contained"
                disabled={!(isValid && isDirty) || cargando}
              >
                Guardar
              </Button> 
            </Box>
        </form>
      </FormProvider>
    </Box>
  )
}