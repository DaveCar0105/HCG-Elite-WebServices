import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { ClienteService } from 'src/services/cliente.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from 'src/models/cliente';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MercadoService } from 'src/services/mercado.service';
import { Mercado } from 'src/models/mercado';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent  {
  displayedColumns: string[] = ['clienteId','clienteNombre','mercadoNombre','clienteImg'];
  dataSource ;
  mercadosTmp = [];
  constructor(public dialog: MatDialog,private _httpCliente:ClienteService){
    this.cargarTabla();
  }
  cargarTabla(){
    this._httpCliente.getClientes().subscribe(
      resp=>{
        this.dataSource = resp;
      }
    )
  }
  nuevo(){
    const dialogRef = this.dialog.open(ClienteDialogComponent, {
      width: '320px',
      data: { id: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarTabla();
    });
  }

  editar(item:Cliente){
    this.mercadosTmp = [];

    item.clienteMercado.forEach(
      c=>{
        this.mercadosTmp.push(c.mercado.mercadoId);
      }
    )

    const dialogRef = this.dialog.open(ClienteDialogComponent, {
      width: '320px',
      data: {id:item.clienteId,nombre:item.clienteNombre,mercados:this.mercadosTmp,nombreImagen:item.clienteUrl}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cargarTabla();
    });
  }

}
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'cliente-dialog',
  templateUrl: './cliente.dialog.html',
})
export class ClienteDialogComponent implements OnInit {
  selectedFile: ImageSnippet;
  
  public formGroup: FormGroup;
  mercadoControl = new FormControl();
  mercados:Mercado[];
  mercadoPrincipal:Mercado;
  nombrePrincipal:String = '';
  constructor( private formBuilder: FormBuilder,public dialogRef: MatDialogRef<ClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _httpCliente:ClienteService,private _httpMercado:MercadoService ) {
      
     }
    
  public ngOnInit() {
    this._httpMercado.getMercados().subscribe(
      merc=>{
        this.mercados = merc;
        if(this.data.id != null){
          this.mercadoControl.setValue(this.data.mercados);
          this.mercadoPrincipal = this.mercados.find(c=>c.mercadoId == this.mercadoControl.value[0])
          this.nombrePrincipal = this.mercadoPrincipal.mercadoNombre;
        }
      }
    );

    this.mercadoControl.valueChanges.subscribe(
      k=>{

        this.mercadoPrincipal = this.mercados.find(c=>c.mercadoId == k[0]);
        this.nombrePrincipal = this.mercadoPrincipal.mercadoNombre;
        
      }
    )

    this.buildForm();
  }
  private buildForm() {
    if(this.data.id != null){
      this.formGroup = this.formBuilder.group({
        clienteId:this.data.id,
        clienteNombre: this.data.nombre,
      });
    }else{
      this.formGroup = this.formBuilder.group({
        clienteNombre: '',
      });
    }
    
  }


  guardar(imageInput: any){
    const file:File =imageInput.files[0];
    const reader = new FileReader();
    let nombreImagen =  this.data.nombreImagen;
    if(file != null){
      nombreImagen = file.name;
      reader.addEventListener('load', (event: any) => {

        this.selectedFile = new ImageSnippet(event.target.result, file);
  
        this._httpCliente.uploadImage(this.selectedFile.file).subscribe(
          (res) => {
          
          },
          (err) => {
           
          })
      });
      reader.readAsDataURL(file);
    }

    console.log(nombreImagen);


    if(this.data.id!=null){
      this._httpCliente.putCliente(this.formGroup.value,nombreImagen).subscribe(
        resp=>{
          this.mercadoControl.value.forEach(merc => {
            this._httpMercado.postMercadoCliente({clienteId:this.data.id,mercadoId:merc}).subscribe(
              c=>{
                
              }
            );
          });
          this.dialogRef.close();
        }
      )
    }
    else{
      this._httpCliente.postCliente(this.formGroup.value,nombreImagen).subscribe(
        resp=>{
          this.mercadoControl.value.forEach(merc => {
            this._httpMercado.postMercadoCliente({clienteId:resp.clienteId,mercadoId:merc}).subscribe(
              c=>{
                
              }
            );
          });
          this.dialogRef.close();
        }
      )
    }
  }

}
