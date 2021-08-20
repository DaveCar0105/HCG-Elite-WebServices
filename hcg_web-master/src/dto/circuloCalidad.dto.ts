export interface CirculoCalidadCausas{
    semana:string,
    mes:string,
    fecha:string,
    postCosecha:string,
    numeroReunion:string,
    causa:string,
    causaRelacionada:string,
    indice:number,
    codigoRamosControl:string,
    porDistribucion:number
}
export interface CirculoCalidadClientes{
    semana:string,
    mes:string,
    fecha:string,
    postCosecha:string,
    numeroReunion:string,
    cliente:string,
    ramosRevisados:number,
    ramosRechazados:number,
    porNoConformidad:number
}
export interface CirculoCalidadProductos{
    semana:string,
    mes:string,
    fecha:string,
    postCosecha:string,
    numeroReunion:string,
    producto:string,
    ramosRevisados:number,
    ramosRechazados:number,
    porNoConformidad:number
}

export interface CirculoCalidadLinea{
    semana:string,
    mes:string,
    fecha:string,
    postCosecha:string,
    numeroReunion:string,
    linea:string,
    incidenciaRamos:number,
    porcentajeIncidencia:number
}

export interface CirculoCalidadVariedad{
    semana:string,
    mes:string,
    fecha:string,
    postCosecha:string,
    numeroReunion:string,
    variedad:string,
    incidenciaRamos:number,
    porcentajeIncidencia:number
}

export interface CirculoCalidadNumeroMesa{
    semana:string,
    mes:string,
    fecha:string,
    postCosecha:string,
    numeroReunion:string,
    numeroMesa:string,
    incidenciaRamos:number,
    porcentajeIncidencia:number
}
