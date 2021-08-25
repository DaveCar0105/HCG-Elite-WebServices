import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
const headers = {
  headers: new HttpHeaders()
      .append('Content-Type', 'application/json'),
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {
    _url:string = environment.urlApi +'usuarios/login/';
    _urlColombia:string = environment.urlApiColombia + 'Usuarios/';
  constructor(private http: HttpClient) { }
  
  getLogin(usuario:any) {
    if(usuario.app === "HCG"){
      return this.http.get<any>(this._url+usuario.usuarioNombre+'/'+usuario.usuarioContrasenia,headers);
    }
    else{
      return this.http.get<any>(this._urlColombia+usuario.usuarioNombre+'/'+usuario.usuarioContrasenia,headers);
    }
      
  }
}