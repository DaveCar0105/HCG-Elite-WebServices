import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Variedad } from 'src/models/variedad';
import { VariedadService } from 'src/services/variedad.service';


const ELEMENT_DATA: Variedad[] = [
  {variedadId:1,variedadNombre:'Ebf cargo',variedadTipo:1},
];
@Component({
  selector: 'app-variedad',
  templateUrl: './variedad.component.html',
  styleUrls: ['./variedad.component.css']
})
export class VariedadComponent {

  displayedColumns: string[] = ['variedadId','variedadNombre'];
  dataSource = ELEMENT_DATA;
  constructor(public dialog: MatDialog,private _httpVariedad:VariedadService){
    this.cargarTabla();
  }
  cargarTabla(){
    this._httpVariedad.getVariedades().subscribe(
      resp=>{
        this.dataSource = resp;
      }
    )
  }
  nuevo(){
    const dialogRef = this.dialog.open(VariedadDialogComponent, {
      width: '300px',
      data: { id: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarTabla();
    });
  }

  editar(item:Variedad){
    const dialogRef = this.dialog.open(VariedadDialogComponent, {
      width: '300px',
      data: {id:item.variedadId,nombre:item.variedadNombre}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarTabla();
    });
  }

}

@Component({
  selector: 'variedad-dialog',
  templateUrl: './variedad.dialog.html'
})
export class VariedadDialogComponent implements OnInit {

  public formGroup: FormGroup;
  constructor( private formBuilder: FormBuilder,public dialogRef: MatDialogRef<VariedadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _httpVariedad:VariedadService ) { }

  public ngOnInit() {
    this.buildForm();
  }
  private buildForm() {
    if(this.data.id != null){
      this.formGroup = this.formBuilder.group({
        variedadId:this.data.id,
        variedadNombre: this.data.nombre,
        variedadTipo:1
      });
    }else{
      this.formGroup = this.formBuilder.group({
        variedadNombre: '',
        variedadTipo:1
      });
    }
    
  }

  guardar(){
    if(this.data.id!=null){
      this._httpVariedad.putVariedad(this.formGroup.value).subscribe(
        resp=>{
          this.dialogRef.close();
        }
      )
    }
    else{
      this._httpVariedad.postVariedad(this.formGroup.value).subscribe(
        resp=>{
          this.dialogRef.close();
        }
      )
    }
  }
}
