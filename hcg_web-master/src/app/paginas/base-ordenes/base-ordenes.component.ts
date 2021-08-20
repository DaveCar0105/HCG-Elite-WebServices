import { Component, OnInit, ViewChild } from '@angular/core';  
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { BaseOrdenesService } from '../../../services/base-ordenes.service';  
import { BaseOrden } from '../../../models/base-ordenes'; 
  
@Component({  
  selector: 'app-base-ordenes',  
  templateUrl: './base-ordenes.component.html',  
  styleUrls: ['./base-ordenes.component.css']  
})  
export class BaseOrdenesComponent implements OnInit {  
  @ViewChild('fileInput') fileInput;  
  message: string;  
  allOrders: BaseOrden[];  
  displayedColumns: string[] = ['prioridades','nomBodega','postcosecha','nomShip','nomShop','marca','numPed','pO','tipoDes','total'];
  constructor(private http: HttpClient, private service: BaseOrdenesService) { }  
  
  ngOnInit() {  
    this.loadAllUser();  
  }  
  loadAllUser() {  
    //this.allOrders = this.service.BindUser();  
  }  
  uploadFile() {  
    let formData = new FormData();  
    formData.append('excel', this.fileInput.nativeElement.files[0])  
    this.fileInput.nativeElement.value = '';
    this.service.UploadExcel(formData).subscribe(result => {  
      this.allOrders = result;
      
    });   
  
  }  
} 