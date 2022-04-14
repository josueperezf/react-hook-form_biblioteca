import { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import { subYears } from 'date-fns';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { Error400, Edicion, Idioma, Autor, Libro } from '../../interfaces/index';
import Box from '@mui/material/Box';
import { Typography, Grid, Button } from '@mui/material';
import { getIdiomas } from '../../store/thunk/idiomasThunk';
import { addEdicion, getEdicion, updateEdicion } from '../../store/thunk/edicionThunk';
import { getAutores } from '../../store/thunk/autorThunk';
import { getLibroPorAutor } from '../../store/thunk/libroThunk';
import { setLibros } from '../../store/slices/LibroSlices';
import { MyTextInput, MyDatePicker, MySelect } from '../customInputs';

const defaultValues: Edicion = {
  idioma_id: 4,
  libro_id: 0,
  nombre: '',
  fecha: '',
  isbn: '',
  numero_paginas: 0,
  //extra
  autor_id: 0,
};
const maxDate = new Date();
const minDate = subYears( new Date(), 2000); // por si hay un libro como la biblia o algo asi de viejo

const validationSchema =
  Yup.object({
    idioma_id: Yup.number().required('Requerido').notOneOf([0], 'Algun elemento debe ser seleccionado'),
    autor_id:  Yup.number().required('Requerido').notOneOf([0], 'Algun elemento debe ser seleccionado'),
    libro_id:  Yup.number().required('Requerido').notOneOf([0], 'Algun elemento debe ser seleccionado'),
    nombre: Yup.string().trim().min(3, 'debe contener al menos 3 caracteres').max(100, 'Debe tener 100 caracteres o menos').required('Requerido'),
    fecha : Yup.date().typeError("Fecha no Valida").max(maxDate, "fecha minima no permitida").min(minDate, "fecha maxima no permitida").required('Requerido'),
    isbn: Yup.string().trim().min(3, 'debe contener al menos 3 caracteres').max(10, 'Debe tener 10 caracteres o menos').required('Requerido'),
    numero_paginas:  Yup.number().typeError('Requerido').required('Requerido').min(1, 'debe contener al menos pagina').max(9999,'excede el numero maximo de paginas permitido')
});

const initialSelect = {id: 0, text: 'SELECCIONE'};

export const EdicionesEditScreen = () => {
  const formMethods = useForm<Edicion>({ mode: 'all', defaultValues, resolver: yupResolver(validationSchema) })
  const { handleSubmit, setError, setValue, getValues, reset, formState: { isValid, isDirty } } = formMethods;
  const [idiomaFormateado, setIdiomaFormateado] = useState<{id: number | string, text: string}[]>([]);
  const [autoresFormateado, setAutoresFormateado] = useState<{id: number | string, text: string}[]>([]);
  const [librosFormateado, setLibrosFormateado] = useState<{id: number | string, text: string}[]>([]);
  const {idiomas} = useAppSelector(state => state.idiomas);
  const {autores} = useAppSelector(state => state.autores);
  const {edicion, cargando: cargandoEdicion} = useAppSelector(state => state.ediciones);
  const {libros, cargando: cargandoLibros} = useAppSelector(state => state.libros);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const id = parseInt(params.id || '') ;
  
  useEffect(() => {
    (idiomas.length === 0) && dispatch(getIdiomas());
    const cargarData = async () => {
      if (id && (typeof id != "string")) {
        try {
          await Promise.all([
            dispatch(getEdicion(id)),
            dispatch(getAutores()),
            dispatch(setLibros([]))
          ]);
        } catch (error) {
          navigate('/ediciones')
        }
      } else {
        navigate('/ediciones')
      }
    }
    cargarData();
  }, [dispatch]);

  useEffect(() => {
    if (edicion) {
      const {idioma = initialSelect, libro = {...initialSelect, titulo: ''}, ...data} = {...edicion};
      if(Object.keys(libro).length > 0) {
        const dataFormateada = {id: libro.id, text: libro.titulo  }
        // setLibrosFormateado([dataFormateada]);
      }
      dispatch(getLibroPorAutor(edicion.autor_id));
      reset(data);
      }
  }, [edicion])
  

  useEffect(() => {
    if (idiomas.length > 0) {
      const dataFormateada = idiomas.map(({id, nombre}: Idioma) => ({id, text: nombre}));
      setIdiomaFormateado(dataFormateada);
    }
  }, [idiomas]);

  useEffect(() => {
    const dataFormateada = autores.map(({id, nombre}: Autor) => ({id: id || 0, text: nombre}));
    setAutoresFormateado([ initialSelect, ...dataFormateada]);
  }, [autores]);

  useLayoutEffect(() => {
    if (edicion) {
      const libro_id = getValues('libro_id');
      const dataFormateada = [initialSelect, ...libros.map(({id, titulo}: Libro) => ({id: id || 0, text: titulo}))];
      const encontrado = dataFormateada.find((l) => l.id === libro_id);
      if ( encontrado && Object.keys(encontrado).length > 0) {
        setLibrosFormateado(dataFormateada)
      }
    }
  }, [libros]);

  const onChangeAutor = (e: any) => {
    setValue('libro_id', 0);
    const autor_id = e.target.value;
    dispatch(getLibroPorAutor(autor_id));
  }

  const onSubmit = async (edicion: Edicion) => {
    try {
      await dispatch(updateEdicion(edicion)).unwrap();
      enqueueSnackbar('Operacion Exitosa', {variant: 'success', anchorOrigin: { horizontal: 'center', vertical: 'top'}});
      navigate('/ediciones');
    } catch (error: any) {
      enqueueSnackbar('ha ocurrido un problema', { variant: 'error', anchorOrigin: { horizontal: 'center', vertical: 'top'}});
      if (error && error.errors) {
        const errors: [] = error.errors || [];
        errors.forEach(({msg, param }: Error400) => {
          setError( (param as any), {
            type: "manual",
            message: msg,
          });
        })
      }
    }
  }
  
  return (
    <Box>
      <Typography align='center' variant='h5' mb={4} >Editar Edicion a un libro</Typography>
      {
        (!cargandoEdicion && edicion && Object.keys(edicion).length > 0 ) &&
          (<FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)} >
              <Grid container spacing={3}>

                <Grid item md={4} xs={12} >
                  { (idiomaFormateado.length > 0)  && <MySelect label={'Idioma'} name={'idioma_id'} options={idiomaFormateado} /> }
                </Grid>
                <Grid item md={4} xs={12} >
                  {(autoresFormateado.length > 0)  && <MySelect label={'Autor'} name={'autor_id'} options={autoresFormateado} onChange={onChangeAutor} />}
                </Grid>
                <Grid item md={4} xs={12} >
                  {(librosFormateado.length > 0  && !cargandoLibros)  && <MySelect label={'Libro'} name={'libro_id'} options={librosFormateado} />}
                </Grid>

                <Grid item md={4} xs={12} >
                  <MyTextInput  label={'Ingrese el nombre'} mayuscula name={'nombre'} placeholder='Ingrese el nombre' maxLength={100}/>
                </Grid>
                <Grid item md={4} xs={12} >
                  <MyDatePicker name="fecha" label={'Fecha de Emision'} maxDate={maxDate} minDate={minDate} />
                </Grid>
                <Grid item md={4} xs={12} >
                  <MyTextInput label={'Ingrese el isbn'} mayuscula name={'isbn'} placeholder='Ingrese el isbn' maxLength={100}/>
                </Grid>

                <Grid item md={4} xs={12} >
                  <MyTextInput label={'Número paginas'} numero={'entero'} name={'numero_paginas'} placeholder='Número paginas' maxLength={4}/>
                  {/* <MyNumberInput label={'Número paginas'} min={0} max={10} name={'numero_paginas'} placeholder='Número paginas'/> */}
                </Grid>
                

              </Grid>
              <Box mt={3} textAlign='center'>
                <Button type='submit' size='large'  variant="contained" disabled={!(isValid)} >Guardar</Button> 
              </Box>
            </form>
          </FormProvider>)
      }
    </Box>
  )
}
