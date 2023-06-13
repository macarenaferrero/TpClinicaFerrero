import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { HistoriaClinica } from 'src/app/Clases/historia-clinica';
import { Turno } from 'src/app/Clases/turno';
import { Usuario } from 'src/app/Clases/usuario';
import { TurnoService } from 'src/app/Services/turno.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('1000ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class TurnosComponent {

  usuarios: any = [];
  usuario: Usuario = new Usuario;
  public filter!: string;
  turnosOcupados: any;
  turnoSeleccionado!: Turno;
  turnos: any;
  usuarioLoggeado:any;

  constructor(private turnoSvc: TurnoService,  private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.currentUser.then(user=>{
      if(user){
        this.usuarioLoggeado = user;
      }
    })

    if(this.usuario != null){
      this.turnosOcupados = this.turnoSvc.getTurnosPorEspecialista(this.usuarioLoggeado);
      this.cargarTurnos();
    }
  }

  ngOnInit(): void {
  }

  cargarTurnos() {
    this.turnoSvc.getListadoTurnos().subscribe(turnos => {
      this.turnosOcupados = turnos;
    });


  }

  asignarTurno(turno: any) {

    // var data = especialidad;
    this.turnoSeleccionado = turno;

  }
}
