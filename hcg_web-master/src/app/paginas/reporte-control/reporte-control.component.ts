import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ReporteControlService } from './reporte-control.service';

@Component({
    selector: 'app-reporte-control',
    templateUrl: './reporte-control.component.html',
    styleUrls: ['./reporte-control.component.css']
  })
  export class ReporteControlComponent {
    fecha_desde;
    fecha_hasta;
    elite;
    baseRamos =[];
    baseCajas =[];
    baseProblemas =[];
    baseTotalRamos =[];
    hidratacion =[];
    empaque =[];
    temperatura =[];
    actividad = [];
    constructor(private _httpReporte:ReporteControlService){

    }
    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
      this.fecha_desde = event.value;
    }
    addEvent1(type: string, event: MatDatepickerInputEvent<Date>) {
      this.fecha_hasta = event.value;
    }
    generar(){
      var parametros = {
        fecha_desde:this.fecha_desde,
        fecha_hasta:this.fecha_hasta,
        tipo:this.elite?1:2
      };
      this._httpReporte.getReporte(parametros).subscribe(r=>{
        this.baseRamos =[];
        this.baseCajas =[];
        this.baseProblemas =[];
        this.baseTotalRamos =[];
        this.hidratacion =[];
        this.empaque =[];
        this.temperatura =[];
        this.actividad = [];
        let baseR = r.baseRamos;
        let baseC = r.baseCajas;
        let baseP = r.problemasRamoEmpaque;
        let baseT = r.baseTotalRamos;
        let chlH = r.chlHidratacion;
        let chlE = r.chlEmpaque;
        let chlT = r.temperaturas;
        let chlA = r.actividadesQC;
        console.log(baseR.length);
        for(var i = 0 ;i<baseR.length; i++){
          this.baseRamos.push([baseR[i].semana,baseR[i].mes,baseR[i].fecha,baseR[i].clienteMacro,baseR[i].cliente,baseR[i].postCosecha,baseR[i].producto,baseR[i].ordenNo,baseR[i].marca,baseR[i].tipo,baseR[i].tallos,baseR[i].ramosDespachar,baseR[i].ramosElaborados,baseR[i].inspeccionado+'%',baseR[i].ramosRevisados,baseR[i].ramosNoConformes,baseR[i].porcentajeNoConformes+'%',baseR[i].ramosConformes,baseR[i].tallosRevisados,baseR[i].porcentajeConformidad+'%',baseR[i].atendidoPor,baseR[i].qc,baseR[i].derrogacion?'SI':'NO',baseR[i].derrogadoPor]);
        };
        for(var i = 0 ;i<baseC.length; i++){
          this.baseCajas.push([baseC[i].semana,baseC[i].mes,baseC[i].fecha,baseC[i].clienteMacro,baseC[i].cliente,baseC[i].postCosecha,baseC[i].producto,baseC[i].ordenNo,baseC[i].marca,baseC[i].ramosCaja,baseC[i].tallosRamo,baseC[i].cajasDespachar,baseC[i].inspeccionado+'%',baseC[i].cajasRevisadas,baseC[i].cajasNoConformes,baseC[i].porcentajeNoConformes+'%',baseC[i].Qc]);
        };
        for(var i = 0 ;i<baseP.length; i++){
          this.baseProblemas.push([baseP[i].semana,baseP[i].mes,baseP[i].fecha,baseP[i].clienteMacro,baseP[i].cliente,baseP[i].postCosecha,baseP[i].producto,baseP[i].ordenNo,baseP[i].marca,baseP[i].indicador,baseP[i].causa,baseP[i].codigoItem,baseP[i].causaRelacionada,baseP[i].repeticion,baseP[i].tipo]);
        };
        for(var i = 0 ;i<baseT.length; i++){
          this.baseTotalRamos.push([baseT[i].semana,baseT[i].mes,baseT[i].fecha,baseT[i].clienteMacro,baseT[i].cliente,baseT[i].postCosecha,baseT[i].producto,baseT[i].ordenNo,baseT[i].marca,baseT[i].indicador,baseT[i].causa,baseT[i].codigoItem,baseT[i].causaRelacionada,baseT[i].totalRamosCajas,baseT[i].tipo]);
        };
        for(var i = 0 ;i<chlH.length; i++){
          this.hidratacion.push([chlH[i].semana,chlH[i].mes,chlH[i].fecha,chlH[i].postCosecha,chlH[i].itemControl,chlH[i].cumple?'1':'0',!chlH[i].cumple?'1':'0']);
        };
        for(var i = 0 ;i<chlE.length; i++){
          this.empaque.push([chlE[i].semana,chlE[i].mes,chlE[i].fecha,chlE[i].postCosecha,chlE[i].itemControl,chlE[i].cumple?'1':'0',!chlE[i].cumple?'1':'0']);
        };
        for(var i = 0 ;i<chlT.length; i++){
          this.temperatura.push([chlT[i].semana,chlT[i].mes,chlT[i].fecha,chlT[i].postCosecha,chlT[i].itemControl,chlT[i].valor]);
        };
        for(var i = 0 ;i<chlA.length; i++){
          this.actividad.push([chlA[i].semana,chlA[i].mes,chlA[i].fecha,chlA[i].postCosecha,chlA[i].codigoQC,chlA[i].actividad,chlA[i].tiempo]);
        };
        this._httpReporte.generarExcel(this.baseRamos,this.baseCajas,this.baseProblemas,this.baseTotalRamos,this.hidratacion,this.empaque,this.temperatura,this.actividad);
      });
    }

  }