import { Cliente } from './cliente';

export interface Marcacion{
    marcacionId:number,
    marcacionNombre:string,
    clienteId:number,
    cliente:Cliente
}