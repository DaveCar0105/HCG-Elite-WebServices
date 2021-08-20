import { Component, OnInit, Inject } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ExcelService } from './reporte-agencia.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ClienteService } from 'src/services/cliente.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-reporte-agencia',
  templateUrl: './reporte-agencia.component.html',
  styleUrls: ['./reporte-agencia.component.css']
})
export class ReporteAgenciaComponent {
  displayedColumns: string[] = ['cliente', 'finca', 'agencia', 'fecha', 'id'];
  dataSource;
  datos;
  rep;
  fal;
  mer;
  peEx;
  eviEx;
  cabecera;
  cajasExcel;
  tempInterno;
  tempExterna;
  urlServidor = "http://185.254.206.121:81";
  proto;
  variableBool=true;
  falenciasExcel;
  falenciasExcelColor;
  evidenciasExcel;
  pie;
  listaDeFalencias;
  listaFalTotales;
  cajasTemporales;
  kas;
  clientes=[];
  fecha_desde: Date;
  fecha_hasta: Date;
  clienteId;
  public captureScreen() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });
  }
  constructor(private excelService: ExcelService,_httpCliente:ClienteService ,public dialog: MatDialog) {
    _httpCliente.getClientes().subscribe(
      cli =>{
        this.clientes = cli;
      }
    );
    
  }
  buscar(){
    this.datos = [];
    this.fal = [];
    this.excelService.getReporte({fechaDesde:this.fecha_desde,fechaHasta:this.fecha_hasta,clienteId:this.clienteId}).subscribe(data => {      this.datos = data;
      var dat = [];
      this.datos.forEach(element => {
        var item = {
          cliente: element.clienteNombre,
          finca: element.fincaNombre,
          agencia: element.agenciaNombre,
          fecha: element.fecha,
          id: element.id,
          codigo: element.codigo
        }
        dat.push(item);

      });
      this.dataSource = dat;
    });
    
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.fecha_desde = event.value;
  }
  addEvent1(type: string, event: MatDatepickerInputEvent<Date>) {
    this.fecha_hasta = event.value;
  }
  toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}
  async generar(reporte_id ) {
    let listaColores = [];
    let listaEvidencias = [];
    let reporte = this.datos.find(c=>{
      return c.id == reporte_id
    });

    this.excelService.getBase64ImageFromURL(this.urlServidor+'/elementos/verde.png').subscribe(
      (verde: string) => {
        listaColores.push(verde);
        this.excelService.getBase64ImageFromURL(this.urlServidor+'/elementos/amarillo.png').subscribe(
          (amarillo: string) => {
            listaColores.push(amarillo);
            this.excelService.getBase64ImageFromURL(this.urlServidor+'/elementos/rojo.png').subscribe(
              (rojo: string) => {
                listaColores.push(rojo);
                this.excelService.getBase64ImageFromURL(this.urlServidor+'/elementos/logo.jpeg').subscribe(
                  (logo: string) => {
                    listaColores.push(logo);
                      this.excelService.getBase64ImageFromURL(this.urlServidor+reporte.evidencias[0]).subscribe(
                        (logo: string) => {
                          var evidencia = {
                            orden:0,
                            valor:logo
                          }
                          listaEvidencias.push(evidencia);
                          this.excelService.getBase64ImageFromURL(this.urlServidor+reporte.evidencias[1]).subscribe(
                            (logo: string) => {
                              var evidencia = {
                                orden:1,
                                valor:logo
                              }
                              listaEvidencias.push(evidencia);
                              this.excelService.getBase64ImageFromURL(this.urlServidor+reporte.evidencias[2]).subscribe(
                                (logo: string) => {
                                  var evidencia = {
                                    orden:2,
                                    valor:logo
                                  }
                                  listaEvidencias.push(evidencia);
                                  this.excelService.getBase64ImageFromURL(this.urlServidor+reporte.evidencias[3]).subscribe(
                                    (logo: string) => {
                                      var evidencia = {
                                        orden:3,
                                        valor:logo
                                      }
                                      listaEvidencias.push(evidencia);
                                      this.excelService.getBase64ImageFromURL(this.urlServidor+reporte.evidencias[4]).subscribe(
                                        (logo: string) => {
                                          var evidencia = {
                                            orden:4,
                                            valor:logo
                                          }
                                          listaEvidencias.push(evidencia);
                                          this.excelService.getBase64ImageFromURL(this.urlServidor+reporte.evidencias[5]).subscribe(
                                            (logo: string) => {
                                              var evidencia = {
                                                orden:5,
                                                valor:logo
                                              }
                                              listaEvidencias.push(evidencia);
                                              this.excelService.getBase64ImageFromURL(this.urlServidor+reporte.evidencias[6]).subscribe(
                                                (logo: string) => {
                                                  var evidencia = {
                                                    orden:6,
                                                    valor:logo
                                                  }
                                                  listaEvidencias.push(evidencia);
                                                  this.excelService.getBase64ImageFromURL(this.urlServidor+reporte.evidencias[7]).subscribe(
                                                    (logo: string) => {
                                                      var evidencia = {
                                                        orden:7,
                                                        valor:logo
                                                      }
                                                      listaEvidencias.push(evidencia);
                                                      this.excelService.getBase64ImageFromURL(this.urlServidor+reporte.evidencias[8]).subscribe(
                                                        (logo: string) => {
                                                          var evidencia = {
                                                            orden:8,
                                                            valor:logo
                                                          }
                                                          listaEvidencias.push(evidencia);
                                                          this.excelService.getBase64ImageFromURL(this.urlServidor+reporte.evidencias[9]).subscribe(
                                                            (logo: string) => {
                                                              var evidencia = {
                                                                orden:9,
                                                                valor:logo
                                                              }
                                                              listaEvidencias.push(evidencia);
                                                              this.excelService.getBase64ImageFromURL(this.urlServidor+reporte.evidencias[10]).subscribe(
                                                                (logo: string) => {
                                                                  var evidencia = {
                                                                    orden:10,
                                                                    valor:logo
                                                                  }
                                                                  listaEvidencias.push(evidencia);
                                                                  this.excelService.getBase64ImageFromURL(this.urlServidor+reporte.evidencias[11]).subscribe(
                                                                    (logo: string) => {
                                                                      var evidencia = {
                                                                        orden:11,
                                                                        valor:logo
                                                                      }
                                                                      listaEvidencias.push(evidencia);
                                                                      this.excelService.getBase64ImageFromURL(this.urlServidor+reporte.evidencias[12]).subscribe(
                                                                        (logo: string) => {
                                                                          var evidencia = {
                                                                            orden:12,
                                                                            valor:logo
                                                                          }
                                                                          listaEvidencias.push(evidencia);
                                                                          this.excelService.getBase64ImageFromURL(this.urlServidor+reporte.evidencias[13]).subscribe(
                                                                            (logo: string) => {
                                                                              var evidencia = {
                                                                                orden:13,
                                                                                valor:logo
                                                                              }
                                                                              listaEvidencias.push(evidencia);
                                                                              this.excelService.getBase64ImageFromURL(this.urlServidor+reporte.evidencias[14]).subscribe(
                                                                                (logo: string) => {
                                                                                  var evidencia = {
                                                                                    orden:14,
                                                                                    valor:logo
                                                                                  }
                                                                                  listaEvidencias.push(evidencia);
                                                                                  this.excelService.getBase64ImageFromURL(this.urlServidor+reporte.evidencias[15]).subscribe(
                                                                                    (logo: string) => {
                                                                                      var evidencia = {
                                                                                        orden:15,
                                                                                        valor:logo
                                                                                      }
                                                                                      listaEvidencias.push(evidencia);
                                                                                      this.excelService.getBase64ImageFromURL(this.urlServidor+reporte.evidencias[16]).subscribe(
                                                                                        (logo: string) => {
                                                                                          var evidencia = {
                                                                                            orden:16,
                                                                                            valor:logo
                                                                                          }
                                                                                          listaEvidencias.push(evidencia);
                                                                                          this.excelService.getBase64ImageFromURL(this.urlServidor+reporte.evidencias[17]).subscribe(
                                                                                            (logo: string) => {
                                                                                              var evidencia = {
                                                                                                orden:17,
                                                                                                valor:logo
                                                                                              }
                                                                                              listaEvidencias.push(evidencia);
                                                                                              this.excelService.getBase64ImageFromURL(this.urlServidor+reporte.evidencias[18]).subscribe(
                                                                                                (logo: string) => {
                                                                                                  var evidencia = {
                                                                                                    orden:18,
                                                                                                    valor:logo
                                                                                                  }
                                                                                                  listaEvidencias.push(evidencia);
                                                                                                  this.excelService.getBase64ImageFromURL(this.urlServidor+reporte.evidencias[19]).subscribe(
                                                                                                    (logo: string) => {
                                                                                                      var evidencia = {
                                                                                                        orden:19,
                                                                                                        valor:logo
                                                                                                      }
                                                                                                      listaEvidencias.push(evidencia);
                                                                                                      var numero = 20;
                                                                                                      if(reporte.evidencias.length==20){
                                                                                                        this.excelService.getBase64ImageFromURL("http://185.254.206.121:81/client/"+reporte.clienteUrl).subscribe(
                                                                                                          (logoCli:string)=>{
                                                                                                            this.excelService.generarExcel(listaColores,listaEvidencias,reporte,logoCli);
                                                                                                          }
                                                                                                        );
                                                                                                      }

                                                                                                      for(var evi=20;evi<reporte.evidencias.length;evi++){
                                                                                                        
                                                                                                        this.excelService.getBase64ImageFromURL(this.urlServidor+reporte.evidencias[evi]).subscribe(
                                                                                                          (logo:string)=>{
                                                                                                            listaEvidencias.push({
                                                                                                              orden:evi,
                                                                                                              valor:logo
                                                                                                            });
                                                                                                            numero++;
                                                                                                            if(numero==reporte.evidencias.length){
                                                                                                              this.excelService.getBase64ImageFromURL("http://185.254.206.121:81/client/"+reporte.clienteUrl).subscribe(
                                                                                                              (logoCli:string)=>{
                                                                                                                this.excelService.generarExcel(listaColores,listaEvidencias,reporte,logoCli);
                                                                                                              }
                                                                                                            );
                                                                                                            }
                                                                                                          }
                                                                                                        )
                                                                                                        
                                                                                                      }
                                                                                                      

                                                                                                      
                                                                                                    }
                                                                                                  );
                                                                                                  
                                                                                                }
                                                                                              );
                                                                                            }
                                                                                          );
                                                                                        }
                                                                                      );
                                                                                    }
                                                                                  );
                                                                                }
                                                                              );
                                                                            }
                                                                          );
                                                                        }
                                                                      );
                                                                    }
                                                                  );
                                                                }
                                                              );
                                                            }
                                                          );
                                                        }
                                                      );
                                                    }
                                                  );
                                                }
                                              );
                                            }
                                          );
                                        }
                                      );
                                    }
                                  );
                                }
                              );
                            }
                          );
                        }
                      );
                      
                      
                      
                      
                      
                      
                      
                    }
                  
                );

              }
            );
          }
        );
      }
    );
  }


  

}