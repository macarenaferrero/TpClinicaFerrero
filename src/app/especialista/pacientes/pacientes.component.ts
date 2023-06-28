import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/Clases/especialista';
import { Paciente } from 'src/app/Clases/paciente';
import { Turno } from 'src/app/Clases/turno';
import { HistoriaClinicaService } from 'src/app/Services/historia-clinica.service';
import { TurnoService } from 'src/app/Services/turno.service';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent {
  usuarioLoggeado: any;
  especialistas: Especialista[] = [];
  usuario: any;
  turnosOcupados: any;
  pacientesEspecialista: any;
  turnoSeleccionado: any;
  turnosPaciente: any[] = [];

  constructor(private turnoSvc: TurnoService, private usuarioSvc: UsuariosService, private afAuth: AngularFireAuth,
    private historiaClinicaSvc: HistoriaClinicaService, private router: Router) {

   this.afAuth.currentUser.then(user=>{
     if(user){
       this.usuarioLoggeado = user;
     }else{
       this.router.navigate([""]);
     }
   })

 }

 ngOnInit(): void {

   this.afAuth.currentUser.then(user=>{
     if(user){
       this.usuarioLoggeado = user;
     }
   })

   this.usuarioSvc.getListadoEspecialistas().subscribe((especialistas) => {
     this.especialistas = especialistas;
     this.especialistas.forEach((especialista) => {
       if(especialista.email == this.usuarioLoggeado?.email){
         this.usuario = especialista;
       }
     });
   });

   this.turnoSvc.getListadoTurnos().subscribe((turnos) => {
     this.turnosOcupados = turnos;
     this.cargarPacientes();

   });
 }


 cargarPacientes() {
   this.pacientesEspecialista = [];
   this.turnosPaciente = [];
   this.turnosOcupados.forEach((element: any) => {
         if (element.idEspecialista == this.usuario?.id) {
          if(this.pacientesEspecialista.length > 0){
          this.pacientesEspecialista.forEach((turno: any) => {
            if(turno.paciente?.email != element.paciente?.email){
              this.pacientesEspecialista.push(element);
            }
            else{
              this.turnosPaciente.push(element);
            }
          });
         }else{
          this.pacientesEspecialista.push(element);
        }
        }
   });
 }
//  buscarHistoria() {
//   this.turnosPaciente = [];
//   this.turnosOcupados.forEach((element: any) => {
//         if (element.idPaciente === this.paciente.id) {
//           console.log("entro, coincide IdPaciente");
//           this.turnosPaciente.push(element);
//         }

//   });
//  }



 emitirUser(turno: any) {
  this.turnoSeleccionado = turno;
  // this.turnoSvc.getListadoTurnos().subscribe((turnos) => {
  //   turnos.forEach((element: Turno) => {
  //     if(element.idPaciente == this.turnoSeleccionado.idPaciente){
  //       this.listadoTurnosDelPaciente.push(element);
  //     }
  //   });
  // });
}
}
