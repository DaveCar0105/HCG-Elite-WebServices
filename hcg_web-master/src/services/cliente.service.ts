import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment'
import { Cliente } from 'src/models/cliente';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
const headers = {
  headers: new HttpHeaders()
      .append('Content-Type', 'application/json'),
};

const headersImage = {
  headers: new HttpHeaders()
      .append('nombre','client')
};
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
    _url:string = environment.urlApi +'clientes';
    _urlImage:string = environment.urlApi +'imagen'
  constructor(private http: HttpClient) { 
  }
  getClientes (): Observable<Cliente[]> {
      return this.http.get<Cliente[]>(this._url, headers);
  }
  postCliente(nuevo:Cliente,nombreImagen:string): Observable<Cliente>{
    nuevo.clienteUrl = nombreImagen;  
    return this.http.post<Cliente>(this._url,nuevo,headers);
  }
  putCliente(editar:Cliente,nombreImagen:string){
    editar.clienteUrl = nombreImagen;
      return this.http.put(this._url+'/'+editar.clienteId,editar,headers);
  }
  uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('files', image);
    return this.http.post(this._urlImage, formData, headersImage);
  }
}