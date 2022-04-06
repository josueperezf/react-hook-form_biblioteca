import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { Accesos } from './Accesos';
import { DashboardTemplate } from '../components/template/DashboardTemplate';
import PersonasScreen from '../components/personas/PersonasScreen';
import { LibrosScreen } from '../components/libros/LibrosScreen';
import { PersonasAddScreen } from '../components/personas/PersonasAddScreen';
import { PersonasEditScreen } from '../components/personas/PersonasEditScreen';
import { AutoresScreen } from '../components/autores/AutoresScreen';
import { AutoresAddScreen } from '../components/autores/AutoresAddScreen';
import { AutoresEditScreen } from '../components/autores/AutoresEditScreen';

export const PrivateRouter = () => {
  return (
    <DashboardTemplate>
      <Routes>

        <Route path='personas'>
          <Route index  element={<Accesos roles={['admin']} component={PersonasScreen }/>}/>
          <Route path="add" element={<Accesos roles={['admin']} component={PersonasAddScreen }/>}/>
          <Route path="edit/:id" element={<Accesos roles={['admin']} component={PersonasEditScreen }/>}/>
        </Route>

        <Route path='autores'>
          <Route index  element={<Accesos roles={['admin']} component={AutoresScreen }/>}/>
          <Route path="add" element={<Accesos roles={['admin']} component={AutoresAddScreen }/>}/>
          <Route path="edit/:id" element={<Accesos roles={['admin']} component={AutoresEditScreen }/>}/>
        </Route>

        <Route path='libros'>
          <Route index  element={<Accesos roles={['admin']} component={LibrosScreen }/>}/>
        </Route>

          {/* <Route path="/*" element={<Navigate to='libros' replace /> } /> */}
      </Routes>
    </DashboardTemplate>
  )
}
