import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteAgenciaComponent, } from './reporte-agencia/reporte-agencia.component';
import { PaginasRoutingModule,routedComponents } from './paginas-routing.module';
import { PaginasComponent } from './paginas.component';
import { Material } from '../material';
import { ClienteComponent, ClienteDialogComponent } from './cliente/cliente.component';
import { AgenciaComponent, AgenciaDialogComponent } from './agencia/agencia.component';
import { VariedadComponent, VariedadDialogComponent } from './variedad/variedad.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FincaComponent, FincaDialogComponent } from './finca/finca.component';
import { MarcacionDialogComponent, MarcacionComponent } from './marcacion/marcacion.component';
import { UsuarioComponent, UsuarioDialogComponent } from './usuario/usuario.component';
import { BaseOrdenesComponent } from './base-ordenes/base-ordenes.component';
import { ReporteControlComponent } from './reporte-control/reporte-control.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  declarations: [
    ...routedComponents,
    PaginasComponent,
    ReporteAgenciaComponent,
    ReporteControlComponent,
    ClienteComponent,
    AgenciaComponent, 
    VariedadComponent, 
    FincaComponent,
    MarcacionComponent,
    VariedadComponent,
    AgenciaDialogComponent,
    FincaDialogComponent,
    ClienteDialogComponent,
    MarcacionDialogComponent,
    VariedadDialogComponent,
    UsuarioComponent,
    UsuarioDialogComponent,
    BaseOrdenesComponent
  ],
  entryComponents:[
    AgenciaDialogComponent,
    FincaDialogComponent,
    ClienteDialogComponent,
    MarcacionDialogComponent,
    VariedadDialogComponent,
    UsuarioDialogComponent
  ],
  imports: [
    PaginasRoutingModule,
    CommonModule,
    Material,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA] ,
})
export class PaginasModule { }

