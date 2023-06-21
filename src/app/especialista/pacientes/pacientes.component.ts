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
   this.turnosOcupados.forEach((element: Turno) => {
         if (element.idEspecialista == this.usuario?.id) {
          console.log(element.paciente);
          this.pacientesEspecialista.push(element);
          console.log(this.pacientesEspecialista);

            // this.usuarioSvc.getListadoPacientes().subscribe((pacientes) => {
            //   pacientes.forEach((paciente:Paciente) => {
            //     if (paciente.nombre! + paciente.apellido == element.paciente) {
            //       this.pacientesEspecialista.push(paciente);
            //       console.log(this.pacientesEspecialista);
            //     }
            //   });
            // });
         }
   });
 }

 emitirUser(turno: any) {
  this.turnoSeleccionado = turno;
}
}
