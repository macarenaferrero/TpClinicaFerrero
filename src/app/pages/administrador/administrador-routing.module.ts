import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RouterModule, Routes } from '@angular/router';
import { AdministradoresGuard } from './administrador.guard';

const rutas: Routes = [
  {path: '', component:UsuariosComponent, canActivate:[AdministradoresGuard]},
  {path: 'usuarios', redirectTo: '', pathMatch: 'full'},
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(rutas)
  ],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
