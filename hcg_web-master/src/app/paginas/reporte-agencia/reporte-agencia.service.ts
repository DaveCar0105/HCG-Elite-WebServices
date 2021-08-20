import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { DatePipe } from '@angular/common';
import { Observable, Observer } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IfStmt } from '@angular/compiler';
import { MarcacionService } from 'src/services/marcacion.service';
import { lineBreak } from 'html2canvas/dist/types/css/property-descriptors/line-break';
const headersOauth = {
  headers: new HttpHeaders()
    .append('Content-Type', 'application/json')
};
@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  constructor(private datePipe: DatePipe, private http: HttpClient) {
  }
  url = environment.urlApi;
  name = 'Angular';
  base64TrimmedURL: any;
  base64DefaultURL: any;
  generatedImage: any;
  longitudResumen=0;
  getReporte(filtro:any) {
    return this.http.post(this.url + 'Reportes/consultarReporte', filtro, headersOauth);
  }
  getCliente(body: any) {
    return this.http.post(this.url + 'cliente/listaClientes', body, headersOauth);
  }
  getCajas(body: any) {
    return this.http.post(this.url + 'reporte/listaCajas', body, headersOauth);
  }
  getFalencia(body: any) {
    return this.http.post(this.url + 'reporte/listaFalencias', body, headersOauth);
  }
  getFalenciaNombre(body: any) {
    return this.http.post(this.url + 'reporte/listaFalenciasIdioma', body, headersOauth);
  }
  getMercado(body: any) {
    return this.http.post(this.url + 'reporte/obtenerMercado', body, headersOauth);
  }
  getProtocolo(body: any) {
    return this.http.post(this.url + 'reporte/obtenerProtocolo', body, headersOauth);
  }
  getEvidencia(body: any) {
    return this.http.post(this.url + 'reporte/obtenerEvidencia', body, headersOauth);
  }
  getParametros(body: any) {
    return this.http.post(this.url + 'parametros/todos', body, headersOauth);
  }
  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      // create an image object
      let img = new Image();
      img.crossOrigin = 'http://localhost:4200';
      img.src = url;
      if (!img.complete) {
        // This will call another method that will create image from url
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }
  getBase64Image(img: HTMLImageElement) {
    // We create a HTML canvas object that will create a 2d image
    var canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 520;
    var ctx = canvas.getContext("2d");
    // This will draw image    
    ctx.drawImage(img, 0, 0, 600, 520);
    // Convert the drawn image to Data URL
    var dataURL = canvas.toDataURL("image/png");
    this.base64DefaultURL = dataURL;
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
  getImage(url) {
    this.getBase64ImageFromURL(url).subscribe((data: string) => {
      this.base64TrimmedURL = data;
    });
    // Naming the image
    const date = new Date().valueOf();
    let text = '';
    const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
    }
    // Replace extension according to your media type like this 
    const imageName = date + '.' + text + '.jpeg';

    // call method that creates a blob from dataUri
    let imageBlob;
    this.dataURItoBlob(this.base64TrimmedURL).subscribe(data => {
      imageBlob = data;
    });
    const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
    this.generatedImage = window.URL.createObjectURL(imageFile);
    window.open(this.generatedImage);
  }
  dataURItoBlob(dataURI): Observable<Blob> {
    return Observable.create((observer: Observer<Blob>) => {
      const byteString = window.atob(dataURI);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/jpeg' });
      observer.next(blob);
      observer.complete();
    });
  }
  
  obtenerTipo(tipo:any){
    if(tipo===0){
      return "EB";
    }else if(tipo===1){
      return "QB";
    }else if(tipo===2){
      return "HB";
    }else if(tipo===3){
      return "FB";
    }
  }
  generarExcel(listaColores: any[], listaEvidencias: any[],datos:any,logCli:string) {
    this.longitudResumen = datos.cajas.length;
    let longitudPesoVolumen = 1;
    let workbook = new Workbook();

    let worksheet = workbook.addWorksheet('AGENCY', {
      views: [{ showGridLines: false }],
      pageSetup: { paperSize: 9, orientation: 'portrait', draft: false,scale: 60, margins: {
        left: 0, right: 0,
        top: 0.1, bottom: 0.1,
        header: 0, footer: 0
      } }
    });
    
    //worksheet.pageSetup.printArea = 'A1:S92';
    
    let cabecera = [
      ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "QUALITY CONTROL REPORT", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "Think about Quality… Think about High Control Group", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "mail", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "Phones", "", "Ecuador +593 9 84015180      USA +1 786 2105547           Colombia +57 315 2557528", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
    ];

    let lineaCode = [
      ["", "", "Area","","","Operations", "Code:", "", "OP-F-001", "Version:", "", "1", "Authorized by:", "", "", "President HCG","","",""],
      
    ];


    let resumen = [
      ["", "", "SAMPLE OBSERVATIONS", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "STATE", "PIECES", "BOX TYPE", "DESCRIPTION", "", "", "", "PROBLEM", "", "", "", "", "AWB", "", "BOX", "", ""],
    ]
    var valorCaja = 1;
    var fbr = 0.0;
    var fbc = 0.0;
    var marcaciones = [];
    var numero = 1;
    datos.cajas.forEach(ck=>{
      

      var tipo = this.obtenerTipo(ck.tipo);
      
      marcaciones.push(ck.marcacionNombre);
      
      if(ck.valor.toString() === '-20'){
        if(tipo === 'FB'){
          fbr+=1;
        }
        else if(tipo === 'HB'){
          fbr+=0.5;
        }
        else if(tipo === 'QB'){
          fbr+=0.25;
        }
        else if(tipo === 'EB'){
          fbr+=0.125;
        }
      }
      else if(ck.valor.toString() === '-10'){
        if(tipo === 'FB'){
          fbc+=1;
        }
        else if(tipo === 'HB'){
          fbc+=0.5;
        }
        else if(tipo === 'QB'){
          fbc+=0.25;
        }
        else if(tipo === 'EB'){
          fbc+=0.125;
        }
      }
      var awb = ck.awb.toString().substring(0,3)+'-'+ck.awb.toString().substring(3,7)+'-'+ck.awb.toString().substring(7,11);
    
      resumen.push(["", "", ck.valor,ck.piecesNumber , tipo, ck.variedadNombre+" / "+ck.grado, "", "", "", ck.falenciaPrincipalNombre, "", "", "", "",awb , "", ck.boxNumber, "", ""]);
      valorCaja+=1;
    });

    var nombreCustumer ="";
    var marcas = marcaciones.reduce((newTempArr, el) => (newTempArr.includes(el) ? newTempArr : [...newTempArr, el]), [])

    marcas.forEach(element => {
      if(numero==marcas.length){
        nombreCustumer+=element;
      }
      else{
        nombreCustumer+=element+", ";
        numero++;
      }
    });
    var hbs = fbr*2;
    var hbtemp =[];
    var hbsr = "";
    var qbsr = "";
    if(hbs%1 > 0.0){
      hbtemp = hbs.toString().split('.',2);
      hbsr = hbtemp[0];
      var qbtemp = Number('0.'+hbtemp[1]);
      qbsr = (qbtemp*2).toString();
    }
    else{
      hbsr = hbs.toString();
    }
    
    var hbscon = fbc*2;
    var hbctemp =[];
    var hbsc = "";
    var qbsc = "";
    if(hbscon%1 > 0.0){
      hbctemp = hbscon.toString().split('.',2);
      hbsc = hbctemp[0];
      var qbctemp = Number('0.'+hbctemp[1]);
      qbsc = (qbctemp*2).toString();
    }
    else{
      hbsc = hbscon.toString();
    }
    var clientSpecsi = '';
    var clientSpecno = '';
    
    if(datos.clientSpec){
      clientSpecsi = 'x';
    }
    else{
      clientSpecno = 'x'
    }

    let info = [
      ["", "", "", "", "", "", "Farm", "", datos.fincaNombre, "", "Conditional Boxes", "", "", "hb", hbsc==="0"?"":hbsc, "qb", qbsc===""?"":qbsc, "", ""],
      ["", "", "", "", "", "", "Shipping Date", "", datos.fecha, "", "Rejection Boxes", "", "", "hb", hbsr==="0"?"":hbsr, "qb", qbsr==="0"?"":qbsr, "", ""],
      ["", "", "", "", "", "", "Shipper", "", datos.agenciaNombre, "", "Coold Room Temp ˚C", "", "", datos.tempRoom, "", "Boxes Temp ˚C", datos.tempBox, "", ""],
      ["", "", "", "", "", "", "Customer", "", nombreCustumer, "", "Technician Code", "", "", datos.codigo, "", "", "", "", ""],
      ["", "", "", "", "", "", "Market", "", datos.mercadoNombre, "", "Client Spec", "", "", "YES", clientSpecsi, "NO", clientSpecno, "", ""],
    ]
    let falencias = [
      ["", "", "QUALITY CONTROL", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "BOX AND COMPLEMENTS", "", "", "", "", "BUTTON", "", "", "", "FOLIAGE", "", "", "", "", "", "", ""],
      ["", "", datos.falencias[0].valor, datos.falencias[0].nombre, "", "", "", datos.falencias[10].valor, datos.falencias[10].nombre, "", "", datos.falencias[20].valor, datos.falencias[20].nombre, "", "", "", "", "", ""],
      ["", "", datos.falencias[1].valor, datos.falencias[1].nombre, "", "", "", datos.falencias[11].valor, datos.falencias[11].nombre, "", "", datos.falencias[21].valor, datos.falencias[21].nombre, "", "", "", "", "", ""],
      ["", "", datos.falencias[2].valor, datos.falencias[2].nombre, "", "", "", datos.falencias[12].valor, datos.falencias[12].nombre, "", "", "STEM", "", "", "", "", "", "", ""],
      ["", "", datos.falencias[3].valor, datos.falencias[3].nombre, "", "", "", datos.falencias[13].valor, datos.falencias[13].nombre, "", "", datos.falencias[22].valor, datos.falencias[22].nombre, "", "", "", "", "", ""],
      ["", "", datos.falencias[4].valor, datos.falencias[4].nombre, "", "", "", datos.falencias[14].valor, datos.falencias[14].nombre, "", "", datos.falencias[23].valor, datos.falencias[23].nombre, "", "", "", "", "", ""],
      ["", "", datos.falencias[5].valor, datos.falencias[5].nombre, "", "", "", datos.falencias[15].valor, datos.falencias[15].nombre, "", "", datos.falencias[24].valor, datos.falencias[24].nombre, "", "", "", "", "", ""],
      ["", "", datos.falencias[6].valor, datos.falencias[6].nombre, "", "", "", datos.falencias[16].valor, datos.falencias[16].nombre, "", "", datos.falencias[25].valor, datos.falencias[25].nombre, "", "", "", "", "", ""],
      ["", "", datos.falencias[7].valor, datos.falencias[7].nombre, "", "", "", datos.falencias[17].valor, datos.falencias[17].nombre, "", "", "OTHERS", "", "", "", "", "", "", ""],
      ["", "", datos.falencias[8].valor, datos.falencias[8].nombre, "", "", "", datos.falencias[18].valor, datos.falencias[18].nombre, "", "", datos.falencias[26].valor, datos.falencias[26].nombre, "", "", "", "", "", ""],
      ["", "", datos.falencias[9].valor, datos.falencias[9].nombre, "", "", "", datos.falencias[19].valor, datos.falencias[19].nombre, "", "", "0", "", "", "", "", "", "", ""]
    ]

    let evidencia = [
      ["", "", "PHOTOGRAPHIC SUPPORT", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ]
    var numeroItems = listaEvidencias.length/4;
    var espImg = 0;
    for(var item =0;item<numeroItems;item++){
      evidencia.push(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
      evidencia.push(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
      evidencia.push(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
      evidencia.push(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
      evidencia.push(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
      evidencia.push(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
      evidencia.push(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
      evidencia.push(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
      evidencia.push(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
      evidencia.push(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
      espImg=espImg+10;
    }
    
    if(listaEvidencias.length> 20){
      evidencia.push(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
      evidencia.push(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
      evidencia.push(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
      evidencia.push(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
      evidencia.push(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
      espImg=espImg+5;
    }
    if(listaEvidencias.length> 56){
      evidencia.push(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
      espImg=espImg+1;
    }
    if(listaEvidencias.length> 92){
      evidencia.push(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
      espImg=espImg+1;
    }
    if(listaEvidencias.length> 128){
      evidencia.push(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
      espImg=espImg+1;
    }
    if(listaEvidencias.length> 164){
      evidencia.push(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
      espImg=espImg+1;
    }
    evidencia.push(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
    evidencia.push(["", "", "LINK QUALITY CONTROL FILES", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);


    let pieInfo = [
      ["", "", "", "GOOD / APPROVED", "", "", "", "", "REGULAR / CONDITION", "", "", "", "BAD / REJECTION", "", "", "", "", "", ""],
    ]


    cabecera.forEach(c => {
      let row = worksheet.addRow(c);
      row.font = { name: 'Calibri', family: 4, size: 11 }
    });
    let correo = worksheet.getCell('E7');
    correo.value = {
      text: 'andres@highcontrolgroup.com',
      hyperlink: 'mailto:andres@highcontrolgroup.com'
    };
    correo.font = { name: 'Calibri', family: 4, size: 11, color: { argb: 'FF0000FF' }, underline: true }
    let correo2 = worksheet.getCell('H7');
    correo2.value = 'info@highcontrolgroup.com';
    correo2.font = { name: 'Calibri', family: 4, size: 11, color: { argb: 'FF0000FF' }, underline: true }
    correo2.value = {
      text: 'info@highcontrolgroup.com',
      hyperlink: 'mailto:info@highcontrolgroup.com'
    };
    let paginaWeb = worksheet.getCell('M8');
    paginaWeb.value = {
      text: 'www.highcontrolgroup.com',
      hyperlink: 'http://highcontrolgroup.com/'
    }
    paginaWeb.font = { name: 'Calibri', family: 4, size: 11, color: { argb: 'FF0000FF' }, underline: true }

    lineaCode.forEach(c => {
      let row = worksheet.addRow(c);
      row.font = { name: 'Calibri', family: 4, size: 11 }
      for (var i = 3; i < row.cellCount - 1; i++) {
        row.getCell(i).border = {
          top: { style: 'hair' },
          left: { style: 'hair' },
          right: { style: 'hair' },
          bottom: { style: 'hair' },
        }
      }
    });

    worksheet.addRow(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
    worksheet.mergeCells("C10:E10");
    worksheet.mergeCells("G10:H10");
    worksheet.mergeCells("J10:K10");
    worksheet.mergeCells("M10:O10");
    worksheet.mergeCells("P10:Q10");

    worksheet.getCell("C10").font = {bold:true};
    worksheet.getCell("C10").alignment = {horizontal:'center',vertical:'middle'};
    worksheet.getCell("F10").font = {bold:true};
    worksheet.getCell("F10").alignment = {horizontal:'center',vertical:'middle'};
    worksheet.getCell("G10").font = {bold:true};
    worksheet.getCell("G10").alignment = {horizontal:'center',vertical:'middle'};
    worksheet.getCell("I10").font = {bold:false};
    worksheet.getCell("I10").alignment = {horizontal:'center',vertical:'middle'};
    worksheet.getCell("J10").font = {bold:true};
    worksheet.getCell("J10").alignment = {horizontal:'center',vertical:'middle'};
    worksheet.getCell("L10").font = {bold:false};
    worksheet.getCell("L10").alignment = {horizontal:'center',vertical:'middle'};
    worksheet.getCell("M10").font = {bold:true};
    worksheet.getCell("M10").alignment = {horizontal:'center',vertical:'middle'};
    worksheet.getCell("P10").font = {bold:false};
    worksheet.getCell("P10").alignment = {horizontal:'center',vertical:'middle'};

    info.forEach(c => {
      let row = worksheet.addRow(c);
      row.font = { name: 'Calibri', family: 4, size: 11, bold: true }
      for (var i = 3; i < row.cellCount - 1; i++) {
        row.getCell(i).border = {
          top: { style: 'hair' },
          left: { style: 'hair' },
          right: { style: 'hair' },
          bottom: { style: 'hair' },
        }
      }
    });

    worksheet.getCell("I12").font = { bold:false};
    worksheet.getCell("I13").font = { bold:false};
    worksheet.getCell("I14").font = { bold:false};
    worksheet.getCell("I15").font = { bold:false};
    worksheet.getCell("I16").font = { bold:false};
    worksheet.getCell("I12").alignment = {horizontal:'center',vertical:'middle'};
    worksheet.getCell("I13").alignment = {horizontal:'center',vertical:'middle'};
    worksheet.getCell("I14").alignment = {horizontal:'center',vertical:'middle'};
    worksheet.getCell("I15").alignment = {horizontal:'center',vertical:'middle'};
    worksheet.getCell("I16").alignment = {horizontal:'center',vertical:'middle'};

    worksheet.getCell("N15").font = {bold:false};
    worksheet.getCell("N15").alignment = {horizontal:'center',vertical:'middle'};

    worksheet.getCell("O12").font = {bold:false};
    worksheet.getCell("O12").alignment = {horizontal:'center',vertical:'middle'};
    worksheet.getCell("O13").font = {bold:false};
    worksheet.getCell("O13").alignment = {horizontal:'center',vertical:'middle'};
    worksheet.getCell("N14").font = {bold:false};
    worksheet.getCell("N14").alignment = {horizontal:'center',vertical:'middle'};
    worksheet.getCell("O16").font = {bold:false};
    worksheet.getCell("O16").alignment = {horizontal:'center',vertical:'middle'};
    worksheet.getCell("Q12").font = {bold:false};
    worksheet.getCell("Q13").font = {bold:false};
    worksheet.getCell("Q13").alignment = {horizontal:'center',vertical:'middle'};
    worksheet.getCell("Q14").font = {bold:false};
    worksheet.getCell("Q16").alignment = {horizontal:'center',vertical:'middle'};

    worksheet.addRow(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);

    const logoCliente = workbook.addImage({
      base64: logCli,
      extension: 'png',
    });

    worksheet.addImage(logoCliente, {
      tl:{ col: 2.5 , row:12.1},
      br:{ col: 5.9 , row:16}
    })


    resumen.forEach(c => {
      let row = worksheet.addRow(c);
      row.font = { name: 'Calibri', family: 4, size: 11 }
      row.alignment = { horizontal:'center',vertical:'middle'}
      for (var i = 3; i < row.cellCount - 1; i++) {
        row.getCell(i).border = {
          top: { style: 'hair' },
          left: { style: 'hair' },
          right: { style: 'hair' },
          bottom: { style: 'hair' },
        }
      }
    });

    let tituloResumen = worksheet.getCell("C18");
    tituloResumen.alignment = { horizontal: 'center', vertical: 'middle' };
    tituloResumen.font = { name: 'Calibri', family: 4, size: 11, bold: true };
    tituloResumen.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'BFBFBF' },
      bgColor: { argb: '000000' }
    };

    worksheet.mergeCells("F19:I19");
    worksheet.mergeCells("J19:N19");
    worksheet.mergeCells("O19:P19");
    let subResumen = worksheet.getRow(19);
    subResumen.font = { name: 'Calibri', family: 4, size: 11, bold: true };
    subResumen.alignment = { horizontal: 'center', vertical: 'middle' };
    // Resumen 

    for (var i = 0; i < this.longitudResumen; i++) {
      worksheet.mergeCells("F" + (20 + i).toString() + ":I" + (20 + i).toString());
      worksheet.mergeCells("J" + (20 + i).toString() + ":N" + (20 + i).toString());
      worksheet.mergeCells("O" + (20 + i).toString() + ":P" + (20 + i).toString());
      
    }
    // Fin resumen



    worksheet.getColumn("A").width = 0.8 + 2;
    worksheet.getColumn("B").width = 0.8 + 1.44;
    worksheet.getColumn("C").width = 0.8 + 10.56;
    worksheet.getColumn("D").width = 0.8 + 5.67;
    worksheet.getColumn("E").width = 0.8 + 7.78;
    worksheet.getColumn("F").width = 0.8 + 19.56;
    worksheet.getColumn("G").width = 0.8 + 5.56;
    worksheet.getColumn("H").width = 0.8 + 11;
    worksheet.getColumn("I").width = 0.8 + 11;
    worksheet.getColumn("J").width = 0.8 + 14.22;
    worksheet.getColumn("K").width = 0.8 + 5.56;
    worksheet.getColumn("L").width = 0.8 + 11.89;
    worksheet.getColumn("M").width = 0.8 + 4.67;
    worksheet.getColumn("N").width = 0.8 + 11;
    worksheet.getColumn("O").width = 0.8 + 6.22;
    worksheet.getColumn("P").width = 0.8 + 11;
    worksheet.getColumn("Q").width = 0.8 + 9.67;
    worksheet.getColumn("R").width = 0.8 + 2;
    worksheet.getColumn("S").width = 0.8 + 1.56;
    worksheet.getRow(1).height = 10.5;
    worksheet.getRow(2).height = 21.8;
    worksheet.getRow(3).height = 22.5;
    worksheet.getRow(4).height = 14.7;
    worksheet.getRow(5).height = 13.5;
    worksheet.getRow(6).height = 1.2;
    worksheet.getRow(7).height = 14.4;
    worksheet.getRow(8).height = 15.6;
    worksheet.getRow(9).height = 6;
    worksheet.getRow(10).height = 15.6;
    worksheet.getRow(11).height = 6;
    worksheet.getRow(12).height = 16.2;
    worksheet.getRow(13).height = 16.2;
    worksheet.getRow(14).height = 16.2;
    worksheet.getRow(15).height = 16.2;
    worksheet.getRow(16).height = 16.2;
    worksheet.getRow(17).height = 10.1;
    worksheet.getRow(18).height = 16.5;

    let title = worksheet.getRow(2)
    title.font = { name: 'Calibri', size: 24, bold: true, italic: true, underline: true };
    title.alignment = { horizontal: 'center', vertical: 'middle' }
    let subtitle = worksheet.getCell("C4")
    subtitle.font = { name: 'Calibri', size: 14, bold: true, italic: true, color: { argb: 'FFCC0000' }, };
    subtitle.alignment = { horizontal: 'center', vertical: 'middle' }


    worksheet.mergeCells("C2:J3");
    worksheet.mergeCells("C4:J4");
    worksheet.mergeCells("E7:F7");
    worksheet.mergeCells("H7:J7");
    worksheet.mergeCells("E8:J8");
    worksheet.mergeCells("M8:Q8");

    worksheet.mergeCells("C12:F16");
    worksheet.mergeCells("G12:H12");
    worksheet.mergeCells("G13:H13");
    worksheet.mergeCells("G14:H14");
    worksheet.mergeCells("G15:H15");
    worksheet.mergeCells("G16:H16");

    worksheet.mergeCells("I12:J12");
    worksheet.mergeCells("I13:J13");
    worksheet.mergeCells("I14:J14");
    worksheet.mergeCells("I15:J15");
    worksheet.mergeCells("I16:J16");

    worksheet.mergeCells("K12:M12");
    worksheet.mergeCells("K13:M13");
    worksheet.mergeCells("K14:M14");
    worksheet.mergeCells("K15:M15");
    worksheet.mergeCells("K16:M16");

    worksheet.mergeCells("N14:O14");
    worksheet.mergeCells("N15:Q15");
    worksheet.mergeCells("C17:Q17");
    worksheet.mergeCells("C18:Q18");
    worksheet.getRow(17).height = 10.1;

    /*let espacioResVolPeso = worksheet.addRow(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
    espacioResVolPeso.height = 10.1;
    infoPesoVolumen.forEach(c => {
      let row = worksheet.addRow(c);
      row.font = { name: 'Calibri', family: 4, size: 11 };
      row.alignment = { horizontal: 'center', vertical: 'middle' }
      for (var i = 3; i < row.cellCount - 1; i++) {

        row.getCell(i).border = {
          top: { style: 'hair' },
          left: { style: 'hair' },
          right: { style: 'hair' },
          bottom: { style: 'hair' },
        }
      }
    });
    //peso volumen
    worksheet.getCell("C" + (19 + this.longitudResumen).toString()).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'BFBFBF' },
      bgColor: { argb: '000000' }
    };
    worksheet.mergeCells("C" + (19 + this.longitudResumen).toString() + ":E" + (19 + this.longitudResumen).toString());
    worksheet.getRow(19 + this.longitudResumen).font = { bold: true };
    worksheet.mergeCells("F" + (19 + this.longitudResumen).toString() + ":G" + (19 + this.longitudResumen).toString());
    worksheet.mergeCells("H" + (19 + this.longitudResumen).toString() + ":I" + (19 + this.longitudResumen).toString());
    worksheet.mergeCells("J" + (19 + this.longitudResumen).toString() + ":K" + (19 + this.longitudResumen).toString());
    worksheet.mergeCells("L" + (19 + this.longitudResumen).toString() + ":M" + (19 + this.longitudResumen).toString());
    worksheet.mergeCells("N" + (19 + this.longitudResumen).toString() + ":O" + (19 + this.longitudResumen).toString());
    worksheet.mergeCells("P" + (19 + this.longitudResumen).toString() + ":Q" + (19 + this.longitudResumen).toString());
    for (var i = this.longitudResumen; i < longitudPesoVolumen + this.longitudResumen; i++) {
      worksheet.mergeCells("C" + (20 + i).toString() + ":D" + (20 + i).toString());
      worksheet.mergeCells("F" + (20 + i).toString() + ":G" + (20 + i).toString());
      worksheet.mergeCells("H" + (20 + i).toString() + ":I" + (20 + i).toString());
      worksheet.mergeCells("J" + (20 + i).toString() + ":K" + (20 + i).toString());
      worksheet.mergeCells("L" + (20 + i).toString() + ":M" + (20 + i).toString());
      worksheet.mergeCells("N" + (20 + i).toString() + ":O" + (20 + i).toString());
      worksheet.mergeCells("P" + (20 + i).toString() + ":Q" + (20 + i).toString());
    }
    //fin peso volumen
    */
    let espacioVolPesoFalencia = worksheet.addRow(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
    espacioVolPesoFalencia.height = 7;
    worksheet.addRow(["","","Special Note: If you need more pictures of the devolution, please access the online photo storage link at the end of the report"]);
    let espacioResumenFalencia = worksheet.addRow(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
    espacioVolPesoFalencia.height = 7;

    this.longitudResumen=this.longitudResumen + 2 + 2;


    falencias.forEach(c => {
      let row = worksheet.addRow(c);
      row.font = { name: 'Calibri', family: 4, size: 11 };
      for (var i = 3; i < row.cellCount - 1; i++) {

        row.getCell(i).border = {
          top: { style: 'hair' },
          left: { style: 'hair' },
          right: { style: 'hair' },
          bottom: { style: 'hair' },
        }
      }
    });
    worksheet.mergeCells("C" + (19 + this.longitudResumen).toString() + ":Q" + (19 + this.longitudResumen).toString());
    worksheet.mergeCells("C" + (20 + this.longitudResumen).toString() + ":G" + (20 + this.longitudResumen).toString());
    worksheet.mergeCells("H" + (20 + this.longitudResumen).toString() + ":K" + (20 + this.longitudResumen).toString());
    worksheet.mergeCells("L" + (20 + this.longitudResumen).toString() + ":Q" + (20 + this.longitudResumen).toString());
    let tituloFalencias = worksheet.getRow(19 + this.longitudResumen);
    tituloFalencias.font = { bold: true };
    tituloFalencias.alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.getCell("C" + (19 + this.longitudResumen).toString()).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'BFBFBF' },
      bgColor: { argb: '000000' }
    };
    let subTituloFalencias = worksheet.getRow(20 + this.longitudResumen);
    subTituloFalencias.font = { bold: true };
    subTituloFalencias.alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.getCell("C" + (20 + this.longitudResumen).toString()).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'BFBFBF' },
      bgColor: { argb: '000000' }
    };
    worksheet.getCell("H" + (20 + this.longitudResumen).toString()).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'BFBFBF' },
      bgColor: { argb: '000000' }
    };
    worksheet.getCell("L" + (20 + this.longitudResumen).toString()).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'BFBFBF' },
      bgColor: { argb: '000000' }
    };
    worksheet.getCell("L" + (23 + this.longitudResumen).toString()).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'BFBFBF' },
      bgColor: { argb: '000000' }
    };
    worksheet.getCell("L" + (28 + this.longitudResumen).toString()).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'BFBFBF' },
      bgColor: { argb: '000000' }
    };
    for (var j = this.longitudResumen; j < this.longitudResumen + 10; j++) {
      worksheet.mergeCells("D" + (21 + j).toString() + ":G" + (21 + j).toString());
      worksheet.mergeCells("I" + (21 + j).toString() + ":K" + (21 + j).toString());
    }
    var j =  this.longitudResumen;
    worksheet.mergeCells("M" + (21 + j).toString() + ":Q" + (21 + j).toString());
    worksheet.mergeCells("M" + (22 + j).toString() + ":Q" + (22 + j).toString());
    worksheet.mergeCells("L" + (23 + j).toString() + ":Q" + (23 + j).toString());
    worksheet.mergeCells("M" + (24 + j).toString() + ":Q" + (24 + j).toString());
    worksheet.mergeCells("M" + (25 + j).toString() + ":Q" + (25 + j).toString());
    worksheet.mergeCells("M" + (26 + j).toString() + ":Q" + (26 + j).toString());
    worksheet.mergeCells("M" + (27 + j).toString() + ":Q" + (27 + j).toString());
    worksheet.mergeCells("L" + (28 + j).toString() + ":Q" + (28 + j).toString());
    worksheet.mergeCells("M" + (29 + j).toString() + ":Q" + (29 + j).toString());
    worksheet.mergeCells("M" + (30 + j).toString() + ":Q" + (30 + j).toString());

    let stem = worksheet.getCell("L" + (25 + j).toString());
    stem.alignment = { horizontal: 'center', vertical: 'middle' };
    stem.font = { bold: true };
    let other = worksheet.getCell("L" + (30 + j).toString());
    other.alignment = { horizontal: 'center', vertical: 'middle' };
    other.font = { bold: true };

    let espacioFalenciaEvidencia = worksheet.addRow(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""])
    espacioFalenciaEvidencia.height = 10.1;
    evidencia.forEach(c => {
      let row = worksheet.addRow(c);
      row.height = 15;
      for (var i = 3; i < row.cellCount - 1; i++) {

        row.getCell(i).border = {
          top: { style: 'medium' },
          left: { style: 'medium' },
          right: { style: 'medium' },
          bottom: { style: 'medium' },
        }
      }

    });
    
    let tituloEvidencias = worksheet.getRow(32 + j);
    tituloEvidencias.font = { bold: true };
    tituloEvidencias.alignment = { horizontal: 'center', vertical: 'middle' };

    worksheet.mergeCells("C" + (32 + j).toString() + ":Q" + (32 + j).toString())
    worksheet.getCell("C" + (32 + j).toString()).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'BFBFBF' },
      bgColor: { argb: '000000' }
    };
    worksheet.mergeCells("C" + (34 + j + espImg).toString() + ":F" + (34 + j + espImg).toString());
    worksheet.mergeCells("G" + (34 + j + espImg).toString() + ":Q" + (34 + j + espImg).toString());
    let piePaginaEstilo = worksheet.getRow(84 + j);
    worksheet.getCell("C" + (34 + j +espImg).toString()).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'BFBFBF' },
      bgColor: { argb: '000000' }
    };
    worksheet.getCell("C" + (34 + j +espImg)).font = { bold: true };
    piePaginaEstilo.height = 21;
    piePaginaEstilo.alignment = { horizontal: 'center', vertical: 'middle' };

    worksheet.addRow(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]).height = 14.4;

    pieInfo.forEach(c => {
      let row = worksheet.addRow(c);
      row.font = { name: 'Calibri', family: 4, size: 11 }
      row.alignment = { horizontal: 'center', vertical: 'middle' };
      for (var i = 3; i < row.cellCount - 1; i++) {

        row.getCell(i).border = {
          top: { style: 'hair' },
          left: { style: 'hair' },
          right: { style: 'hair' },
          bottom: { style: 'hair' },
        }
      }
    });

    worksheet.mergeCells("D" + (36 + j +espImg).toString() + ":G" + (36 + j +espImg).toString());
    worksheet.mergeCells("I" + (36 + j +espImg).toString() + ":K" + (36 + j +espImg).toString());
    worksheet.mergeCells("M" + (36 + j +espImg).toString() + ":Q" + (36 + j +espImg).toString());

    worksheet.addRow(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]).height = 14.4;
    worksheet.addRow(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]).height = 8.3;
    worksheet.addRow(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]).height = 14.4;


    worksheet.getCell('B2').border = {
      top: { style: 'medium' },
      left: { style: 'medium' }
    };
    worksheet.getCell('R2').border = {
      top: { style: 'medium' },
      right: { style: 'medium' }
    };
    var i = 0;
    let margenL = worksheet.getColumn(1);
    let margenT = worksheet.getRow(1);
    let margenR = worksheet.getColumn('S');
    let margenB = worksheet.getRow(39 + j +espImg);
    margenL.eachCell(c => {
      if (i > 0) {
        c.border = {
          right: { style: 'medium' }
        };

      }
      i++;
    });
    i = 0;
    margenT.eachCell(c => {

      if (i > 0 && i < 18) {
        c.border = {
          bottom: { style: 'medium' }
        };

      }
      i++;

    });
    i = 0;
    margenR.eachCell(c => {
      if (i > 0) {
        c.border = {
          left: { style: 'medium' }
        };
      }
      i++;
    });
    i = 0;
    margenB.eachCell(c => {
      if (i > 0 && i < 18) {
        c.border = {
          top: { style: 'medium' }
        };
      }
      i++;
    });
    worksheet.getCell("A" + (39 + j + espImg).toString()).border = {
      right: null
    };
    worksheet.getCell("S" + (39 + j + espImg).toString()).border = {
      left: null
    };


    worksheet.mergeCells("C" + (33 + j).toString() + ":Q" + (33 + j + espImg).toString());


    const logo = workbook.addImage({
      base64: listaColores[3],
      extension: 'png',
    });
    worksheet.addImage(logo, {
      tl: { col: 11.8, row: 1.4 },
      br: { col: 17.2, row: 7 }
    });
    const amarillo = workbook.addImage({
      base64: listaColores[1],
      extension: 'png',
    });
    const verde = workbook.addImage({
      base64: listaColores[0],
      extension: 'png',
    });
    const rojo = workbook.addImage({
      base64: listaColores[2],
      extension: 'png',
    });
    for (var imgFalencia = 0; imgFalencia < 10; imgFalencia++) {
      var valor = worksheet.getCell("C" + (21 + j + imgFalencia).toString()).value;
      if (valor === "-10") {
        worksheet.addImage(amarillo, {
          tl: { col: 2.002, row: (20 + j + imgFalencia) },
          br: { col: 3, row: (21 + j + imgFalencia) }
        });
      }
      else if (valor === "-20") {
        worksheet.addImage(rojo, {
          tl: { col: 2.002, row: (20 + j + imgFalencia) },
          br: { col: 3, row: (21 + j + imgFalencia) }
        });
      }
      else if (valor === "0") {
        worksheet.addImage(verde, {
          tl: { col: 2.002, row: (20 + j + imgFalencia) },
          br: { col: 3, row: (21 + j + imgFalencia) }
        });
      }
    }
    for (var imgFalencia = 0; imgFalencia < 10; imgFalencia++) {
      var valor = worksheet.getCell("H" + (21 + j + imgFalencia).toString()).value;
      if (valor === "-10") {
        worksheet.addImage(amarillo, {
          tl: { col: 7.002, row: (20 + j + imgFalencia) },
          br: { col: 8, row: (21 + j + imgFalencia) }
        });
      }
      else if (valor === "-20") {
        worksheet.addImage(rojo, {
          tl: { col: 7.002, row: (20 + j + imgFalencia) },
          br: { col: 8, row: (21 + j + imgFalencia) }
        });
      }
      else if (valor === "0") {
        worksheet.addImage(verde, {
          tl: { col: 7.002, row: (20 + j + imgFalencia) },
          br: { col: 8, row: (21 + j + imgFalencia) }
        });
      }
    }
    for (var imgFalencia = 0; imgFalencia < 10; imgFalencia++) {
      var valor = worksheet.getCell("L" + (21 + j + imgFalencia).toString()).value;
      if (valor === "-10") {
        worksheet.addImage(amarillo, {
          tl: { col: 11.002, row: (20 + j + imgFalencia) },
          br: { col: 12, row: (21 + j + imgFalencia) }
        });
      }
      else if (valor === "-20") {
        worksheet.addImage(rojo, {
          tl: { col: 11.002, row: (20 + j + imgFalencia) },
          br: { col: 12, row: (21 + j + imgFalencia) }
        });
      }
      else if (valor === "0") {
        worksheet.addImage(verde, {
          tl: { col: 11.002, row: (20 + j + imgFalencia) },
          br: { col: 12, row: (21 + j + imgFalencia) }
        });
      }
    }

    for (var res = 0; res < this.longitudResumen; res++) {

      var valor = worksheet.getCell("C" + (18 + res).toString()).value;
      if (valor.toString() === "-10") {
        worksheet.addImage(amarillo, {
          tl: { col: 2.002, row: (17 + res) },
          br: { col: 3, row: (18 + res) }
        });
      }
      else if (valor.toString() === "-20") {
        worksheet.addImage(rojo, {
          tl: { col: 2.002, row: (17 + res) },
          br: { col: 3, row: (18 + res) }
        });
      }
      else if (valor.toString() === "0") {
        worksheet.addImage(verde, {
          tl: { col: 2.002, row: (17 + res) },
          br: { col: 3, row: (18 + res) }
        });
      }
    }

    worksheet.addImage(verde, {
      tl: { col: 2, row: (35 + j + espImg) },
      br: { col: 3, row: (36 + j + espImg) }
    });
    worksheet.addImage(amarillo, {
      tl: { col: 7, row: (35 + j + espImg) },
      br: { col: 8, row: (36 + j + espImg) }
    });
    worksheet.addImage(rojo, {
      tl: { col: 11, row: (35 + j + espImg) },
      br: { col: 12, row: (36 + j + espImg) }
    });
    
    worksheet.getCell("M8").alignment = { horizontal: 'center', vertical: 'middle' };
    
    worksheet.getColumn("A").width = 0.8 + 2;
    worksheet.getColumn("B").width = 0.8 + 1.44;
    worksheet.getColumn("C").width = 0.8 + 10.56;
    worksheet.getColumn("D").width = 0.8 + 5.67;
    let y = worksheet.getColumn("E");
   

    worksheet.getColumn("F").width = 0.8 + 19.56;
    worksheet.getColumn("G").width = 0.8 + 5.56;
    worksheet.getColumn("H").width = 0.8 + 11;
    worksheet.getColumn("I").width = 0.8 + 11;
    worksheet.getColumn("J").width = 0.8 + 14.22;
    worksheet.getColumn("K").width = 0.8 + 5.56;
    worksheet.getColumn("L").width = 0.8 + 11.89;
    worksheet.getColumn("M").width = 0.8 + 4.67;
    worksheet.getColumn("N").width = 0.8 + 11;
    worksheet.getColumn("O").width = 0.8 + 6.22;
    worksheet.getColumn("P").width = 0.8 + 11;
    worksheet.getColumn("Q").width = 0.8 + 9.67;
    worksheet.getColumn("R").width = 0.8 + 2;
    worksheet.getColumn("S").width = 0.8 + 1.56;
    
    y.width=8.85;
    
    worksheet.getRow(1).height = 10.5;
    worksheet.getRow(2).height = 21.8;
    worksheet.getRow(3).height = 22.5;
    worksheet.getRow(4).height = 14.7;
    worksheet.getRow(5).height = 13.5;
    worksheet.getRow(6).height = 1.2;
    worksheet.getRow(7).height = 14.4;
    worksheet.getRow(8).height = 15.6;
    worksheet.getRow(9).height = 6;
    worksheet.getRow(10).height = 15.6;
    worksheet.getRow(11).height = 6;
    worksheet.getRow(12).height = 16.2;
    worksheet.getRow(13).height = 16.2;
    worksheet.getRow(14).height = 16.2;
    worksheet.getRow(15).height = 16.2;
    worksheet.getRow(16).height = 16.2;
    worksheet.getRow(17).height = 10.1;
    worksheet.getRow(16).height = 16.5;
    var filaImagenes = 0.0+j-1;
    var columnaImagenes = 1;
    listaEvidencias = listaEvidencias.sort((n1,n2) => {
      if (n1.orden > n2.orden) {
          return 1;
      }
  
      if (n1.orden < n2.orden) {
          return -1;
      }
  
      return 0;
  });
    for(var imgEvi=0;imgEvi<listaEvidencias.length;imgEvi++){
      let valor = workbook.addImage({
        base64: listaEvidencias[imgEvi].valor,
        extension: 'png',
      });
      if(columnaImagenes===1){
        worksheet.addImage(valor, {
          tl:{col: 2.7 , row: (33+filaImagenes),nativeRow:(33+filaImagenes),nativeRowOff:76000,  nativeCol:2, nativeColOff:440000},
          br:{col: 5.5 , row: (43+filaImagenes),nativeRow:(43+filaImagenes),  nativeCol:5, nativeColOff:850000},
          editAs: 'oneCell'
        });
        columnaImagenes+=1;
      }
      else if(columnaImagenes===2){
        worksheet.addImage(valor, {
          tl:{col: 5.4 , row: (33+filaImagenes),nativeRow:(33+filaImagenes),nativeRowOff:76000,  nativeCol:5, nativeColOff:1210000},
          br:{col: 8.9 , row: (43+filaImagenes),nativeRow:(43+filaImagenes),nativeCol:8, nativeColOff:940000},
          editAs: 'oneCell'
        });
        columnaImagenes+=1;
      }
      else if(columnaImagenes===3){
        worksheet.addImage(valor, {
          tl: { col: 9.3, row: (33.5+filaImagenes),nativeRow: (33+filaImagenes) ,nativeRowOff:76000,nativeCol:9, nativeColOff:330000 },
          br: { col: 12.3,row: (43+ filaImagenes),nativeRow: (43+filaImagenes) ,nativeCol:12,nativeColOff:223000 },
          editAs: 'oneCell'
        });
        columnaImagenes+=1;
      }
      else if(columnaImagenes===4){
        worksheet.addImage(valor, {
          tl: { col: 13.2, row: (33.5+filaImagenes),nativeRow: (33+filaImagenes) ,nativeRowOff:76000,nativeCol:13, nativeColOff:210000},
          br: { col: 16.2,row: (43+ filaImagenes),nativeRow: (43+filaImagenes) ,nativeCol:16, nativeColOff:295000 },
          editAs: 'oneCell'
        });
        columnaImagenes = 1;
        filaImagenes+= 10.0;
      }
      if(imgEvi == 19){
        filaImagenes+=5.0;
      }
      if(imgEvi == 55){
        filaImagenes+=1.0;
      }
      if(imgEvi == 91){
        filaImagenes+=1.0;
      }
      if(imgEvi == 127){
        filaImagenes+=1.0;
      }
      if(imgEvi == 1163){
        filaImagenes+=1.0;
      }
    }

    
    let subFalencia1 = worksheet.getCell('L'+(23+this.longitudResumen));
    subFalencia1.alignment = { horizontal: 'center', vertical: 'middle' };
    subFalencia1.font = { bold: true }
    let subFalencia2 = worksheet.getCell('L'+(28+this.longitudResumen));
    subFalencia2.alignment = { horizontal: 'center', vertical: 'middle' };
    subFalencia2.font = { bold: true }
    
    worksheet.getColumn('P').width = 13;
    worksheet.getColumn('N').alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.getColumn('P').alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.getColumn('Q').alignment = { horizontal: 'center', vertical: 'middle' };
    worksheet.getCell('M'+(21+this.longitudResumen)).alignment = { horizontal: 'left', vertical: 'middle' };
    worksheet.getCell('M'+(22+this.longitudResumen)).alignment = { horizontal: 'left', vertical: 'middle' };
    worksheet.getCell('M'+(24+this.longitudResumen)).alignment = { horizontal: 'left', vertical: 'middle' };
    worksheet.getCell('M'+(25+this.longitudResumen)).alignment = { horizontal: 'left', vertical: 'middle' };
    worksheet.getCell('M'+(26+this.longitudResumen)).alignment = { horizontal: 'left', vertical: 'middle' };
    worksheet.getCell('M'+(27+this.longitudResumen)).alignment = { horizontal: 'left', vertical: 'middle' };
    worksheet.getCell('M'+(29+this.longitudResumen)).alignment = { horizontal: 'left', vertical: 'middle' };
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