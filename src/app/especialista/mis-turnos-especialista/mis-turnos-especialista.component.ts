import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Especialista } from 'src/app/Clases/especialista';
import { Turno } from 'src/app/Clases/turno';
import { Usuario } from 'src/app/Clases/usuario';
import { HistoriaClinicaService } from 'src/app/Services/historia-clinica.service';
import { TurnoService } from 'src/app/Services/turno.service';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-mis-turnos-especialista',
  templateUrl: './mis-turnos-especialista.component.html',
  styleUrls: ['./mis-turnos-especialista.component.css']
})
export class MisTurnosEspecialistaComponent implements OnInit {

  usuarios: any = [];
  usuario: any;
  public filter!: string;
  turnosOcupados: any;
  turnoSeleccionado!: Turno;
  turnosPaciente: any;
  turnosEspecialista: any;
  historiasClinicas: any;
  historias: any;
  mostrarAltaHistoria: boolean =  true;
  turnosHistoria: any;
  public listadoHistoriaClinica: any = [];
  public listaHistoriaClinica: any = [];
  usuarioLoggeado:any;
  especialistas:Especialista[] = [];

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
      this.cargarTurnos();

    });
  }


  cargarTurnos() {
    this.turnosEspecialista = [];
    this.turnosOcupados.forEach((element: Turno) => {
          if (element.idEspecialista == this.usuario?.id) {
            this.turnosEspecialista.push(element);
          }
    });
  }

  asignarTurno(turno: Turno) {

    this.turnoSeleccionado = turno;
    if(turno.historiaClinica?.altura != null){
      this.mostrarAltaHistoria = false;
    }
    else{
      this.mostrarAltaHistoria = true;
    }
  }


}



