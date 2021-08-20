import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Agencia} from '../../../models/agencia'
import { AgenciaService } from 'src/services/agencia.service';


const ELEMENT_DATA: Agencia[] = [
  {agenciaId:1,agenciaNombre:'Ebf cargo'},
];
@Component({
  selector: 'app-agencia',
  templateUrl: './agencia.component.html',
  styleUrls: ['./agencia.component.css']
})
export class AgenciaComponent {

  displayedColumns: string[] = ['agenciaId','agenciaNombre'];
  dataSource = ELEMENT_DATA;
  constructor(public dialog: MatDialog,private _httpAgencia:AgenciaService){
    this.cargarTabla();
  }
  cargarTabla(){
    this._httpAgencia.getAgencias().subscribe(
      resp=>{
        this.dataSource = resp;
      }
    )
  }
  nuevo(){
    const dialogRef = this.dialog.open(AgenciaDialogComponent, {
      width: '300px',
      data: { id: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarTabla();
    });
  }

  editar(item:Agencia){
    const dialogRef = this.dialog.open(AgenciaDialogComponent, {
      width: '300px',
      data: {id:item.agenciaId,nombre:item.agenciaNombre}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarTabla();
    });
  }

}

@Component({
  selector: 'agencia-dialog',
  templateUrl: './agencia.dialog.html'
})
export class AgenciaDialogComponent implements OnInit {

  public formGroup: FormGroup;
  constructor( private formBuilder: FormBuilder,public dialogRef: MatDialogRef<AgenciaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _httpAgencia:AgenciaService ) { }

  public ngOnInit() {
    this.buildForm();
  }
  private buildForm() {
    if(this.data.id != null){
      this.formGroup = this.formBuilder.group({
        agenciaId:this.data.id,
        agenciaNombre: this.data.nombre,
      });
    }else{
      this.formGroup = this.formBuilder.group({
        agenciaNombre: '',
      });
    }
    
  }

  guardar(){
    if(this.data.id!=null){
      this._httpAgencia.putAgencia(this.formGroup.value).subscribe(
        resp=>{
          this.dialogRef.close();
        }
      )
    }
    else{
      this._httpAgencia.postAgencia(this.formGroup.value).subscribe(
        resp=>{
          this.dialogRef.close();
        }
      )
    }
  }
}
