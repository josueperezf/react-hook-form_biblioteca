import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import People from '@mui/icons-material/People';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { NavLink } from 'react-router-dom';


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
                    <MenuBookIcon />
                </ListItemIcon>
                    <ListItemText primary='Ediciones' />
            </ListItem>
        </NavLink>
      </List>
  )
}
