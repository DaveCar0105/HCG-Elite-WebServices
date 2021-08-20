import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { Mercado, MercadoCliente } from 'src/models/mercado';
import {environment} from '../environments/environment'
const headers = {
  headers: new HttpHeaders()
      .append('Content-Type', 'application/json'),
};
@Injectable({
  providedIn: 'root'
})
export class MercadoService {
    _url:string = environment.urlApi +'mercados';
    _urlClienteMercados:string = environment.urlApi +'clientemercados';
  constructor(private http: HttpClient) { 
  }
  getMercados (): Observable<Mercado[]> {
      return this.http.get<Mercado[]>(this._url, headers);
  }
  postMercado(nuevo:Mercado){
      return this.http.post(this._url,nuevo,headers);
  }
  putMercado(editar:Mercado){
      return this.http.put(this._url+'/'+editar.mercadoId,editar,headers);
  }

  postMercadoCliente(mercadoCliente:MercadoCliente){
    return this.http.post(this._urlClienteMercados,mercadoCliente,headers);
  }
}