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



@NgModule({
  declarations: [
    HomeComponent,
    CompleteProfileComponent,
    ListaEspecialidadesComponent,
    AltaEspecialidadComponent,

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
  ]
})
export class HomeModule { }
