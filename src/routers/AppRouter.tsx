import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {  PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { getUserAuth } from '../store/thunk/authThunk';


export const AppRouter = () => {
  const [verificando, setVerificando] = useState(true);
  const [logueado, setlogueado] = useState<boolean >(false);
  const { usuario} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

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
  
  return (
    <BrowserRouter>
      {
        (verificando)
        ? <h4>...Cargando</h4>
        : (!logueado && !usuario) ? <PublicRouter /> : <PrivateRouter />
      }
    </BrowserRouter>
  )
}