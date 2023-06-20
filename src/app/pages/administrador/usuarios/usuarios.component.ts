import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Especialista } from 'src/app/Clases/especialista';
import { Paciente } from 'src/app/Clases/paciente';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import * as admin from 'firebase-admin';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class UsuariosComponent {
  pacientes: Paciente[] = [];
  especialistas: Especialista[] = [];
  suscripcion: Subscription = new Subscription();
  suscripcion2: Subscription = new Subscription();
  isHabilitado=false;
  crearUnUsuario:boolean=false;
  especialistaModificado?:Especialista;
  uid:string="";


  modificarEspecialista = (especialista: Especialista) => {
    this.especialistaModificado = especialista;
    this.isHabilitado = !this.isHabilitado;
    const nuevoListadoEspecialistas = this.especialistas.map((p) => {
      if (p.id === especialista.id) {
        p.isHabilitado === especialista.isHabilitado;
        return p;
      } else {
        return p; // Devuelve el elemento sin modificar si el id no coincide
      }
    });
    this.especialistas = nuevoListadoEspecialistas; // Actualiza el arreglo original

  }

  constructor(public usuariosService: UsuariosService, private toastr: ToastrService,
     private afAuth: AngularFireAuth, private router:Router) { }

  getPacientes() {
    this.suscripcion = this.usuariosService.getListadoPacientes().subscribe((respuesta) => {
      this.pacientes = [];
      respuesta.forEach((paciente: any) => {
        this.pacientes.push({
          ...paciente
        })
      });
    });

  }

  getEspecialistas() {
    this.suscripcion2 = this.usuariosService.getListadoEspecialistas().subscribe((respuesta) => {
      this.especialistas = [];
      respuesta.forEach((especialista: Especialista) => {
        this.especialistas.push({
          ...especialista
        })
      });
    });

  }

  crearUsuario(){
    this.crearUnUsuario=true;
  }

  ngOnInit(): void {
  this.getPacientes();
  this.getEspecialistas();
  this.crearUnUsuario=false;
  }



  ngOnDestroy() {
    this.suscripcion.unsubscribe();
    this.suscripcion2.unsubscribe();
  }
}
