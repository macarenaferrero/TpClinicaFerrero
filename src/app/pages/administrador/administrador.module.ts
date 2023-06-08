import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { ListadoEspecialistasComponent } from 'src/app/Components/listado-especialistas/listado-especialistas.component';
import { ListadoPacientesComponent } from 'src/app/Components/listado-pacientes/listado-pacientes.component';
import { RouterModule } from '@angular/router';
import { HomeModule } from '../home/home.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    UsuariosComponent,
    ListadoEspecialistasComponent,
    ListadoPacientesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdministradorRoutingModule,
    RouterModule,
    HomeModule,
  ],
  exports: [
    UsuariosComponent,
    ListadoEspecialistasComponent,
    ListadoPacientesComponent
  ]
})
export class AdministradorModule { }
