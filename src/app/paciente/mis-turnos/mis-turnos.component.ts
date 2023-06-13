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
  turnosPaciente: any;
  turnosEspecialista: any;
  turnosHistoria: any;
  public listadoHistoriaClinica: any = [];
  public listaHistoriaClinica: any = [];
  usuarioLoggeado:any;
  constructor(private turnoSvc: TurnoService, private usuarioSvc: UsuariosService, private afAuth: AngularFireAuth,
     private historiaClinicaService: HistoriaClinicaService, private router: Router) {

    this.afAuth.currentUser.then(user=>{
      if(user){
        this.usuarioLoggeado = user;
      }else{
        this.router.navigate([""]);
      }
    })

   this.armarTurnosHistoria();

  }

  armarTurnosHistoria(){
    if(this.usuario != null){
      this.turnosOcupados = this.turnoSvc.getTurnosPorPaciente(this.usuario);

      this.cargarTurnos();

      console.log(this.turnosHistoria);


    }
  }

  cargarTurnos() {
    // this.turnoSvc.getTurnos().subscribe(turnos => {
    //   this.turnosOcupados = turnos;
    // });

    this.turnosOcupados.snapshotChanges().pipe(
      map((data: any) => {
        this.turnosPaciente = new Array<Turno>();
        data.map((item: any) => {
          console.log(item);
          //var turno = item;
          var turno = new Turno();
          turno.id = item.payload.doc.id;
          turno.idEspecialista = item.payload.doc.data().idEspecialista;
          turno.idPaciente = item.payload.doc.data().idPaciente;
          turno.estado = item.payload.doc.data().estado;
          //turno.paciente = new Usuario();
          turno.paciente = item.payload.doc.data().paciente;
          turno.especialista = item.payload.doc.data().especialista;
          turno.especialidad = item.payload.doc.data().especialidad;
          turno.fecha = item.payload.doc.data().fecha;
          turno.hora = item.payload.doc.data().hora;
          turno.comentariosPaciente = item.payload.doc.data().comentariosPaciente;
          turno.comentariosEspecialista = item.payload.doc.data().comentariosEspecialista;
          turno.comentariosAdmin = item.payload.doc.data().comentariosAdmin;
          turno.historiaClinica = item.payload.doc.data().historiaClinica;
          this.turnosPaciente.push(turno);
          console.log(this.turnosPaciente);
        })
      })
    ).subscribe();
    console.log(this.turnosPaciente);
  }





  asignarTurno(turno: any) {
    console.log(turno);
    // var data = especialidad;
    this.turnoSeleccionado = turno;

  }

  // async cargarUsuarios() {
  //   await this.usuarioSvc.getUsuarios().subscribe((usuarios: any) => {
  //     this.usuarios = usuarios;
  //     this.authSvc.afAuth.onAuthStateChanged(user => {
  //       if (user) {
  //         console.log(user['email']);
  //         this.usuario.email = user['email'] || "";
  //         this.getUsuario();
  //         this.cargarTurnos();
  //         if (this.usuario.paciente) {
  //           this.turnosOcupados.forEach((element: any) => {
  //             if (element.idPaciente == this.usuario.id) {
  //               this.turnosPaciente.push(element);
  //             }
  //           });
  //           console.log("turnos paciente:" + this.turnosPaciente);

  //         }
  //         if (this.usuario.especialista) {
  //           this.turnosOcupados.forEach((element: any) => {
  //             if (element.idEspecialista == this.usuario.id) {
  //               this.turnosEspecialista.push(element);
  //             }
  //           });
  //           console.log("turnos espec" + this.turnosPaciente);
  //         }
  //       }
  //     });
  //     //console.log(usuarios);
  //   });
  // }

  // getUsuario() {
  //   this.usuarios.forEach((item: Usuario) => {
  //     if (this.usuario.email == item.email) {
  //       this.usuario = item;
  //       console.log(this.usuario);
  //     }
  //   });
  // }

}

