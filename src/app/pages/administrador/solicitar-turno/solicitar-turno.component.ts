import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Administrador } from 'src/app/Clases/administrador';
import { Especialista } from 'src/app/Clases/especialista';
import { Paciente } from 'src/app/Clases/paciente';
import { Turno } from 'src/app/Clases/turno';
import { Usuario } from 'src/app/Clases/usuario';
import { TurnoService } from 'src/app/Services/turno.service';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.css']
})
export class SolicitarTurnoComponent {

  especialidades: any = [];
  especialidadSeleccionada: any;
  especialistaSeleccionado: any;
  pacienteSeleccionado: any;
  usuarios: Usuario[] = [];
  especialistas: Especialista[] = [];
  especialistasEspecialidad: Especialista[] = [];
  pacientes: Paciente[] = [];
  turno!: Turno;
  turnosOcupados: any;
  fromDate: any;
  toDate: any;
  fechas: any;
  mostrarHora = false;
  fechaElegida: any;
  horaElegida!: string;
  usuario: any;
  turnosDisponibles: any[] = [];
  listaUsuarios: Usuario[] = [];
  email!: string;
  paciente!: any;
  administrador!: any;
  captchaPropio:boolean = false;
  isAdmin:boolean=false;
  isPaciente:boolean=false;
  isEspecialista:boolean=false;
  usuarioLogueado:any;
  administradores:Administrador[]=[];

  constructor(private usuarioSvc: UsuariosService, private afAuth: AngularFireAuth,
     private turnoSvc: TurnoService, private router: Router, private toastr: ToastrService) {
    this.cargarTurnos();
    this.cargarEspecialidades();
    this.getEspecialistasSegunEspecialidad();
    this.getPacientes();

    this.usuarioSvc.getListadoEspecialistas().subscribe((especialistas:any)=>{
      this.especialistas=especialistas;
    });
  }

  ngOnInit(): void {
      this.isAdmin=false;
      this.isPaciente=false;
      this.isEspecialista=false;
      this.afAuth.currentUser.then(user=>{
        if(user){
          this.usuario = user;
          this.isAdmin = user.displayName == "Administrador" ? true : false;
          if(this.isAdmin){
            this.usuarioSvc.getListadoAdministradores().subscribe((administradores:any)=>{
              this.administradores=administradores;
              this.administradores.forEach((administrador:any) => {
                if(administrador.email == this.usuario.email){
                  this.usuario = administrador;
                }
              });
            });
          }else{
            this.usuarioSvc.getListadoEspecialistas().subscribe((especialistas:any)=>{
              this.especialistas=especialistas;
              this.especialistas.forEach((especialista:any) => {
                if(especialista.email == this.usuario.email){
                  this.usuario = especialista;
                  this.isEspecialista=true;
                }
              });
            });
            if(!this.isEspecialista){
              this.usuarioSvc.getListadoPacientes().subscribe((pacientes:any)=>{
                this.pacientes=pacientes;
                this.pacientes.forEach((paciente:any) => {
                  if(paciente.email == this.usuario.email){
                    this.usuario = paciente;
                    this.isPaciente=true;
                  }
                });
              });
            }

            }
          }
      });
      }



  cargarEspecialidades() {
    this.usuarioSvc.getEspecialidades().subscribe((especialidades: any) => {
      this.especialidades = especialidades;
      //console.log(especialidades);
    });
  }

  cargarTurnos() {
    this.getDates();

    this.turnoSvc.getListadoTurnos().subscribe(turnos => {
      this.turnosOcupados = turnos;
      this.cargarTurnosDisponibles();
    });
  }

  asignarEspecialidadSeleccionada(especialidad:any) {
    // var data = especialidad;
    this.especialidadSeleccionada = especialidad;
    this.getEspecialistasSegunEspecialidad();
    //this.especialidadesSeleccionadas.push(especialidad);
    //this.formulario.controls['especialidades'].setValue(this.especialidadesSeleccionadas);

  }

  asignarEspecialista(especialista:any) {
    // var data = especialidad;
    this.especialistaSeleccionado = especialista;
    //this.getEspecialistas();
    //this.especialidadesSeleccionadas.push(especialidad);
    //this.formulario.controls['especialidades'].setValue(this.especialidadesSeleccionadas);

  }



  getEspecialistasSegunEspecialidad(){
    this.especialistasEspecialidad = [];
    this.especialistas.forEach((element: Especialista) => {
        element.especialidades.forEach((item:any) => {
          if (item == this.especialidadSeleccionada.especialidadData) {
            console.log("especialidad seleccionada "+item);
            this.especialistasEspecialidad.push(element);
          }
        });

    });
  }


  getPacientes() {
    this.usuarioSvc.getListadoPacientes().subscribe((pacientes: any) => {
      this.pacientes = pacientes;
    });
  }


  registrarTurno() {
    if (this.usuario && this.especialistaSeleccionado && this.horaElegida) {
      this.turno = new Turno();
      this.turno.idEspecialista = this.especialistaSeleccionado.id;
      if (this.isAdmin) {
        this.turno.idPaciente = this.pacienteSeleccionado.id;
        this.turno.paciente = this.pacienteSeleccionado.nombre + " " + this.pacienteSeleccionado.apellido;
      }
      else {
        this.turno.idPaciente = this.usuario.id;
        this.paciente = this.usuario.nombre + " " + this.usuario.apellido;
        this.turno.paciente = this.paciente;
      }
      this.turno.especialista = this.especialistaSeleccionado.nombre + " " + this.especialistaSeleccionado.apellido;
      this.turno.especialidad = this.especialidadSeleccionada.especialidadData;
      this.turno.estado = "PENDIENTE";
      this.turno.fecha = this.fechaElegida.row_date.day + "/" + this.fechaElegida.row_date.month + "/" + this.fechaElegida.row_date.year;
      this.turno.hora = this.horaElegida;

      this.turno.comentariosPaciente = "";
      this.turno.comentariosEspecialista = "";
      console.log(this.turno);

      this.turnoSvc.addTurno(this.turno);

      this.especialidadSeleccionada = null;
      this.especialistaSeleccionado = null;
      this.fechaElegida = null;
      this.horaElegida = "";
      this.toastr.success('El turno se ha registrado correctamente', 'Turno registrado');
      window.scrollTo(0, 0);
    }

  }

  // fechas = [];
  // crearFechas(fecha) {
  //   var hoy = new Date();

  //   this.fechas.forEach(element => {
  //     let instancia = { dia: fecha.dia, fecha: fecha.fecha, hora: fecha.hora };
  //     // this.seCreaAbecedario.emit(instancia);
  //     // this.agregarNuevoProducto(instancia);
  //   });
  // }




  getDates() {
    var current_date = new Date();
    current_date.setDate(current_date.getDate() + 1);
    var dias = 15;
    var end_date = new Date();
    end_date.setDate(current_date.getDate() + dias);

    var getTimeDiff = Math.abs(current_date.getTime() - end_date.getTime());
    var date_range = Math.ceil(getTimeDiff / (1000 * 3600 * 24)) + 1;

    var weekday = ["Sun", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    var hoursWeek = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"];
    var hoursSat = ["8:00", "8:30", "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"];
    var dates = new Array();

    // for (var i = 0; i <= date_range; i++) {
    for (var i = 0; i <= date_range; i++) {
      var getDate, getMonth = '';

      if (current_date.getDate() < 10) {
        getDate = ('0' + current_date.getDate());
      }
      else {
        getDate = current_date.getDate();
      }

      if (current_date.getMonth() < 9) {
        getMonth = ('0' + (current_date.getMonth() + 1));
      }
      else {
        getMonth = current_date.getMonth().toString();
      }

      var row_date;
      var hours;
      if (current_date.getDay() == 6) {
        //console.log(current_date.getDay());

        hours = hoursSat;
        row_date = { day: getDate, month: getMonth, year: current_date.getFullYear(), hours };
        //console.log(row_date);

      }
      else {
        hours = hoursWeek;
        row_date = { day: getDate, month: getMonth, year: current_date.getFullYear(), hours };
        //console.log(row_date);
      }

      var fmt_date = { weekDay: weekday[current_date.getDay()], date: getDate, month: months[current_date.getMonth()] };
      var is_weekend = false;
      if (current_date.getDay() == 0 || current_date.getDay() == 6) {
        is_weekend = true;
      }

      if (current_date.getDay() != 0) {
        dates.push({ row_date: row_date, fmt_date: fmt_date, is_weekend: is_weekend });
      }
      current_date.setDate(current_date.getDate() + 1);
      //console.log(row_date.hours);
    }
    //console.log(dates);

    this.fechas = dates;
    //console.log(this.fechas);

  }

  mostrarHorarios(fecha:any) {
    this.fechaElegida = fecha;
    console.log(this.fechaElegida);
  }

  fechaTurnoElegido(hora:any) {
    this.horaElegida = hora;
    console.log(this.horaElegida);
  }

  cargarTurnosDisponibles() {
    //console.log(this.fechas);

    var fechaDis;
    this.turnosOcupados.forEach((turno: { fecha: string; hora: any; }) => {
      for (let index = 0; index < this.fechas.length; index++) {
        const element = this.fechas[index];
        fechaDis = element.row_date.day + "/" + element.row_date.month + "/" + element.row_date.year;

        if (turno.fecha == fechaDis) {
          // console.log("fechaDis " + fechaDis);
          // console.log("fecha turno ocupado " + turno.fecha);
          // console.log(element);

          for (let index = 0; index < element.row_date.hours.length; index++) {
            const item = element.row_date.hours[index];
            if (item == turno.hora) {
             // console.log("element: " + item + "hora ocupada:  " + turno.hora + " en fecha   " + fechaDis);

              //fecha.row_date.hours.splice(fecha.row_date.hours[index], 1);
              element.row_date.hours[index] = null;
              //fecha.row_date.hours[index] = fecha.row_date.hours[index].replace(element, "")
             // console.log("horario eliminado   " + item);

            }
          }
        }
        this.turnosDisponibles.push(element);
      }


    });
    //console.log(this.turnosDisponibles);
    this.turnosDisponibles = this.turnosDisponibles.filter((item:any, index:any) => {
      return this.turnosDisponibles.indexOf(item) === index;
    })
  }

  enviarUsuarioSeleccionado(usuario: any) {
    this.pacienteSeleccionado = usuario;
    console.log(this.pacienteSeleccionado);

  }

  resolvedPropio(captcha: boolean){
    this.captchaPropio = captcha;
  }


}
