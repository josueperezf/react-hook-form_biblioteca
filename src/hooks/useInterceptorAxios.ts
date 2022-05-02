import { AxiosInstance } from "axios";
import { useEffect } from 'react';
import { logout } from "../store/slices/AuthSlices";
import { useAppDispatch } from './useRedux';
import { MensajeState } from '../interfaces/index';
import { mostrarMensaje } from "../store/slices/MensajeSlices";

let mensaje: MensajeState = {
  contenido: "",
  open: true,
  tipo: "error",
  titulo: "Error!"
}
export const useInterceptorAxios = (clienteAxios: AxiosInstance) => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    clienteAxios.interceptors.response.use(response => response,
      error => {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              // propago el error para que siga y entre en los catch de redux y muestre en los formulario
              return Promise.reject(error.response.data);
            case 401:
            case 403:
              dispatch(logout());
            break
            case 500:
              mensaje.contenido = 'Ha ocurrido un problema en el servidor';
              dispatch(mostrarMensaje(mensaje));
            break
            case 503:
              mensaje.contenido = 'Servicio No Disponible';
              dispatch(mostrarMensaje(mensaje));
            break
            default:
              break
          }  
        } else if (error.request) {
          // Se realizó la solicitud pero no se recibió respuesta
          // `error.request` es una instancia de XMLHttpRequest en el navegador
          mensaje.contenido = 'El servidor no ha dado respuesta';
          dispatch(mostrarMensaje(mensaje));
          // paso error.response.data, ya que en este caso no hay data, por ende arrojaria error
          return Promise.reject(error.response);
        } else {
          // Algo sucedió al configurar la solicitud que provocó un error
          console.log('Error', error.message);
          return Promise.reject(error.response);
        }
      }
    );
  }, [])
}
