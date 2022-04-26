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
import { EdicionesScreen } from '../components/ediciones/EdicionesScreen';
import { EdicionesAddScreen } from '../components/ediciones/EdicionesAddScreen';
import { EdicionesEditScreen } from '../components/ediciones/EdicionesEditScreen';
import { LibrosShowScreen } from '../components/libros/LibrosShowScreen';
import { AutoresShowScreen } from '../components/autores/AutoresShowScreen';
import { CopiasScreen } from '../components/copias/CopiasScreen';
import { CopiasAddScreen } from '../components/copias/CopiasAddScreen';
import { CopiasEditScreen } from '../components/copias/CopiasEditScreen';
import { UsuariosScreen } from '../components/usuarios/UsuariosScreen';
import { UsuariosAddScreen } from '../components/usuarios/UsuariosAddScreen';

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
          <Route path="show/:id" element={<Accesos roles={['admin']} component={AutoresShowScreen }/>}/>
        </Route>

        {/* el crud de libros se hace mediante ventanas dialog */}
        <Route path='libros'>
          <Route index  element={<Accesos roles={['admin']} component={LibrosScreen }/>}/>
          <Route path="show/:id" element={<Accesos roles={['admin']} component={LibrosShowScreen }/>}/>
        </Route>

        <Route path='ediciones'>
          <Route index  element={<Accesos roles={['admin']} component={EdicionesScreen }/>}/>
          <Route path="add" element={<Accesos roles={['admin']} component={EdicionesAddScreen }/>}/>
          <Route path="edit/:id" element={<Accesos roles={['admin']} component={EdicionesEditScreen }/>}/>
        </Route>

        <Route path='copias'>
          <Route index element={<Accesos roles={['admin']} component={CopiasScreen }/>}/>
          <Route path="add" element={<Accesos roles={['admin']} component={CopiasAddScreen }/>}/>
          <Route path="edit/:id" element={<Accesos roles={['admin']} component={CopiasEditScreen }/>}/>
        </Route>

        <Route path='usuarios'>
          <Route index element={<Accesos roles={['admin']} component={UsuariosScreen }/>}/>
          <Route path="add" element={<Accesos roles={['admin']} component={UsuariosAddScreen }/>}/>
        </Route>

        <Route path="/*" element={<Navigate to='libros' replace /> } />
      </Routes>
    </DashboardTemplate>
  )
}
