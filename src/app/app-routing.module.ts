import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigInComponent } from './auth/sig-in/sig-in.component';
import { CompleteProfileComponent } from './pages/complete-profile/complete-profile.component';
import { HomeModule } from './pages/home/home.module';
import { AdministradorModule } from './pages/administrador/administrador.module';
import { HabilitadosGuard } from './auth/habilitados.guard';

const routes: Routes = [
  { path: 'bienvenida', component: SigInComponent },
  { path: 'completeProfile', component: CompleteProfileComponent, canActivate:[HabilitadosGuard] },
  { path: '', redirectTo: '/bienvenida', pathMatch: 'full' },
  { path: 'home', loadChildren:()=>import('./pages/home/home.module').then(m => HomeModule)},
  { path: 'administrador', loadChildren:()=>import('./pages/administrador/administrador.module').then(m => AdministradorModule)},
  { path: '**', redirectTo: '/bienvenida', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
