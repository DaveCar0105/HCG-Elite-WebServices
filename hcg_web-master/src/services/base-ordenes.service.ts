import { Injectable } from '@angular/core';  
import { HttpHeaders } from '@angular/common/http';  
import { HttpClient } from '@angular/common/http' 
import { Observable } from 'rxjs';  
import { BaseOrden } from 'src/models/base-ordenes';
import { environment } from 'src/environments/environment';
  
@Injectable({  
  providedIn: 'root'  
})  
export class BaseOrdenesService {  
  
  constructor(private http: HttpClient) { }  
  
  url = environment.urlApiColombia;  
  
  UploadExcel(formData: FormData) : Observable<BaseOrden[]> {  
    let headers = new HttpHeaders();  
  
    headers.append('Content-Type', 'multipart/form-data');  
    headers.append('Accept', 'application/json');  
  
    const httpOptions = { headers: headers };  
  
    return this.http.post<BaseOrden[]>(this.url + 'Baseordenes', formData, httpOptions)  
  }  
  BindUser(): Observable<BaseOrden[]> {  
    return this.http.get<BaseOrden[]>(this.url + '/UserDetails');  
  }  
}