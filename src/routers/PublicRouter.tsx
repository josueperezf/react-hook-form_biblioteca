import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Accesos } from './Accesos';
import { PublicTemplate } from '../components/template/PublicTemplate';
import LoginScreen from '../components/auth/LoginScreen';
import { RegistroScreen } from '../components/auth/RegistroScreen';

export const PublicRouter = () => {
  return (
    <PublicTemplate>
      <Routes>
          <Route path="/registro" element={<Accesos roles={['admin']} component={RegistroScreen} />}/>
          <Route path="/login" element={<Accesos roles={['admin']} component={LoginScreen} />}/>
          <Route path="/*" element={<Navigate to='login' replace /> } />
      </Routes>
    </PublicTemplate>
  )
}
