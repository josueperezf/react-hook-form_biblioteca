import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Accesos } from './Accesos';
import { PublicTemplate } from '../components/template/PublicTemplate';
import LoginScreen from '../components/auth/LoginScreen';
import { TIPO_USUARIO } from '../enums/index';

export const PublicRouter = () => {
  return (
    <PublicTemplate>
      <Routes>
          <Route path="/login" element={<Accesos component={LoginScreen} roles={[TIPO_USUARIO.PUBLICO ]} />}/>
          <Route path="/*" element={<Navigate to='login' replace /> } />
      </Routes>
    </PublicTemplate>
  )
}
