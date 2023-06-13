import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { HomeRoutingModule } from './home-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { CompleteProfileComponent } from '../complete-profile/complete-profile.component';
import { ListaEspecialidadesComponent } from 'src/app/Components/lista-especialidades/lista-especialidades.component';
import { AltaEspecialidadComponent } from 'src/app/Components/alta-especialidad/alta-especialidad.component';
import { MisTurnosComponent } from '../../paciente/mis-turnos/mis-turnos.component';
import { TurnoDetalleComponent } from 'src/app/Components/turno-detalle/turno-detalle.component';
import { EncuestaComponent } from 'src/app/Components/encuesta/encuesta.component';



@NgModule({
  declarations: [
    HomeComponent,
    CompleteProfileComponent,
    ListaEspecialidadesComponent,
    AltaEspecialidadComponent,
    TurnoDetalleComponent,
    EncuestaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    ToastrModule.forRoot(),
    HomeRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    SharedModule
  ],
  exports: [
    CompleteProfileComponent,
    ListaEspecialidadesComponent,
    AltaEspecialidadComponent,
    TurnoDetalleComponent,
    EncuestaComponent
  ]
})
export class HomeModule { }
