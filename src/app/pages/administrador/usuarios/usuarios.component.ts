import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Especialista } from 'src/app/Clases/especialista';
import { Paciente } from 'src/app/Clases/paciente';
import { UsuariosService } from 'src/app/Services/usuarios.service';
import * as admin from 'firebase-admin';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  pacientes: Paciente[] = [];
  especialistas: Especialista[] = [];
  suscripcion: Subscription = new Subscription();
  suscripcion2: Subscription = new Subscription();
  isHabilitado=true;
  crearUnUsuario:boolean=false;
  especialistaModificado?:Especialista;
  uid:string="";


  modificarEspecialista = (especialista: Especialista) => {
    this.especialistaModificado = especialista;
    this.isHabilitado = !this.isHabilitado;
    console.log(this.isHabilitado);
    const nuevoListadoEspecialistas = this.especialistas.map((p) => {
      if (p.id === especialista.id) {
        p.isHabilitado === especialista.isHabilitado;
        return p;
      } else {
        return p; // Devuelve el elemento sin modificar si el id no coincide
      }
    });
    this.especialistas = nuevoListadoEspecialistas; // Actualiza el arreglo original

    // admin
    // .auth()
    // .getUserByEmail(this.especialistaModificado.email)
    // .then((userRecord) => {
    //   const uid = userRecord.uid;
    //   console.log(`El UID del usuario con correo ${this.especialistaModificado} es: ${uid}`);
    //   this.uid=uid;
    // });

    // admin.auth().updateUser(this.uid, {
    //   disabled: true
    // })
    // .then(() => {
    //   console.log('Cuenta de usuario inhabilitada correctamente');
    // })
    // .catch((error) => {
    //   console.error('Error al inhabilitar la cuenta de usuario:', error);
    // });

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
    this.toastr.success("Pacientes cargados correctamente", "Cargado", { timeOut: 1000 });

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

    this.toastr.success("Especialistas cargados correctamente", "Cargado", { timeOut: 1000 });

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
