import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Accesos } from './Accesos';
import { DashboardTemplate } from '../components/template/DashboardTemplate';
import PersonasScreen from '../components/personas/PersonasScreen';
import { LibrosScreen } from '../components/libros/LibrosScreen';
import { PersonasAddScreen } from '../components/personas/PersonasAddScreen';
import { PersonasEditScreen } from '../components/personas/PersonasEditScreen';

export const PrivateRouter = () => {
  return (
    <DashboardTemplate>
      <Routes>

        <Route path='personas'>
          <Route index  element={<Accesos roles={['admin']} component={PersonasScreen }/>}/>
          <Route path="add" element={<Accesos roles={['admin']} component={PersonasAddScreen }/>}/>
          <Route path="edit/:id" element={<Accesos roles={['admin']} component={PersonasEditScreen }/>}/>
        </Route>

        <Route path="/libros" element={<Accesos roles={['admin']} component={LibrosScreen} />}/>
          {/* <Route path="/*" element={<Navigate to='libros' replace /> } /> */}
      </Routes>
    </DashboardTemplate>
  )
}
