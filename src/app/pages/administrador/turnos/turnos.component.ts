import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  public filter!: string;
  turnosOcupados: any;
  turnoSeleccionado!: Turno;
  turnos: any;

  constructor(private turnoSvc: TurnoService,  private afAuth: AngularFireAuth, private router: Router) {

  }

  ngOnInit(): void {
    this.turnoSvc.getListadoTurnos().subscribe(turnos => {
      this.turnos = turnos;
    });
  }


  asignarTurno(turno: any) {

    this.turnoSeleccionado = turno;

  }
}
