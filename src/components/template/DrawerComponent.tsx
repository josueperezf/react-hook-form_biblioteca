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

export const DrawerComponent = () => {
  return (
    <List>
      {/* <NavLink to='/home' className={({isActive}) => "" + (isActive ? "nav-active" : "")} >Home</NavLink> */}
        <NavLink className={''} style={{textDecoration: 'none'}} to={'/personas'} >
            <ListItem button   >
                <ListItemIcon>
                    <People />
                </ListItemIcon>
                    <ListItemText primary='Personas' />
            </ListItem>
        </NavLink>
        <NavLink className={''} style={{textDecoration: 'none'}} to={'/autores'} >
            <ListItem button   >
                <ListItemIcon>
                    <AssignmentIndIcon />
                </ListItemIcon>
                    <ListItemText primary='Autores' />
            </ListItem>
        </NavLink>
        <NavLink className={''} style={{textDecoration: 'none'}} to={'/libros'} >
            <ListItem button   >
                <ListItemIcon>
                    <MenuBookIcon />
                </ListItemIcon>
                    <ListItemText primary='Libros' />
            </ListItem>
        </NavLink>
        <NavLink className={''} style={{textDecoration: 'none'}} to={'/ediciones'} >
            <ListItem button   >
                <ListItemIcon>
                    <BookmarksIcon />
                </ListItemIcon>
                    <ListItemText primary='Ediciones' />
            </ListItem>
        </NavLink>
        <NavLink style={{textDecoration: 'none'}} to={'/copias'} >
            <ListItem button   >
                <ListItemIcon>
                    <DynamicFeedIcon />
                </ListItemIcon>
                <ListItemText primary='Copias' />
            </ListItem>
        </NavLink>
        <NavLink style={{textDecoration: 'none'}} to={'/usuarios'} >
            <ListItem button   >
                <ListItemIcon>
                    <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText primary='Usuarios' />
            </ListItem>
        </NavLink>
      </List>
  )
}
