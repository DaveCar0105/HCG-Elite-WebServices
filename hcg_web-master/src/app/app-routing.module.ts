import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PaginasModule} from  './paginas/paginas.module'
import { LoginComponent } from './paginas/login/login.component';
import { AuthGuard } from './paginas/login/auth.guard';
const routes: Routes = [
  {path:'paginas',loadChildren:'./paginas/paginas.module#PaginasModule',canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  { path: '', redirectTo: 'paginas', pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
