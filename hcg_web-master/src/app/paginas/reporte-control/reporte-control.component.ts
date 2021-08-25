import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { CirculoCalidadCausas, CirculoCalidadClientes, CirculoCalidadLinea, CirculoCalidadNumeroMesa, CirculoCalidadProductos, CirculoCalidadVariedad } from 'src/dto/circuloCalidad.dto';
import { ProcesoMaritimo } from 'src/models/cliente';
import { ReporteControlService } from './reporte-control.service';

@Component({
    selector: 'app-reporte-control',
    templateUrl: './reporte-control.component.html',
    styleUrls: ['./reporte-control.component.css']
  })
  export class ReporteControlComponent {
    public spinnerName: string;
    public spinnerType: string;

    fecha_desde;
    fecha_hasta;
    elite;
    baseRamos =[];
    baseRamosBanda =[];
    baseCajas =[];
    baseProblemas =[];
    baseTotalRamos =[];
    hidratacion =[];
    empaque =[];
    temperatura =[];
    actividad = [];
    circuloCalidadCausas = [];
    circuloCalidadClientes = [];
    circuloCalidadProductos = [];
    circuloCalidadVariedad = [];
    circuloCalidadLinea = [];
    circuloCalidadNumeroMesa = [];
    procesoMaritimo = [];
    constructor(private _httpReporte:ReporteControlService,private spinner: NgxSpinnerService){
      this.spinnerName = "spinnerReporteFinca";
      this.spinnerType = "square-spin";
    }

    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
      this.fecha_desde = event.value;
    }
    addEvent1(type: string, event: MatDatepickerInputEvent<Date>) {
      this.fecha_hasta = event.value;
    }
    generar(){
      this.spinner.show(this.spinnerName);
      var parametros = {
        fecha_desde:this.fecha_desde,
        fecha_hasta:this.fecha_hasta,
        tipo:this.elite?1:2
      };
      this._httpReporte.getReporte(parametros).subscribe(r=>{
        this.baseRamos =[];
        this.baseRamosBanda =[];
        this.baseCajas =[];
        this.baseProblemas =[];
        this.baseTotalRamos =[];
        this.hidratacion =[];
        this.empaque =[];
        this.temperatura =[];
        this.actividad = [];
        this.circuloCalidadCausas = [];
        this.circuloCalidadClientes = [];
        this.circuloCalidadProductos = [];
        this.circuloCalidadVariedad = [];
        this.circuloCalidadNumeroMesa = [];
        this.circuloCalidadLinea = [];
        this.procesoMaritimo = [];
        let baseR = r.baseRamos;
        let baseBanda = r.baseRamosBanda;
        let baseC = r.baseCajas;
        let baseP = r.problemasRamoEmpaque;
        let baseT = r.baseTotalRamos;
        let chlH = r.chlHidratacion;
        let chlE = r.chlEmpaque;
        let chlT = r.temperaturas;
        let chlA = r.actividadesQC;
        let procesoMa:Array<ProcesoMaritimo> = r.procesoMaritimo;
        let circuloCalCausas:Array<CirculoCalidadCausas> = r.circuloCalidadCausas;
        let circuloCalCliente:Array<CirculoCalidadClientes> = r.circuloCalidadClientes;
        let circuloCalProducto:Array<CirculoCalidadProductos> = r.circuloCalidadProductos;
        let circuloCalVariedad:Array<CirculoCalidadVariedad> = r.circuloCalidadVariedades;
        let circuloCalLinea:Array<CirculoCalidadLinea> = r.circuloCalidadLineas;
        let circuloCalNumeroMesa:Array<CirculoCalidadNumeroMesa> = r.circuloCalidadNumeroMesas;
        

        for(var i = 0 ;i<baseR.length; i++){
          this.baseRamos.push([baseR[i].semana,baseR[i].mes,baseR[i].fecha,baseR[i].clienteMacro,baseR[i].cliente,baseR[i].postCosecha,baseR[i].producto,baseR[i].ordenNo,baseR[i].marca,baseR[i].tipo,baseR[i].tallos,baseR[i].ramosDespachar,baseR[i].ramosElaborados,baseR[i].inspeccionado+'%',baseR[i].ramosRevisados,baseR[i].ramosNoConformes,baseR[i].porcentajeNoConformes+'%',baseR[i].ramosConformes,baseR[i].tallosRevisados,baseR[i].porcentajeConformidad+'%',baseR[i].atendidoPor,baseR[i].qc,baseR[i].derrogacion?'SI':'NO',baseR[i].derrogadoPor]);
        };
        for(var i = 0 ;i<baseBanda.length; i++){
          this.baseRamosBanda.push([baseBanda[i].semana,baseBanda[i].mes,baseBanda[i].fecha,baseBanda[i].clienteMacro,baseBanda[i].cliente,baseBanda[i].postCosecha,baseBanda[i].producto,baseBanda[i].ordenNo,baseBanda[i].marca,baseBanda[i].tipo,baseBanda[i].tallos,baseBanda[i].ramosDespachar,baseBanda[i].ramosElaborados,baseBanda[i].inspeccionado+'%',baseBanda[i].ramosRevisados,baseBanda[i].ramosNoConformes,baseBanda[i].porcentajeNoConformes+'%',baseBanda[i].ramosConformes,baseBanda[i].tallosRevisados,baseBanda[i].porcentajeConformidad+'%',baseBanda[i].atendidoPor,baseBanda[i].qc,baseBanda[i].derrogacion?'SI':'NO',baseBanda[i].derrogadoPor]);
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
        procesoMa.forEach(pro => {
          this.procesoMaritimo.push(
            [
              pro.semana,pro.mes, pro.fecha, pro.postCosecha, pro.codigoQc, pro.cliente, pro.numeroGuia, pro.proceso,
              pro.codigoRamosControl, pro.ramosControl, pro.cumple, pro.noCumple, pro.noAplica
            ]
          )
        });
        circuloCalCausas.forEach(pro => {
          this.circuloCalidadCausas.push(
            [pro.semana,pro.mes, pro.fecha, pro.postCosecha, pro.numeroReunion, pro.causa, pro.causaRelacionada, pro.indice,pro.porDistribucion]
          )
        });
        circuloCalCliente.forEach(pro => {
          this.circuloCalidadClientes.push(
            [pro.semana,pro.mes, pro.fecha, pro.postCosecha, pro.numeroReunion, pro.cliente, pro.ramosRevisados, pro.ramosRechazados,pro.porNoConformidad]
          )
        });
        circuloCalProducto.forEach(pro => {
          this.circuloCalidadProductos.push(
            [pro.semana,pro.mes, pro.fecha, pro.postCosecha, pro.numeroReunion, pro.producto, pro.ramosRevisados, pro.ramosRechazados,pro.porNoConformidad]
          )
        });
        circuloCalVariedad.forEach(pro => {
          this.circuloCalidadVariedad.push(
            [pro.semana,pro.mes, pro.fecha, pro.postCosecha, pro.numeroReunion, pro.variedad, pro.incidenciaRamos,pro.porcentajeIncidencia]
          )
        });
        circuloCalLinea.forEach(pro => {
          this.circuloCalidadLinea.push(
            [pro.semana,pro.mes, pro.fecha, pro.postCosecha, pro.numeroReunion, pro.linea, pro.incidenciaRamos,pro.porcentajeIncidencia]
          )
        });
        circuloCalNumeroMesa.forEach(pro => {
          this.circuloCalidadNumeroMesa.push(
            [pro.semana,pro.mes, pro.fecha, pro.postCosecha, pro.numeroReunion, pro.numeroMesa, pro.incidenciaRamos,pro.porcentajeIncidencia]
          )
        });
        this.spinner.hide(this.spinnerName);
        this._httpReporte.generarExcel(this.baseRamos,this.baseRamosBanda, this.baseCajas,this.baseProblemas,this.baseTotalRamos,this.hidratacion,
          this.empaque,this.temperatura,this.actividad, this.procesoMaritimo,
          this.circuloCalidadCausas, this.circuloCalidadClientes, this.circuloCalidadProductos,this.circuloCalidadVariedad, this.circuloCalidadNumeroMesa, this.circuloCalidadLinea
        );
      },
       err=> this.spinner.hide(this.spinnerName)
      );
    }

  }