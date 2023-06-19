import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ]),
  ]
})

export class MiPerfilComponent{
  usuarioPerfil?: any;
  public visible:boolean=true;
  isAdmin:boolean=false;
  isPaciente:boolean=false;
  isEspecialista:boolean=false;
  constructor(private afAuth: AngularFireAuth, private router: Router, private usuariosService: UsuariosService) { }
  especialistas:any;
  usuario:any;
  administradores:any;
  pacientes:any;

  ngOnInit(): void {
    this.isAdmin=false;
    this.isPaciente=false;
    this.isEspecialista=false;
    this.afAuth.currentUser.then(user=>{
      if(user){
        this.usuario = user;
        this.isAdmin = user.displayName == "Administrador" ? true : false;
        if(this.isAdmin){
          this.usuariosService.getListadoAdministradores().subscribe((administradores:any)=>{
            this.administradores=administradores;
            this.administradores.forEach((administrador:any) => {
              if(administrador.email == this.usuario.email){
                this.usuario = administrador;
              }
            });
          });
        }else{
          this.usuariosService.getListadoEspecialistas().subscribe((especialistas:any)=>{
            this.especialistas=especialistas;
            this.especialistas.forEach((especialista:any) => {
              if(especialista.email == this.usuario.email){
                this.usuario = especialista;
                this.isEspecialista=true;
              }
            });
          });
          if(!this.isEspecialista){
            this.usuariosService.getListadoPacientes().subscribe((pacientes:any)=>{
              this.pacientes=pacientes;
              this.pacientes.forEach((paciente:any) => {
                if(paciente.email == this.usuario.email){
                  this.usuario = paciente;
                  this.isPaciente=true;
                }
              });
            });
          }

          }
        }
    });
    }



  }
