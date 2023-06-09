import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { PacienteRoutingModule } from './paciente-routing.module';
import { HomeModule } from '../pages/home/home.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MisTurnosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PacienteRoutingModule,
    FormsModule,
    HomeModule
  ],exports:[
    MisTurnosComponent
  ]
})
export class PacienteModule { }
