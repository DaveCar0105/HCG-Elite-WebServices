import { MercadoCliente } from './mercado';

export interface Cliente{
    clienteId:number,
    clienteNombre:string,
    clienteUrl:string,
    clienteMercado:MercadoCliente[]
}