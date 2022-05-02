import { TIPO_USUARIO } from '../enums';
import { UsuarioLogueado } from '../interfaces/index';
interface Props {
    roles: Array<any>
    usuario?: UsuarioLogueado | null
}
/**
 * usuario opcional, ya que puede o no estar logueado
 * roles son los tipos de usuario, ejemplo [1, 2].
 *    0 para solo no leguados, 'ejemplo solo ellos pueden ir al login',
 *    1 administrado puede hacer todo, aunque cambio de usuario no lo programe,
 *    2 operador puede hacer todo menos manejo de usuario
 */
export const tieneAcceso = ({usuario, roles}: Props) => {
  let respuesta = false;
  if (usuario) {
    if (roles.length > 0) {
        if (roles.includes(usuario.tipo_usuario_id) )  { 
          respuesta = true;
        } else {
          respuesta = false;
        }
    } else {
      respuesta = false;
    }
    } else {
    if (roles.length > 0 && roles.includes(TIPO_USUARIO.PUBLICO)) {
      respuesta = true;
    } else {
      respuesta = false;
    }
  }
  return respuesta;
}