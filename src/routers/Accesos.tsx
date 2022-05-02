import React from 'react';
import AccesoDenegadoScreen from '../components/auth/AccesoDenegadoScreen';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useRedux';
import { useState, useEffect } from 'react';
import { TIPO_USUARIO } from '../enums/index';
import { tieneAcceso } from '../helpers/tieneAcceso';

interface Props {
    component: React.ComponentType
    path?: string
    roles: Array<any>
  }

export const Accesos: React.FC<Props> = ({ component: RouteComponent, roles }) => {
  const {usuario} = useAppSelector(state => state.auth);
  const [userHasRequiredRole, setUserHasRequiredRole] = useState<Boolean>(false);
  const resp = tieneAcceso({usuario, roles});
  (resp !== userHasRequiredRole) && setUserHasRequiredRole(resp);
     
  if (userHasRequiredRole) {
    return <RouteComponent />
  }

  if (!userHasRequiredRole) {
    return <AccesoDenegadoScreen />
  }
  
  return <Navigate to="/libros" />
}