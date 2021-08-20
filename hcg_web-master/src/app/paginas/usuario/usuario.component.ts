import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/services/usuario.service';
import { Usuario } from 'src/models/Usuario';


const ELEMENT_DATA: Usuario[] = [
  {usuarioId:1,usuarioNombre:'Ebf cargo',usuarioCodigo:1,usuarioContrasenia:'123456'},
];
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  displayedColumns: string[] = ['usuarioId','usuarioNombre'];
  dataSource = ELEMENT_DATA;
  constructor(public dialog: MatDialog,private _httpUsuario:UsuarioService){
    this.cargarTabla();
  }
  cargarTabla(){
    this._httpUsuario.getUsuarios().subscribe(
      resp=>{
        this.dataSource = resp;
      }
    )
  }
  nuevo(){
    const dialogRef = this.dialog.open(UsuarioDialogComponent, {
      width: '300px',
      data: { id: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarTabla();
    });
  }

  editar(item:Usuario){
    const dialogRef = this.dialog.open(UsuarioDialogComponent, {
      width: '300px',
      data: {id:item.usuarioId,nombre:item.usuarioNombre,contrasenia:item.usuarioContrasenia,codigo:item.usuarioCodigo}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarTabla();
    });
  }

}

@Component({
  selector: 'usuario-dialog',
  templateUrl: './usuario.dialog.html'
})
export class UsuarioDialogComponent implements OnInit {

  public formGroup: FormGroup;
  constructor( private formBuilder: FormBuilder,public dialogRef: MatDialogRef<UsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _httpUsuario:UsuarioService ) { }

  public ngOnInit() {
    this.buildForm();
  }
  private buildForm() {
    if(this.data.id != null){
      this.formGroup = this.formBuilder.group({
        usuarioId:this.data.id,
        usuarioNombre: this.data.nombre,
        usuarioContrasenia:this.data.contrasenia,
        usuarioCodigo:this.data.codigo
      });
    }else{
      this.formGroup = this.formBuilder.group({
        usuarioNombre: '',
        usuarioContrasenia:'',
        usuarioCodigo:0
      });
    }
    
  }

  guardar(){
    if(this.data.id!=null){
      this._httpUsuario.putUsuario(this.formGroup.value).subscribe(
        resp=>{
          this.dialogRef.close();
        }
      )
    }
    else{
      this._httpUsuario.postUsuario(this.formGroup.value).subscribe(
        resp=>{
          this.dialogRef.close();
        }
      )
    }
  }
}
