import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Paciente } from 'src/app/Clases/paciente';
import { Turno } from 'src/app/Clases/turno';
import { HistoriaClinicaService } from 'src/app/Services/historia-clinica.service';
import { TurnoService } from 'src/app/Services/turno.service';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent {

  usuarios: any = [];
  usuario?: Paciente;
  public filter!: string;
  turnosOcupados: any;
  turnoSeleccionado!: Turno;
  turnosPaciente: Turno[] = [];
  turnosEspecialista: any;
  turnosHistoria: any;
  public listadoHistoriaClinica: any = [];
  public listaHistoriaClinica: any = [];
  usuarioLoggeado:any;
  pacientes:Paciente[] = [];


  constructor(private turnoSvc: TurnoService, private usuarioSvc: UsuariosService, private afAuth: AngularFireAuth,
     private historiaClinicaService: HistoriaClinicaService, private router: Router) {

  //  this.armarTurnosHistoria();

  }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user=>{
      if(user){
        this.usuarioLoggeado = user;
      }
    })

    this.usuarioSvc.getListadoPacientes().subscribe((pacientes) => {
      this.pacientes = pacientes;
      console.log(this.pacientes);
      this.pacientes.forEach((paciente) => {
        if(paciente.email == this.usuarioLoggeado.email){
          this.usuario = paciente;
          console.log(this.usuario);
          // this.turnosPaciente = this.turnoSvc.getTurnosPorPaciente(this.usuario);
        }
      });
    });

    this.turnoSvc.getListadoTurnos().subscribe((turnos) => {
      this.turnosOcupados = turnos;
      console.log(this.turnosOcupados);
      this.cargarTurnos();

    });

  }

  // armarTurnosHistoria(){
  //   if(this.usuario != null){
  //     this.turnosOcupados = this.turnoSvc.getTurnosPorPaciente(this.usuario);

  //     this.cargarTurnos();

  //     console.log(this.turnosHistoria);


  //   }
  // }

  cargarTurnos() {

    this.turnosPaciente = [];
    this.turnosOcupados.forEach((element: Turno) => {
          if (element.idPaciente == this.usuario?.id) {
            console.log("Turno del paciente "+element);
            this.turnosPaciente.push(element);
            console.log(this.turnosPaciente);
          }

    });
  }





  asignarTurno(turno: any) {
    console.log(turno);
    // var data = especialidad;
    this.turnoSeleccionado = turno;

  }

}

