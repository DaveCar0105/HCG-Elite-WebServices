import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import { environment } from 'src/environments/environment';
import * as fs from 'file-saver';
import { Observable } from 'rxjs';
const headersOauth = {
  headers: new HttpHeaders()
    .append('Content-Type', 'application/json')
};
@Injectable({
    providedIn: 'root'
  })
  export class ReporteControlService {
    url = environment.urlApiColombia;

    constructor(private http: HttpClient){

    } 
    getReporte(filtro:any) : Observable<any> {
      return this.http.post<any>(this.url + 'Sincro/Reporte', filtro, headersOauth);
    }

    generarExcel(baseRamos:any[],baseCajas:any[],baseProblemas:any[],baseTotalRamos:any[],hidratacion:any[],empaque:any[],temperatura:any[],actividad:any[]){
      let workbook = new Workbook();

      let worksheet = workbook.addWorksheet('BASE GENERAL Ramos', {
        views: [{ showGridLines: true }],
        pageSetup: { paperSize: 9, draft: false,scale: 60, margins: {
          left: 0, right: 0,
          top: 0, bottom: 0,
          header: 0, footer: 0
        } }
      });
      let cabeceraBaseGeneralRamos = [
        ["Semana","Mes","Fecha","Macro cliente","Cliente","Post cosecha", "Producto", "No orden", "Marca", "Tipo de control ramos", "Tallos / ramo", "Total ramos a despachar", "Total ramos elaborados", "% Inspeccionado", "Total ramos revisados", "Total Ramos no conformes", "% No conformes", "Ramos Conformes", "Total tallos revisados", "% Conformidad", "Atendido por", "Qc", "Derrogación", "Derrogado por"]
      ];

      
      
      cabeceraBaseGeneralRamos.forEach(c=>{
        let row = worksheet.addRow(c);
        row.font ={ name: 'Calibri', family: 4, size: 9 ,bold:true ,color: {argb: 'FFFFFFFF'} };
        row.alignment = {horizontal:'center',vertical:'middle',wrapText: true};
        
        for (var i = 1; i <= row.cellCount; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
          }
          row.getCell(i).fill = {
            type: 'pattern',
            pattern:'solid',
            fgColor:{argb:'FF00B0F0'}
          };
        }
      });

      worksheet.getRow(1).height = 20;
      baseRamos.forEach(br=>{
        let row = worksheet.addRow(br);
        row.font ={ name: 'Calibri', family: 4, size: 9  };
        row.alignment = {horizontal:'center',vertical:'middle',wrapText: true};
        for (var i = 1; i <= row.cellCount; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
          }
        }
      });

      let worksheet1 = workbook.addWorksheet('BASE GENERAL cajas emp', {
        views: [{ showGridLines: true }],
        pageSetup: { paperSize: 9, draft: false,scale: 60, margins: {
          left: 0, right: 0,
          top: 0, bottom: 0,
          header: 0, footer: 0
        } }
      });
      let cabeceraBaseGeneralCajas = [
        ["Semana","Mes","Fecha","Macro cliente","Cliente","Post cosecha", "Producto", "No orden", "Marca", "Total ramos/caja", "Tallos / ramo", "Total cajas a despachar", "% Inspeccionado cajas", "Total cajas revisadas", "Cajas no conformes", "% Cajas no conformes", "Qc"]
      ];
      cabeceraBaseGeneralCajas.forEach(c=>{
        let row = worksheet1.addRow(c);
        
        row.font ={ name: 'Calibri', family: 4, size: 9 ,bold:true ,color: {argb: 'FFFFFFFF'} };
        row.alignment = {horizontal:'center',vertical:'middle',wrapText: true};
        for (var i = 1; i <= row.cellCount; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
          }
          row.getCell(i).fill = {
            type: 'pattern',
            pattern:'solid',
            fgColor:{argb:'FF00B0F0'}
          };
        }
      });
      baseCajas.forEach(br=>{
        let row = worksheet1.addRow(br);
        row.font ={ name: 'Calibri', family: 4, size: 9  };
        row.alignment = {horizontal:'center',vertical:'middle',wrapText: true};
        for (var i = 1; i <= row.cellCount; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
          }
        }
      });

      let worksheet2 = workbook.addWorksheet('BASE PROBLEMAS (ramo - empaque)', {
        views: [{ showGridLines: true }],
        pageSetup: { paperSize: 9, draft: false,scale: 60, margins: {
          left: 0, right: 0,
          top: 0, bottom: 0,
          header: 0, footer: 0
        } }
      });
      let cabeceraBaseProblemas = [
        ["Semana","Mes","Fecha","Macro cliente","Cliente","Post cosecha", "Producto", "No orden", "Marca", "Indicador", "Causa", "Código Item", "Causa Relacionada", "Repetición causas ramo - cajas", "Control ramos"]
      ];
      cabeceraBaseProblemas.forEach(c=>{
        let row = worksheet2.addRow(c);
        row.font ={ name: 'Calibri', family: 4, size: 9 ,bold:true ,color: {argb: 'FFFFFFFF'} };
        row.alignment = {horizontal:'center',vertical:'middle',wrapText: true};
        for (var i = 1; i <= row.cellCount; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
          }
          row.getCell(i).fill = {
            type: 'pattern',
            pattern:'solid',
            fgColor:{argb:'FF00B0F0'}
          };
        }
      });
      baseProblemas.forEach(br=>{
        let row = worksheet2.addRow(br);
        row.font ={ name: 'Calibri', family: 4, size: 9  };
        row.alignment = {horizontal:'center',vertical:'middle',wrapText: true};
        for (var i = 1; i <= row.cellCount; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
          }
        }
      });


      let worksheet3 = workbook.addWorksheet('BASE TOTAL RAMOS', {
        views: [{ showGridLines: true }],
        pageSetup: { paperSize: 9, draft: false,scale: 60, margins: {
          left: 0, right: 0,
          top: 0, bottom: 0,
          header: 0, footer: 0
        } }
      });
      let cabeceraBaseTotalRamos = [
        ["Semana","Mes","Fecha","Macro cliente","Cliente","Post cosecha", "Producto", "No orden", "Marca", "Indicador", "Causa", "Código Item", "Causa Relacionada", "Totales ramo - cajas", "Control ramos"]
      ];
      cabeceraBaseTotalRamos.forEach(c=>{
        let row = worksheet3.addRow(c);
        row.font ={ name: 'Calibri', family: 4, size: 9 ,bold:true ,color: {argb: 'FFFFFFFF'} };
        row.alignment = {horizontal:'center',vertical:'middle',wrapText: true};
        for (var i = 1; i <= row.cellCount; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
          }
          row.getCell(i).fill = {
            type: 'pattern',
            pattern:'solid',
            fgColor:{argb:'FF00B0F0'}
          };
        }
      });
      baseTotalRamos.forEach(br=>{
        let row = worksheet3.addRow(br);
        row.font ={ name: 'Calibri', family: 4, size: 9  };
        row.alignment = {horizontal:'center',vertical:'middle',wrapText: true};
        for (var i = 1; i <= row.cellCount; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
          }
        }
      });


      let worksheet4 = workbook.addWorksheet('CHECK LIST (Hidratación)', {
        views: [{ showGridLines: true }],
        pageSetup: { paperSize: 9, draft: false,scale: 60, margins: {
          left: 0, right: 0,
          top: 0, bottom: 0,
          header: 0, footer: 0
        } }
      });
      let cabeceraHidratacion = [
        ["Semana","Mes","Fecha","Post cosecha", "Item de control", "Cumple", "No cumple"]
      ];
      cabeceraHidratacion.forEach(c=>{
        let row = worksheet4.addRow(c);
        row.font ={ name: 'Calibri', family: 4, size: 9 ,bold:true ,color: {argb: 'FFFFFFFF'} };
        row.alignment = {horizontal:'center',vertical:'middle',wrapText: true};
        for (var i = 1; i <= row.cellCount; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
          }
          row.getCell(i).fill = {
            type: 'pattern',
            pattern:'solid',
            fgColor:{argb:'FF00B0F0'}
          };
        }
      });
      hidratacion.forEach(br=>{
        let row = worksheet4.addRow(br);
        row.font ={ name: 'Calibri', family: 4, size: 9  };
        row.alignment = {horizontal:'center',vertical:'middle',wrapText: true};
        for (var i = 1; i <= row.cellCount; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
          }
        }
      });

      let worksheet5 = workbook.addWorksheet('CHECK LIST (Empaque)', {
        views: [{ showGridLines: true }],
        pageSetup: { paperSize: 9, draft: false,scale: 60, margins: {
          left: 0, right: 0,
          top: 0, bottom: 0,
          header: 0, footer: 0
        } }
      });
      let cabeceraEmpaque = [
        ["Semana","Mes","Fecha","Post cosecha", "Item de control", "Cumple", "No cumple"]
      ];
      cabeceraEmpaque.forEach(c=>{
        let row = worksheet5.addRow(c);
        row.font ={ name: 'Calibri', family: 4, size: 9 ,bold:true ,color: {argb: 'FFFFFFFF'} };
        row.alignment = {horizontal:'center',vertical:'middle',wrapText: true};
        for (var i = 1; i <= row.cellCount; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
          }
          row.getCell(i).fill = {
            type: 'pattern',
            pattern:'solid',
            fgColor:{argb:'FF00B0F0'}
          };
        }
      });
      empaque.forEach(br=>{
        let row = worksheet5.addRow(br);
        row.font ={ name: 'Calibri', family: 4, size: 9  };
        row.alignment = {horizontal:'center',vertical:'middle',wrapText: true};
        for (var i = 1; i <= row.cellCount; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
          }
        }
      });

      let worksheet6 = workbook.addWorksheet('Datos temp', {
        views: [{ showGridLines: true }],
        pageSetup: { paperSize: 9, draft: false,scale: 60, margins: {
          left: 0, right: 0,
          top: 0, bottom: 0,
          header: 0, footer: 0
        } }
      });
      let cabeceraTemperatura = [
        ["Semana","Mes","Fecha","Post cosecha", "Item de control", "Valor"]
      ];
      cabeceraTemperatura.forEach(c=>{
        let row = worksheet6.addRow(c);
        row.font ={ name: 'Calibri', family: 4, size: 9 ,bold:true ,color: {argb: 'FFFFFFFF'} };
        row.alignment = {horizontal:'center',vertical:'middle',wrapText: true};
        for (var i = 1; i <= row.cellCount; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
          }
          row.getCell(i).fill = {
            type: 'pattern',
            pattern:'solid',
            fgColor:{argb:'FF00B0F0'}
          };
        }
        
      });
      temperatura.forEach(br=>{
        let row = worksheet6.addRow(br);
        row.font ={ name: 'Calibri', family: 4, size: 9  };
        row.alignment = {horizontal:'center',vertical:'middle',wrapText: true};
        for (var i = 1; i <= row.cellCount; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
          }
        }
      });

      let worksheet7 = workbook.addWorksheet('ACTIVIDADES QC', {
        views: [{ showGridLines: true }],
        pageSetup: { paperSize: 9, draft: false,scale: 60, margins: {
          left: 0, right: 0,
          top: 0, bottom: 0,
          header: 0, footer: 0
        } }
      });
      let cabeceraActividad = [
        ["Semana","Mes","Fecha","Post cosecha", "Código QC", "Actividad", "Tiempo"]
      ];
      cabeceraActividad.forEach(c=>{
        let row = worksheet7.addRow(c);
        row.font ={ name: 'Calibri', family: 4, size: 9 ,bold:true ,color: {argb: 'FFFFFFFF'} };
        row.alignment = {horizontal:'center',vertical:'middle',wrapText: true};
        for (var i = 1; i <= row.cellCount; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
          }
          row.getCell(i).fill = {
            type: 'pattern',
            pattern:'solid',
            fgColor:{argb:'FF00B0F0'}
          };
        }
      });
      actividad.forEach(br=>{
        let row = worksheet7.addRow(br);
        row.font ={ name: 'Calibri', family: 4, size: 9  };
        row.alignment = {horizontal:'center',vertical:'middle',wrapText: true};
        for (var i = 1; i <= row.cellCount; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
          }
        }
      });
      //Proceso Maritimo
      let worksheetProcesoMaritimo = workbook.addWorksheet('PROCESO MARITIMO', {
        views: [{ showGridLines: true }],
        pageSetup: { paperSize: 9, draft: false,scale: 60, margins: {
          left: 0, right: 0,
          top: 0, bottom: 0,
          header: 0, footer: 0
        } }
      });
      let cabeceraBaseGeneralRamosmARITIMO = [
        ["Semana","Mes","Fecha","Macro cliente","Cliente","Post cosecha", "Producto", "No orden", "Marca", "Tipo de control ramos", "Tallos / ramo", "Total ramos a despachar", "Total ramos elaborados", "% Inspeccionado", "Total ramos revisados", "Total Ramos no conformes", "% No conformes", "Ramos Conformes", "Total tallos revisados", "% Conformidad", "Atendido por", "Qc", "Derrogación", "Derrogado por"]
      ];

      
      
      cabeceraBaseGeneralRamosmARITIMO.forEach(c=>{
        let row = worksheet.addRow(c);
        row.font ={ name: 'Calibri', family: 4, size: 9 ,bold:true ,color: {argb: 'FFFFFFFF'} };
        row.alignment = {horizontal:'center',vertical:'middle',wrapText: true};
        
        for (var i = 1; i <= row.cellCount; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
          }
          row.getCell(i).fill = {
            type: 'pattern',
            pattern:'solid',
            fgColor:{argb:'FF00B0F0'}
          };
        }
      });
      
      worksheet.getRow(1).height = 20;
      baseRamos.forEach(br=>{
        let row = worksheet.addRow(br);
        row.font ={ name: 'Calibri', family: 4, size: 9  };
        row.alignment = {horizontal:'center',vertical:'middle',wrapText: true};
        for (var i = 1; i <= row.cellCount; i++) {
          row.getCell(i).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            bottom: { style: 'thin' },
          }
        }
      });
      workbook.xlsx.writeBuffer().then((data) => {
        this.saveAsExcelFile(data, 'ReporteAgencia');
      })
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
      const data: Blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      fs.saveAs(data, fileName + '_' + new Date().getTime() + '.xlsx');
      
    }
  }