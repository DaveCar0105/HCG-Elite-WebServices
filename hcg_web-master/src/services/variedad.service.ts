import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment'
import { Variedad } from 'src/models/variedad';
const headers = {
  headers: new HttpHeaders()
      .append('Content-Type', 'application/json'),
};
@Injectable({
  providedIn: 'root'
})
export class VariedadService {
    _url:string = environment.urlApi +'variedades';
  constructor(private http: HttpClient) { 
  }
  getVariedades (): Observable<Variedad[]> {
      return this.http.get<Variedad[]>(this._url, headers);
  }
  postVariedad(nuevo:Variedad){
      return this.http.post(this._url,nuevo,headers);
  }
  putVariedad(editar:Variedad){
      return this.http.put(this._url+'/'+editar.variedadId,editar,headers);
  }
}