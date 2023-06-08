import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HabilitadosGuard } from 'src/app/auth/habilitados.guard';

const rutas: Routes = [
  {path: '', component:HomeComponent, canActivate:[HabilitadosGuard]},
  {path: 'home', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(rutas)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
