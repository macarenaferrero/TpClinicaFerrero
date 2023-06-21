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
      this.pacientes.forEach((paciente) => {
        if(paciente.email == this.usuarioLoggeado.email){
          this.usuario = paciente;
        }
      });
    });

    this.turnoSvc.getListadoTurnos().subscribe((turnos) => {
      this.turnosOcupados = turnos;
      this.buscarHistoria();

    });
  }

   buscarHistoria() {
    this.turnosPaciente = [];
    this.turnosOcupados.forEach((element: Turno) => {
          if (element.idPaciente === this.usuario?.id && element.estado === "FINALIZADO") {
            this.turnosPaciente.push(element);
          }

    });


   }
   crearPdf() {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(); // Puedes personalizar el formato según tus necesidades

    let DATA = <HTMLElement>document.getElementById('pdfTable');

    html2canvas(DATA).then(canvas => {
      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 20; // Incrementa la posición vertical para dejar espacio para la fecha
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

      const fechaX = 170; // Posición X de la fecha
      const fechaY = 15; // Posición Y de la fecha
      PDF.text(formattedDate, fechaX, fechaY);

      var nombreArchivo ='historia-clinica.pdf';
      PDF.save(nombreArchivo);
    });
  }
}
