export interface Persona  {
    direccion: string,
    dni: string,
    fecha_nacimiento: Date | string | null
    id?: number,
    nombre: string,
    telefono: string,
}
export interface Error400  {
    location: string,
    msg: string,
    nombre: string,
    param: string,
    value: string,
}
