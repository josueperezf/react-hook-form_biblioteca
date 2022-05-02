import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../hooks/useRedux';
import { ocultarMensaje } from '../../../store/slices/MensajeSlices';

export const MensajeDialog = () => {
  const dispatch = useAppDispatch();
  const {contenido, open, titulo, tipo, onClose} = useAppSelector(state => state.mensaje);

  const handleClose = () => {
    (onClose) && onClose();
    dispatch(ocultarMensaje());
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{titulo}</DialogTitle>
      <DialogContent>
        {contenido}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} >Aceptar</Button>
      </DialogActions>
    </Dialog>
  );
}
