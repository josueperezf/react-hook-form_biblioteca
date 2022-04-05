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

export interface Autor  {
    biografia: string,
    estatus?: number,
    fecha_nacimiento: Date | string | null,
    id?: number,
    nombre: string,
    pais_id: number | null,
}

export interface Pais {
    id: number,
    nombre: string,
    estatus?: number,
}