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
import { ListadoEspecialistasFotosComponent } from 'src/app/Components/listado-especialistas-fotos/listado-especialistas-fotos.component';
import { ListadoEspecialidadesFotosComponent } from 'src/app/Components/listado-especialidades-fotos/listado-especialidades-fotos.component';
import { ExcelTurnosComponent } from 'src/app/Components/excel-turnos/excel-turnos.component';
import { EstadisticasComponent } from 'src/app/Components/estadisticas/estadisticas.component';
import { LogIngresosComponent } from 'src/app/Components/log-ingresos/log-ingresos.component';
import { CantTurnosPorEspecialidadComponent } from 'src/app/Components/cant-turnos-por-especialidad/cant-turnos-por-especialidad.component';
import { TurnosPorDiaComponent } from 'src/app/Components/turnos-por-dia/turnos-por-dia.component';
import { TurnosFinalizadosComponent } from 'src/app/Components/turnos-finalizados/turnos-finalizados.component';
import { TurnosPorEspecialistaComponent } from 'src/app/Components/turnos-por-especialista/turnos-por-especialista.component';
import { HighchartsChartModule } from 'highcharts-angular';



@NgModule({
  declarations: [
    UsuariosComponent,
    ListadoEspecialistasComponent,
    ListadoPacientesComponent,
    TurnosComponent,
    SolicitarTurnoComponent,
    ListadoEspecialistasFotosComponent,
    ListadoEspecialidadesFotosComponent,
    ExcelTurnosComponent,
    LogIngresosComponent,
    EstadisticasComponent,
    CantTurnosPorEspecialidadComponent,
    TurnosPorDiaComponent,
    TurnosFinalizadosComponent,
    TurnosPorEspecialistaComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdministradorRoutingModule,
    RouterModule,
    HomeModule,
    FormsModule,
    HighchartsChartModule
  ],
  exports: [
    UsuariosComponent,
    ListadoEspecialistasComponent,
    ListadoPacientesComponent,
    TurnosComponent,
    SolicitarTurnoComponent,
    ListadoEspecialistasFotosComponent,
    ListadoEspecialidadesFotosComponent,
    ExcelTurnosComponent,
    LogIngresosComponent,
    EstadisticasComponent,
    CantTurnosPorEspecialidadComponent,
    TurnosPorDiaComponent,
    TurnosFinalizadosComponent,
    TurnosPorEspecialistaComponent,
  ]
})
export class AdministradorModule { }
