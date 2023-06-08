import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeRoutingModule } from '../pages/home/home-routing.module';
import { AdministradorRoutingModule } from '../pages/administrador/administrador-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SpinnerComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SpinnerComponent,
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
