import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment'
import { Marcacion } from 'src/models/marcacion';
const headers = {
  headers: new HttpHeaders()
      .append('Content-Type', 'application/json'),
};
@Injectable({
  providedIn: 'root'
})
export class MarcacionService {
    _url:string = environment.urlApi +'marcaciones';
  constructor(private http: HttpClient) { 
  }
  getMarcaciones (): Observable<Marcacion[]> {
      return this.http.get<Marcacion[]>(this._url, headers);
  }
  postMarcacion(nuevo:Marcacion){
      return this.http.post(this._url,nuevo,headers);
  }
  putMarcacion(editar:Marcacion){
      return this.http.put(this._url+'/'+editar.marcacionId,editar,headers);
  }
}