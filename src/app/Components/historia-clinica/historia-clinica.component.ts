import { Component, Input } from '@angular/core';
import { map } from 'rxjs';
import { HistoriaClinica } from 'src/app/Clases/historia-clinica';
import { Turno } from 'src/app/Clases/turno';
import { Usuario } from 'src/app/Clases/usuario';
import { HistoriaClinicaService } from 'src/app/Services/historia-clinica.service';
import { TurnoService } from 'src/app/Services/turno.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Paciente } from 'src/app/Clases/paciente';
import { UsuariosService } from 'src/app/Services/usuarios.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent {

  public mostrar: boolean = false;
  public historiaSeleccionada: HistoriaClinica = new HistoriaClinica;
  public usuarioSeleccionado: Usuario = new Usuario;
  public listadoHistoriaClinica: any = [];
  public listaHistoriaClinica: any = [];
  usuario!: any;
  // @Input() paciente! : Paciente;
  turnosOcupados: any;
  turnosPaciente: Turno[] = [];
  usuarioLoggeado:any;
  pacientes:Paciente[] = [];

  constructor(public historiaClinicaService: HistoriaClinicaService, public afAuth: AngularFireAuth,
     private turnoSvc: TurnoService, private usuariosService: UsuariosService) {

  }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user=>{
      if(user){
        this.usuarioLoggeado = user;
      }
    })

    this.usuariosService.getListadoPacientes().subscribe((pacientes) => {
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
      this.buscarHistoria();

    });
  }

   buscarHistoria() {
    this.turnosPaciente = [];
    console.log("idUsuario" +this.usuario?.id);
    this.turnosOcupados.forEach((element: Turno) => {
          if (element.idPaciente === this.usuario?.id && element.estado === "FINALIZADO") {
            this.turnosPaciente.push(element);
            console.log("turnos paciente "+this.turnosPaciente);
          }

    });


   }

  crearPdf() {
    let DATA = <HTMLElement>document.getElementById('pdfTable');

    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
      var nombreArchivo ='historia-clinica.pdf';
      PDF.save(nombreArchivo);
    });
  }
}
