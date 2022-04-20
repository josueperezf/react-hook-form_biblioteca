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
export interface Estado  {
    id?: number,
    nombre: string,
    estatus?: number,
}

export interface Autor  {
    biografia: string,
    estatus?: number,
    fecha_nacimiento: Date | string | null,
    id?: number,
    nombre: string,
    pais_id: number | null,
    libros?: Libro[]
}

export interface Copia {
    id?: number,
    codigo: string,
    edicion_id: number | null | any,
    edicion?: Edicion,
    estado_id?: number,
    estado?: Estado,
    prestamos?: [],
    serial: string,
}
export interface Pais {
    id: number,
    nombre: string,
    estatus?: number,
}
export interface Idioma {
    id: number,
    nombre: string,
    estatus?: number,
}
export interface Libro {
    id?: number,
    titulo: string,
    estatus?: number,
    autores?: any
    ediciones?: Edicion[]
}

export interface Edicion  {
    id?: number,
    idioma_id: number,
    libro_id: number | null,
    autor_id: number,
    nombre: string,
    fecha: Date | string | null,
    isbn: string,
    numero_paginas: number,
    tipo?: number | null,
    estatus?: number,
    [x: string]: any
}
export interface Usuario {
    id?: number,
    login: string,
    password?: string,
    persona_id: number,
    tipo_usuario_id: number,
    estatus?: number,
}