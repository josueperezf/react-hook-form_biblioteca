import React from 'react'
import { NavLink } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import People from '@mui/icons-material/People';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useAppSelector } from '../../hooks/useRedux';
import { tieneAcceso } from '../../helpers/tieneAcceso';
import { TIPO_USUARIO } from '../../enums';

export const DrawerComponent = () => {
  const {usuario} = useAppSelector(state => state.auth);
  
  return (
    <List>
      {/* <NavLink to='/home' className={({isActive}) => "" + (isActive ? "nav-active" : "")} >Home</NavLink> */}
      {
          tieneAcceso({usuario: usuario, roles: [TIPO_USUARIO.ADMINISTRADOR, TIPO_USUARIO.OPERADOR]}) &&
            <NavLink className={({isActive}) => "" + (isActive ? "nav-ink-seleccionado" : "")} style={{textDecoration: 'none'}} to={'/personas'} >
                <ListItem button   >
                    <ListItemIcon>
                        <People />
                    </ListItemIcon>
                        <ListItemText primary='Personas' />
                </ListItem>
            </NavLink>
      }
      {
          tieneAcceso({usuario: usuario, roles: [TIPO_USUARIO.ADMINISTRADOR, TIPO_USUARIO.OPERADOR]}) &&
        <NavLink className={({isActive}) => "" + (isActive ? "nav-ink-seleccionado" : "")} style={{textDecoration: 'none'}} to={'/autores'} >
            <ListItem button   >
                <ListItemIcon>
                    <AssignmentIndIcon />
                </ListItemIcon>
                    <ListItemText primary='Autores' />
            </ListItem>
        </NavLink>
    }
    {
        tieneAcceso({usuario: usuario, roles: [TIPO_USUARIO.ADMINISTRADOR, TIPO_USUARIO.OPERADOR]}) &&
        <NavLink className={({isActive}) => "" + (isActive ? "nav-ink-seleccionado" : "")} style={{textDecoration: 'none'}} to={'/libros'} >
            <ListItem button   >
                <ListItemIcon>
                    <MenuBookIcon />
                </ListItemIcon>
                    <ListItemText primary='Libros' />
            </ListItem>
        </NavLink>
    }
    {
          tieneAcceso({usuario: usuario, roles: [TIPO_USUARIO.ADMINISTRADOR, TIPO_USUARIO.OPERADOR]}) &&
        <NavLink className={({isActive}) => "" + (isActive ? "nav-ink-seleccionado" : "")} style={{textDecoration: 'none'}} to={'/ediciones'} >
            <ListItem button   >
                <ListItemIcon>
                    <BookmarksIcon />
                </ListItemIcon>
                    <ListItemText primary='Ediciones' />
            </ListItem>
        </NavLink>
    }
    {
        tieneAcceso({usuario: usuario, roles: [TIPO_USUARIO.ADMINISTRADOR, TIPO_USUARIO.OPERADOR]}) &&
        <NavLink className={({isActive}) => "" + (isActive ? "nav-ink-seleccionado" : "")} style={{textDecoration: 'none'}} to={'/copias'} >
            <ListItem button   >
                <ListItemIcon>
                    <DynamicFeedIcon />
                </ListItemIcon>
                <ListItemText primary='Copias' />
            </ListItem>
        </NavLink>
    }
    {
            tieneAcceso({usuario: usuario, roles: [TIPO_USUARIO.ADMINISTRADOR]}) &&
                <NavLink className={({isActive}) => "" + (isActive ? "nav-ink-seleccionado" : "")} style={{textDecoration: 'none'}} to={'/usuarios'} >
                    <ListItem button   >
                        <ListItemIcon>
                            <PersonOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary='Usuarios' />
                    </ListItem>
                </NavLink>
        }
      </List>
  )
}
