import { Component, OnInit, Inject } from '@angular/core';
import { MarcacionService } from 'src/services/marcacion.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Marcacion } from 'src/models/marcacion';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Cliente } from 'src/models/cliente';
import { ClienteService } from 'src/services/cliente.service';

@Component({
  selector: 'app-marcacion',
  templateUrl: './marcacion.component.html',
  styleUrls: ['./marcacion.component.css']
})
export class MarcacionComponent  {
  displayedColumns: string[] = ['marcacionId','marcacionNombre','clienteNombre'];
  dataSource ;
  constructor(public dialog: MatDialog,private _httpMarcacion:MarcacionService){
    this.cargarTabla();
  }
  cargarTabla(){
    this._httpMarcacion.getMarcaciones().subscribe(
      resp=>{
        this.dataSource = resp;
      }
    )
  }
  nuevo(){
    const dialogRef = this.dialog.open(MarcacionDialogComponent, {
      width: '300px',
      data: { id: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarTabla();
    });
  }

  editar(item:Marcacion){
    const dialogRef = this.dialog.open(MarcacionDialogComponent, {
      width: '300px',
      data: {id:item.marcacionId,nombre:item.marcacionNombre,clienteId:item.clienteId}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarTabla();
    });
  }

}

@Component({
  selector: 'marcacion-dialog',
  templateUrl: './marcacion.dialog.html'
})
export class MarcacionDialogComponent implements OnInit {

  public formGroup: FormGroup;
  clientes:Cliente[];

  constructor( private formBuilder: FormBuilder,public dialogRef: MatDialogRef<MarcacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _httpMarcacion:MarcacionService,private _httpCliente:ClienteService ) {

      _httpCliente.getClientes().subscribe(
        cli =>{
          this.clientes = cli;
        }
      );
     }

  public ngOnInit() {
    this.buildForm();
  }
  private buildForm() {
    if(this.data.id != null){
      this.formGroup = this.formBuilder.group({
        marcacionId:this.data.id,
        marcacionNombre: this.data.nombre,
        clienteId:this.data.clienteId
      });
    }else{
      this.formGroup = this.formBuilder.group({
        marcacionNombre: '',
        clienteId:1
      });
    }
    
  }

  guardar(){
    if(this.data.id!=null){
      this._httpMarcacion.putMarcacion(this.formGroup.value).subscribe(
        resp=>{
          this.dialogRef.close();
        }
      )
    }
    else{
      this._httpMarcacion.postMarcacion(this.formGroup.value).subscribe(
        resp=>{
          this.dialogRef.close();
        }
      )
    }
  }
}
