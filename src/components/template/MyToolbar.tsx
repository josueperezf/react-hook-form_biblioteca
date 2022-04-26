import { logout } from '../../store/slices/AuthSlices';
import { Typography, Menu, MenuItem } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';

interface Props {
  handleDrawerToggle: () => void
}
export const MyToolbar = ({ handleDrawerToggle}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {usuario} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const salir = () => {
    handleClose();
    dispatch(logout());
  }
  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1 }}>
        Biblioteca
      </Typography>
      {/* <Button color="inherit">Login</Button> */}
      {(usuario) && (
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Typography  fontSize={14} >
              {usuario.persona?.nombre}
            </Typography>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Editar</MenuItem>
            <MenuItem onClick={salir}>Salir</MenuItem>
          </Menu>
        </div>
      )}
    </Toolbar>
  )
}
