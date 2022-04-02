import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import {  PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';

const logueado = true;
export const AppRouter = () => {
  const [cargando, setCargando] = useState(true);
  
  setTimeout(() => {
    setCargando(false);
  }, 1000);

  if (cargando) {
    return <h4>...Cargando</h4>
  }

  return (
    <BrowserRouter>
      {
        !logueado ? <PublicRouter /> : <PrivateRouter />
      }
    </BrowserRouter>
  )
}