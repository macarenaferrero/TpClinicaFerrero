import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Clases/usuario';
import { TurnoService } from 'src/app/Services/turno.service';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-turno-detalle',
  templateUrl: './turno-detalle.component.html',
  styleUrls: ['./turno-detalle.component.css']
})
export class TurnoDetalleComponent {

  //public usuario$: Observable<any> = this.authSvc.afAuth.user;
  @Input() turnoDetalle!: any;
  aceptado = "ACEPTADO";
  rechazado = "RECHAZADO";
  cancelado = "CANCELADO";
  finalizado = "FINALIZADO";
  pendiente = "PENDIENTE";
  realizado = "REALIZADO";
  email!: string;
  usuario: Usuario = new Usuario();
  nuevoComentarioPaciente!: string;
  nuevoComentarioEspecialista!: string;
  nuevoComentarioAdmin!: string;
  cancela: boolean = false;
  rechaza: boolean = false;
  finaliza: boolean = false;
  noMostrarEnviarComentarioEsp: boolean = false;
  noMostrarEnviarComentarioPac: boolean = false;
  noMostrarEnviarComentarioAdmin: boolean = false
  usuarioLoggeado:any;
  especialistas:any;
  isAdmin:boolean=false;
  isPaciente:boolean=false;
  isEspecialista:boolean=false;

  constructor(private turnoSvc: TurnoService, private afAuth: AngularFireAuth,
    private usuariosService:UsuariosService , private router: Router) {

   }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user=>{
      if(user){
        this.usuarioLoggeado = user;
        this.isAdmin = user.displayName == "Administrador" ? true : false;
      }else{
        this.router.navigate([""]);
      }
    })

    this.usuariosService.getListadoEspecialistas().subscribe((especialistas:any)=>{
      this.especialistas=especialistas;
      if(!this.isAdmin){
      this.especialistas.forEach((especialista:any) => {
        if(especialista.email == this.usuarioLoggeado.email){
          this.isEspecialista=true;
        }
      });
      if(!this.isEspecialista){
        this.isPaciente=true;
      }
    }
    });
  }


  cancelar(){
    this.turnoDetalle.estado = this.cancelado;
    this.cancela = true;
    this.rechaza = false;
    this.finaliza = false;
    //this.turnoSvc.updateTurno(this.turnoDetalle);
  }

  rechazar(){
    this.turnoDetalle.estado = this.rechazado;
    this.cancela = false;
    this.rechaza = true;
    this.finaliza = false;
    //this.turnoSvc.updateTurno(this.turnoDetalle);
  }

  aceptar(){
    this.turnoDetalle.estado = this.aceptado;
    this.turnoSvc.updateTurnoEstado(this.turnoDetalle);
  }

  finalizar(){
    this.cancela = false;
    this.rechaza = false;
    this.finaliza = true;
    this.turnoDetalle.estado = this.finalizado;
    //this.turnoSvc.updateTurno(this.turnoDetalle);
  }

  enviarComentario(){
    if(this.isEspecialista){
      this.turnoDetalle.comentariosEspecialista = this.nuevoComentarioEspecialista;
      this.turnoSvc.updateTurnoEstadoComentariosEspecialista(this.turnoDetalle);
      this.noMostrarEnviarComentarioEsp = true;
      this.nuevoComentarioEspecialista = "";
    }
    if(this.isPaciente){
      this.turnoDetalle.comentariosPaciente = this.nuevoComentarioPaciente;
      this.turnoSvc.updateTurnoEstadoComentariosPaciente(this.turnoDetalle);
      this.noMostrarEnviarComentarioPac = true;
      this.nuevoComentarioPaciente = "";
    }
    if(this.isAdmin){
      this.turnoDetalle.comentariosAdmin = this.nuevoComentarioAdmin;
      this.turnoSvc.updateTurnoEstadoComentariosAdmin(this.turnoDetalle);
      this.noMostrarEnviarComentarioAdmin = true;
      this.nuevoComentarioAdmin = "";
    }

    //this.turnoDetalle = null;
  }
}
