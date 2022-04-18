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