import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaginasComponent } from './paginas.component'; 
import { ReporteAgenciaComponent } from './reporte-agencia/reporte-agencia.component';
import { AgenciaComponent } from './agencia/agencia.component';
import { FincaComponent } from './finca/finca.component';
import { ClienteComponent } from './cliente/cliente.component';
import { MarcacionComponent } from './marcacion/marcacion.component';
import { VariedadComponent } from './variedad/variedad.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { BaseOrdenesComponent } from './base-ordenes/base-ordenes.component';
import { ReporteControlComponent } from './reporte-control/reporte-control.component';


const routes: Routes = [{
  path: '',
  component: PaginasComponent,
  children: [
    {
      path: 'reportes_agencia',
      component: ReporteAgenciaComponent,
    },
    {
      path: 'reportes_control',
      component: ReporteControlComponent,
    },
    {
      path: 'baseOrdenes',
      component: BaseOrdenesComponent,
    },
    {
      path: 'agencia',
      component: AgenciaComponent
    },
    {
      path: 'finca',
      component: FincaComponent
    },
    {
      path: 'cliente',
      component: ClienteComponent
    },
    {
      path: 'marcacion',
      component: MarcacionComponent
    },
    {
      path: 'usuario',
      component: UsuarioComponent
    },
    {
      path: 'variedad',
      component: VariedadComponent
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginasRoutingModule {
}
export const routedComponents = [
  ReporteAgenciaComponent,
];