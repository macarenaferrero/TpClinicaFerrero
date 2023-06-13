import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisTurnosEspecialistaComponent } from './mis-turnos-especialista/mis-turnos-especialista.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { EspecialistaRoutingModule } from './especialista-routing.module';
import { HomeModule } from '../pages/home/home.module';



@NgModule({
  declarations: [
    MisTurnosEspecialistaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EspecialistaRoutingModule,
    HomeModule
  ]
})
export class EspecialistaModule { }
