import { Button, Grid } from '@mui/material';
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useSnackbar } from 'notistack';
import { Error400, Persona } from '../../interfaces/index';
import { RutValidator } from '../../validators/rut.validator';
import { MyTextInput } from '../customInputs/MyTextInput';
import SearchIcon from '@mui/icons-material/Search';
import { formatRut } from '../../helpers/formatRut';
import { getPersonaPorDNI, getPersonaSinUsuarioPorDNI } from '../../store/thunk/personaThunk';
import { useEffect } from 'react';

interface Props {
  fn?: (persna: Persona | null) => void,
  tipo: 'todos' | 'sin-cuenta-usuario'
}

const defaultValues:{dni: string}= {
  dni: '',
}
const validationSchema =
  Yup.object({
    dni: Yup.string().trim().uppercase().min(6, 'debe contener al menos 6 caracteres').max(15, 'Debe tener 15 caracteres o menos').required('Requerido')
    .test('ValidarRut', 'Debe ser Rut valido',
      value =>  RutValidator(value ||  '' )
    ),
});

export const BuscarPersonaPorDNI = ({fn, tipo}:Props) => {
  const formMethods = useForm<{dni: string}>({ mode: 'all', defaultValues, resolver: yupResolver(validationSchema) })
  const { handleSubmit, setValue, setError, formState: { isValid  } } = formMethods;
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {persona, cargando} = useAppSelector(state => state.personas);

  const onSubmit = async (data: any) => {
    if (!isValid) return;
    try {
      (tipo === 'todos') ? await dispatch(getPersonaPorDNI(data.dni)).unwrap() : await dispatch(getPersonaSinUsuarioPorDNI (data.dni)).unwrap()
    } catch (error: any) {
      enqueueSnackbar('Acceso denegado', { variant: 'error', anchorOrigin: { horizontal: 'center', vertical: 'top'}});
      if (error && error.errors) {
        const errors: [] = error.errors || [];
        errors.forEach(({msg}: Error400) => {
          setError('dni', {type: "manual", message: msg})})
      }
    }
  }
  
  useEffect(() => {
    if (fn) {
      fn(persona || null);
    }
  }, [persona])
  
  const formatearInputRut = (e: React.FormEvent<HTMLInputElement> | any) => {
    setValue(e.target.name, formatRut(e.target.value));
  }

  return (
    <FormProvider {...formMethods} >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item md={8}  >
            <MyTextInput label={'DNI o RUT'} name={'dni'} placeholder='DNI o RUT' maxLength={30} onChange={formatearInputRut} />
          </Grid>
          <Grid item md={4} >
            <Button type='submit' fullWidth variant="contained" size='large' style={{height: '56px' }} disabled={(!isValid || cargando )} >
              <SearchIcon/>
              Buscar
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  )
}
