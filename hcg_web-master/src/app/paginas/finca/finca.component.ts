import { Component, OnInit, Inject } from '@angular/core';
import { Finca } from 'src/models/finca';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FincaService } from 'src/services/finca.service';
import { FormGroup, FormBuilder } from '@angular/forms';


const ELEMENT_DATA: Finca[] = [
  {fincaId:1,fincaNombre:'Ebf cargo'},
];
@Component({
  selector: 'app-finca',
  templateUrl: './finca.component.html',
  styleUrls: ['./finca.component.css']
})
export class FincaComponent {

  displayedColumns: string[] = ['fincaId','fincaNombre'];
  dataSource = ELEMENT_DATA;
  constructor(public dialog: MatDialog,private _httpFinca:FincaService){
    this.cargarTabla();
  }
  cargarTabla(){
    this._httpFinca.getFincas().subscribe(
      resp=>{
        this.dataSource = resp;
      }
    )
  }
  nuevo(){
    const dialogRef = this.dialog.open(FincaDialogComponent, {
      width: '300px',
      data: { id: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarTabla();
    });
  }

  editar(item:Finca){
    const dialogRef = this.dialog.open(FincaDialogComponent, {
      width: '300px',
      data: {id:item.fincaId,nombre:item.fincaNombre}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarTabla();
    });
  }

}

@Component({
  selector: 'finca-dialog',
  templateUrl: './finca.dialog.html'
})
export class FincaDialogComponent implements OnInit {

  public formGroup: FormGroup;
  constructor( private formBuilder: FormBuilder,public dialogRef: MatDialogRef<FincaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _httpFinca:FincaService ) { }

  public ngOnInit() {
    this.buildForm();
  }
  private buildForm() {
    if(this.data.id != null){
      this.formGroup = this.formBuilder.group({
        fincaId:this.data.id,
        fincaNombre: this.data.nombre,
      });
    }else{
      this.formGroup = this.formBuilder.group({
        fincaNombre: '',
      });
    }
    
  }

  guardar(){
    if(this.data.id!=null){
      this._httpFinca.putFinca(this.formGroup.value).subscribe(
        resp=>{
          this.dialogRef.close();
        }
      )
    }
    else{
      this._httpFinca.postFinca(this.formGroup.value).subscribe(
        resp=>{
          this.dialogRef.close();
        }
      )
    }
  }
}
