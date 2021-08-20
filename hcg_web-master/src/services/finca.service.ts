import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment'
import { Finca } from 'src/models/finca';
const headers = {
  headers: new HttpHeaders()
      .append('Content-Type', 'application/json'),
};
@Injectable({
  providedIn: 'root'
})
export class FincaService {
    _url:string = environment.urlApi +'fincas';
  constructor(private http: HttpClient) { 
  }
  getFincas (): Observable<Finca[]> {
      return this.http.get<Finca[]>(this._url, headers);
  }
  postFinca(nuevo:Finca){
      return this.http.post(this._url,nuevo,headers);
  }
  putFinca(editar:Finca){
      return this.http.put(this._url+'/'+editar.fincaId,editar,headers);
  }
}