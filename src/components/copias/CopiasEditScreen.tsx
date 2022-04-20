import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Copia, Error400, Edicion } from '../../interfaces/index';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { getOnlyEdiciones } from '../../store/thunk/edicionThunk';
import { getCopia, updateCopia } from '../../store/thunk/copiaThunk';
import Box from '@mui/material/Box';
import { Typography, Grid, Button } from '@mui/material';
import { MyAutocomplete } from '../customInputs/MyAutocomplete';
import { MyTextInput } from '../customInputs/MyTextInput';

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

export const CopiasEditScreen = () => {
  const formMethods = useForm<Copia>({ mode: 'all', defaultValues, resolver: yupResolver(validationSchema) })
  const { handleSubmit, setValue, reset, trigger, setError, formState: { isValid, isDirty } } = formMethods;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [edicionesFormateado, setEdicionesFormateado] = useState<{id: number, label: string}[]>([]);
  const {ediciones, cargando:cargandoEdiciones} = useAppSelector(state => state.ediciones);
  const {copia, cargando} = useAppSelector(state => state.copias);
  const params = useParams();
  const id = parseInt(params.id || '') ;

  useEffect(() => {
    const cargarData = async () => {
      if (id && (typeof id != "string")) {
        try {
          await Promise.all([
            dispatch(getCopia(id)),
            dispatch(getOnlyEdiciones())
          ]);
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
    if (copia && Object.keys(copia).length > 0) {
      const data = {...copia};
      (data.edicion && data.edicion.id) && (data.edicion_id = {id: data.edicion.id, label: data.edicion.nombre });
      // el backend me retorna mas data de la que necesito, asi que elimino la que no necesito
      delete data?.estado;
      delete data?.prestamos;
      delete data?.edicion;
      reset(data);
      // la siguiente es para llamar a todas las validaciones, nota esto llama a las validaciones pero no hace un touched en los inputs
    }
  }, [copia]);

  useEffect(() => {
    if (ediciones && ediciones.length > 0 && !cargandoEdiciones) {
      const formateado = ediciones.map(({id, nombre}: Edicion) => ({id: id || 0, label:nombre })) ||[];
      setEdicionesFormateado(formateado);
    }
  }, [ediciones])

  const onSubmit = async (data: any) => {
    try {
      // esto lo hago por que el autocomplete me guarda un object de id y label, el backend me pide un number, no un objecto
      data.edicion_id = data.edicion_id.id || null;
      await dispatch(updateCopia(data)).unwrap();
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
      <Typography align='center' variant='h5' mb={4} >Editar Copia</Typography>
      {
        (copia && Object.keys(copia).length > 0) &&
          <FormProvider {...formMethods} >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>

                <Grid item md={4} xs={12} >
                  {
                    (edicionesFormateado.length > 0) && <MyAutocomplete label={'Edicion'} name={'edicion_id'} placeholder='Seleccione edicion' options={edicionesFormateado}/>
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
                <Button type='submit' size='large'  variant="contained" disabled={!(isValid) || cargando}>
                  Guardar
                </Button> 
                </Box>
            </form>
          </FormProvider>
      }
    </Box>
  )
}
