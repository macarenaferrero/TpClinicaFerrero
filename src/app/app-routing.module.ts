import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigInComponent } from './auth/sig-in/sig-in.component';
import { CompleteProfileComponent } from './pages/complete-profile/complete-profile.component';
import { HomeModule } from './pages/home/home.module';

const routes: Routes = [
  { path: 'bienvenida', component: SigInComponent },
  { path: 'completeProfile', component: CompleteProfileComponent },
  { path: '', redirectTo: '/bienvenida', pathMatch: 'full' },
  { path: 'home', loadChildren:()=>import('./pages/home/home.module').then(m => HomeModule)},
  { path: '**', redirectTo: '/bienvenida', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
