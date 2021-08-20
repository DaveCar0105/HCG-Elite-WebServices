import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { Usuario, UsuarioNuevo } from 'src/models/Usuario';
import {environment} from '../environments/environment'
const headers = {
  headers: new HttpHeaders()
      .append('Content-Type', 'application/json'),
};
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    _url:string = environment.urlApi +'Usuarios';
  constructor(private http: HttpClient) { 
  }
  getUsuarios (): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(this._url, headers);
  }
  postUsuario(nuevo:UsuarioNuevo){
      return this.http.post(this._url,nuevo,headers);
  }
  putUsuario(editar:Usuario){
      return this.http.put(this._url+'/'+editar.usuarioId,editar,headers);
  }
}