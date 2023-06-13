import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  usuario:any;
  especialistas:any;
  isAdmin:boolean=false;
  isPaciente:boolean=false;
  isEspecialista:boolean=false;
  constructor(private afAuth:AngularFireAuth, private router: Router, private usuariosService:UsuariosService) { }

  ngOnInit(): void {
    this.isAdmin=false;
    this.isPaciente=false;
    this.isEspecialista=false;
    this.afAuth.currentUser.then(user=>{
      if(user){
        this.usuario = user;
        this.isAdmin = user.displayName == "Administrador" ? true : false;
      }else{
        this.router.navigate([""]);
      }
    })

    this.usuariosService.getListadoEspecialistas().subscribe((especialistas:any)=>{
      this.especialistas=especialistas;
      if(!this.isAdmin){
      this.especialistas.forEach((especialista:any) => {
        if(especialista.email == this.usuario.email){
          this.isEspecialista=true;
        }
      });
      if(!this.isEspecialista){
        this.isPaciente=true;
      }
    }
    });
  }

  logOut(){
    this.afAuth.signOut().then(() => this.router.navigate([""]));
    this.isAdmin=false;
    this.isPaciente=false;
    this.isEspecialista=false;
  }
}
