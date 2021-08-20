import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { Agencia, AgenciaNueva } from 'src/models/agencia';
import {environment} from '../environments/environment'
const headers = {
  headers: new HttpHeaders()
      .append('Content-Type', 'application/json'),
};
@Injectable({
  providedIn: 'root'
})
export class AgenciaService {
    _url:string = environment.urlApi +'agencias';
  constructor(private http: HttpClient) { 
  }
  getAgencias (): Observable<Agencia[]> {
      return this.http.get<Agencia[]>(this._url, headers);
  }
  postAgencia(nuevo:AgenciaNueva){
      return this.http.post(this._url,nuevo,headers);
  }
  putAgencia(editar:Agencia){
      return this.http.put(this._url+'/'+editar.agenciaId,editar,headers);
  }
}