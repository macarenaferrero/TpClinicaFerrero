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
import { TurnosComponent } from './turnos/turnos.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { MiPerfilComponent } from 'src/app/Components/mi-perfil/mi-perfil.component';
import { MisHorariosComponent } from 'src/app/especialista/mis-horarios/mis-horarios.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UsuariosComponent,
    ListadoEspecialistasComponent,
    ListadoPacientesComponent,
    TurnosComponent,
    SolicitarTurnoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdministradorRoutingModule,
    RouterModule,
    HomeModule,
    FormsModule,
  ],
  exports: [
    UsuariosComponent,
    ListadoEspecialistasComponent,
    ListadoPacientesComponent,
    TurnosComponent,
    SolicitarTurnoComponent,
  ]
})
export class AdministradorModule { }
