import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {  PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { getUserAuth } from '../store/thunk/authThunk';
import clienteAxios from '../config/axios';
import { useInterceptorAxios } from '../hooks/useInterceptorAxios';
import { MensajeDialog } from '../components/shared/dialog/MensajeDialog';

export const AppRouter = () => {
  const [verificando, setVerificando] = useState(true);
  const [logueado, setlogueado] = useState<boolean >(false);
  const { usuario} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  /**
   * useInterceptorAxios lo cree como hook ya que vi que los hook no necesariamente deben tener return,
   * por ejemplo useEffect es un hook de react y no retorna nada
   * useInterceptorAxios maneja errores y si cierra sesion o redirecciona si lo necesita
   * pense hacerlo tipo wrapper 'envoltura', envolviento la etiqueta mifuncion(app) pero no me gusto por que aqui no puedo hacer dispatch
   */
  useInterceptorAxios(clienteAxios);

  useEffect(() => {
    const consultarUser = async () => {
      const token = localStorage.getItem('token') || null;
      if (!usuario && token) {
        try {
          await dispatch(getUserAuth()).unwrap();
        } catch (error) {
          localStorage.removeItem('token');
          setlogueado(false)
          setVerificando(false);
        }
      }
      setVerificando(false);
    }
    consultarUser();
  }, [])
  
  useEffect(() => {
    if (usuario){
      setlogueado(true)
      setVerificando(false);
    } else {
      if (!verificando) {
        setVerificando(false);
        setlogueado(false)
      }
    }
  }, [usuario]);
  console.log({logueado, usuario});
  
  
  return (
    <BrowserRouter>
      <MensajeDialog/>
      {
        (verificando)
        ? <h4>...Cargando</h4>
        : (!logueado && !usuario) ? <PublicRouter /> : <PrivateRouter />
      }
    </BrowserRouter>
  )
}