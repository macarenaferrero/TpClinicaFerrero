import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RouterModule, Routes } from '@angular/router';
import { AdministradoresGuard } from './administrador.guard';
import { TurnosComponent } from './turnos/turnos.component';

const rutas: Routes = [
  {path: '', component:UsuariosComponent, canActivate:[AdministradoresGuard]},
  {path: 'turnos', component:TurnosComponent, canActivate:[AdministradoresGuard]},
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
