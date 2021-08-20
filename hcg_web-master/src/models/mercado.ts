export interface Mercado{
    mercadoId:number,
    mercadoNombre:string
}

export interface MercadoCliente{
    mercadoId:number,
    clienteId:number,
    mercado?:Mercado
}