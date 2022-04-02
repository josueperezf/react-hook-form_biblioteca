import React from 'react';
import AccesoDenegadoScreen from '../components/auth/AccesoDenegadoScreen';
import { Navigate } from 'react-router-dom';

interface Props {
    component: React.ComponentType
    path?: string
    roles?: Array<any>
  }
  const isAuthenticated = true;
  const userHasRequiredRole =  true;
  export const Accesos: React.FC<Props> = ({ component: RouteComponent, roles }) => {
  
    if (isAuthenticated && userHasRequiredRole) {
      return <RouteComponent />
    }
  
    if (isAuthenticated && !userHasRequiredRole) {
      return <AccesoDenegadoScreen />
    }
  
    return <Navigate to="/" />
  }