import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigInComponent } from './auth/sig-in/sig-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire/compat";
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { CompleteProfileComponent } from './pages/complete-profile/complete-profile.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './pages/home/home-routing.module';
import { ListaEspecialidadesComponent } from './Components/lista-especialidades/lista-especialidades.component';
import { AltaEspecialidadComponent } from './Components/alta-especialidad/alta-especialidad.component';
import { SharedModule } from './Shared/spinner/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    SigInComponent,
    CompleteProfileComponent,
    ListaEspecialidadesComponent,
    AltaEspecialidadComponent

  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    ToastrModule.forRoot(),
    HttpClientModule,
    HomeRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
