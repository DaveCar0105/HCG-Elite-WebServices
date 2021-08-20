import { MercadoCliente } from './mercado';

export interface Cliente{
    clienteId:number,
    clienteNombre:string,
    clienteUrl:string,
    clienteMercado:MercadoCliente[]
}

export interface ProcesoMaritimo{
    semana:string,
    mes:string,
    fecha:string,
    postCosecha:string,
    codigoQc:string,
    cliente:string,
    numeroGuia:number,
    proceso:string,
    codigoRamosControl:string,
    ramosControl:string,
    cumple:number,
    noCumple:number,
    noAplica:number,
}