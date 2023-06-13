import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisTurnosEspecialistaComponent } from './mis-turnos-especialista/mis-turnos-especialista.component';

const rutas: Routes = [
  {path: '', component:MisTurnosEspecialistaComponent,},
  {path: 'mis-turnos', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule]
})
export class EspecialistaRoutingModule { }
