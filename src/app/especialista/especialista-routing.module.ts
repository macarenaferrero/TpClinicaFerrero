import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisTurnosEspecialistaComponent } from './mis-turnos-especialista/mis-turnos-especialista.component';
import { MiPerfilComponent } from '../Components/mi-perfil/mi-perfil.component';
import { PacientesComponent } from './pacientes/pacientes.component';

const rutas: Routes = [
  {path: '', component:MisTurnosEspecialistaComponent,},
  {path: 'mi-perfil', component:MiPerfilComponent,},
  {path: 'pacientes', component:PacientesComponent,},
  {path: 'mis-turnos', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule]
})
export class EspecialistaRoutingModule { }
